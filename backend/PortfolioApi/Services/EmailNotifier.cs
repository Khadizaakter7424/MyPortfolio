using System.Net;
using System.Net.Mail;
using PortfolioApi.Models;

namespace PortfolioApi.Services
{
    public interface IEmailNotifier
    {
        Task NotifyAsync(ContactMessage message);
    }

    // Reads Smtp settings from appsettings.json / environment variables.
    // If Smtp:Host is left blank, sending is skipped so the API still works
    // out of the box with no email account configured.
    public class SmtpEmailNotifier : IEmailNotifier
    {
        private readonly IConfiguration _config;
        private readonly ILogger<SmtpEmailNotifier> _logger;

        public SmtpEmailNotifier(IConfiguration config, ILogger<SmtpEmailNotifier> logger)
        {
            _config = config;
            _logger = logger;
        }

        public async Task NotifyAsync(ContactMessage message)
        {
            var host = _config["Smtp:Host"];
            var toAddress = _config["Smtp:ToAddress"];

            if (string.IsNullOrWhiteSpace(host) || string.IsNullOrWhiteSpace(toAddress))
            {
                _logger.LogInformation("Smtp not configured; skipping email notification for message {Id}.", message.Id);
                return;
            }

            try
            {
                var port = int.TryParse(_config["Smtp:Port"], out var p) ? p : 587;
                var username = _config["Smtp:Username"];
                var password = _config["Smtp:Password"];
                var fromAddress = _config["Smtp:FromAddress"] ?? username ?? toAddress;

                using var client = new SmtpClient(host, port)
                {
                    EnableSsl = true,
                    Credentials = string.IsNullOrWhiteSpace(username)
                        ? CredentialCache.DefaultNetworkCredentials
                        : new NetworkCredential(username, password)
                };

                using var mail = new MailMessage
                {
                    From = new MailAddress(fromAddress, "Portfolio Contact Form"),
                    Subject = $"New portfolio message: {message.Subject ?? "(no subject)"}",
                    Body = $"From: {message.Name} <{message.Email}>\n\n{message.Message}",
                    IsBodyHtml = false
                };
                mail.To.Add(toAddress);
                mail.ReplyToList.Add(new MailAddress(message.Email, message.Name));

                await client.SendMailAsync(mail);
            }
            catch (Exception ex)
            {
                // A failed email should never fail the contact submission itself -
                // the message is already saved.
                _logger.LogWarning(ex, "Could not send email notification for message {Id}.", message.Id);
            }
        }
    }
}
