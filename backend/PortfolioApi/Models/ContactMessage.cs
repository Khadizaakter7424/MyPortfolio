using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.Models
{
    // What a visitor submits from the "Let's Talk" form
    public class ContactMessageDto
    {
        [Required(ErrorMessage = "Please enter your name.")]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required(ErrorMessage = "Please enter your email.")]
        [EmailAddress(ErrorMessage = "That email address doesn't look right.")]
        [MaxLength(150)]
        public string Email { get; set; } = string.Empty;

        [MaxLength(150)]
        public string? Subject { get; set; }

        [Required(ErrorMessage = "Please write a message.")]
        [MaxLength(3000)]
        public string Message { get; set; } = string.Empty;
    }

    // What actually gets stored, with server-assigned fields
    public class ContactMessage
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string? Subject { get; set; }
        public string Message { get; set; } = string.Empty;
        public DateTime ReceivedAtUtc { get; set; }
        public bool IsRead { get; set; }
    }
}
