using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PortfolioController : ControllerBase
    {
        private readonly IPortfolioDataProvider _provider;

        public PortfolioController(IPortfolioDataProvider provider)
        {
            _provider = provider;
        }

        // GET api/portfolio -> everything the site needs in one call:
        // profile, skills, projects, education, training, languages, hobbies.
        [HttpGet]
        public async Task<ActionResult<PortfolioData>> Get()
        {
            return Ok(await _provider.GetAsync());
        }
    }
}
