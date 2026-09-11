using System.Text.Json;
using PortfolioApi.Models;

namespace PortfolioApi.Services
{
    // Keeps things simple for a portfolio project: messages live in App_Data/messages.json
    // instead of requiring SQL Server to be installed just to receive a message.
    // Swap this out for an EF Core + SQL Server implementation later if you want one store
    // for everything (see IMessageStore).
    public class JsonMessageStore : IMessageStore
    {
        private readonly string _filePath;
        private readonly SemaphoreSlim _lock = new(1, 1);

        public JsonMessageStore(IWebHostEnvironment env)
        {
            var dataDir = Path.Combine(env.ContentRootPath, "App_Data");
            Directory.CreateDirectory(dataDir);
            _filePath = Path.Combine(dataDir, "messages.json");
        }

        public async Task<ContactMessage> AddAsync(ContactMessageDto dto)
        {
            await _lock.WaitAsync();
            try
            {
                var messages = await ReadAllInternalAsync();
                var nextId = messages.Count == 0 ? 1 : messages.Max(m => m.Id) + 1;

                var message = new ContactMessage
                {
                    Id = nextId,
                    Name = dto.Name.Trim(),
                    Email = dto.Email.Trim(),
                    Subject = string.IsNullOrWhiteSpace(dto.Subject) ? null : dto.Subject.Trim(),
                    Message = dto.Message.Trim(),
                    ReceivedAtUtc = DateTime.UtcNow,
                    IsRead = false
                };

                messages.Add(message);
                await WriteAllInternalAsync(messages);
                return message;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<List<ContactMessage>> GetAllAsync()
        {
            await _lock.WaitAsync();
            try
            {
                var messages = await ReadAllInternalAsync();
                return messages.OrderByDescending(m => m.ReceivedAtUtc).ToList();
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> MarkAsReadAsync(int id)
        {
            await _lock.WaitAsync();
            try
            {
                var messages = await ReadAllInternalAsync();
                var target = messages.FirstOrDefault(m => m.Id == id);
                if (target is null) return false;

                target.IsRead = true;
                await WriteAllInternalAsync(messages);
                return true;
            }
            finally
            {
                _lock.Release();
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            await _lock.WaitAsync();
            try
            {
                var messages = await ReadAllInternalAsync();
                var removed = messages.RemoveAll(m => m.Id == id) > 0;
                if (removed) await WriteAllInternalAsync(messages);
                return removed;
            }
            finally
            {
                _lock.Release();
            }
        }

        private async Task<List<ContactMessage>> ReadAllInternalAsync()
        {
            if (!File.Exists(_filePath)) return new List<ContactMessage>();

            await using var stream = File.OpenRead(_filePath);
            if (stream.Length == 0) return new List<ContactMessage>();

            var messages = await JsonSerializer.DeserializeAsync<List<ContactMessage>>(stream);
            return messages ?? new List<ContactMessage>();
        }

        private async Task WriteAllInternalAsync(List<ContactMessage> messages)
        {
            var options = new JsonSerializerOptions { WriteIndented = true };
            await using var stream = File.Create(_filePath);
            await JsonSerializer.SerializeAsync(stream, messages, options);
        }
    }
}
