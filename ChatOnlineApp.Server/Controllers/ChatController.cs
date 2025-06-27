using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using ChatOnlineApp.Server.Models;

namespace ChatOnlineApp.Server.Controllers
{


    [ApiController]
    [Route("Api/[Controller]")]
    public class ChatController : Controller
    {
        private readonly IHubContext<ChatOnlineApp.Server.Hubs.ChatHub> _hubContext;

        public ChatController(IHubContext<ChatOnlineApp.Server.Hubs.ChatHub> hubContext)
        {
            _hubContext = hubContext;
        }


        [HttpPost("send")]
        public async Task<IActionResult> SendMessage([FromBody] MessageDto message)
        {
            if (string.IsNullOrEmpty(message.User) || string.IsNullOrEmpty(message.Text))
            {
                //Futura lógica para enviar mensagem via SignalR ou salvar memória

                return BadRequest("User and message cannot be empty.");
            }

            await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.User, message.Text);

            return Ok(new { Status = "Message sent"});
        }

        [HttpGet("ping")]
        public IActionResult Ping() => Ok("pong");



    }
}


