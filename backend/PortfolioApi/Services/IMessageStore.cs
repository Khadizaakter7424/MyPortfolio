using PortfolioApi.Models;

namespace PortfolioApi.Services
{
    public interface IMessageStore
    {
        Task<ContactMessage> AddAsync(ContactMessageDto dto);
        Task<List<ContactMessage>> GetAllAsync();
        Task<bool> MarkAsReadAsync(int id);
        Task<bool> DeleteAsync(int id);
    }
}
