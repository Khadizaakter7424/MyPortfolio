using Microsoft.AspNetCore.Mvc;
using PortfolioApi.Models;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ContactController : ControllerBase
    {
        private readonly IMessageStore _store;
        private readonly IEmailNotifier _emailNotifier;

        public ContactController(IMessageStore store, IEmailNotifier emailNotifier)
        {
            _store = store;
            _emailNotifier = emailNotifier;
        }

        // POST api/contact  -> used by the "Let's Talk" form on the site
        [HttpPost]
        public async Task<ActionResult<ContactMessage>> SendMessage([FromBody] ContactMessageDto dto)
        {
            if (!ModelState.IsValid)
                return ValidationProblem(ModelState);

            var saved = await _store.AddAsync(dto);
            await _emailNotifier.NotifyAsync(saved);

            return CreatedAtAction(nameof(GetById), new { id = saved.Id }, saved);
        }

        // GET api/contact  -> for her to review everything that came in
        [HttpGet]
        public async Task<ActionResult<List<ContactMessage>>> GetAll()
        {
            return Ok(await _store.GetAllAsync());
        }

        // GET api/contact/5
        [HttpGet("{id:int}")]
        public async Task<ActionResult<ContactMessage>> GetById(int id)
        {
            var messages = await _store.GetAllAsync();
            var found = messages.FirstOrDefault(m => m.Id == id);
            return found is null ? NotFound() : Ok(found);
        }

        // PUT api/contact/5/read  -> mark a message as read
        [HttpPut("{id:int}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var updated = await _store.MarkAsReadAsync(id);
            return updated ? NoContent() : NotFound();
        }

        // DELETE api/contact/5
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _store.DeleteAsync(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}
