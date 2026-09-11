using PortfolioApi.Models;

namespace PortfolioApi.Services
{
    public interface IPortfolioDataProvider
    {
        Task<PortfolioData> GetAsync();
    }
}
