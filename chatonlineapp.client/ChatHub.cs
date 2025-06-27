using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace ChatOnlineApp.Server.Controllers
{

  public class MessageDto
  {
    public string user { get; set; }
    public string Message { get; set; }
  }

  [ApiController]
  [Route("Api/[Controller]")]
  public class ChatController : Controller
  {
    private readonly IHubContext<ChatOnlineApp.Server.Hubs.ChatHub> _hubContext;

    // Injeção de dependência do IHubContext
    public ChatController(IHubContext<ChatOnlineApp.Server.Hubs.ChatHub> hubContext)
    {
      _hubContext = hubContext;
    }

    [HttpGet("ping")]
    public IActionResult Ping()
    {
      return Ok("pong");
    }

    [HttpPost("send")]
    public async Task<IActionResult> SendMessage([FromBody] MessageDto message)
    {
      // Validação básica
      if (string.IsNullOrEmpty(message.user) || string.IsNullOrEmpty(message.Message))
      {
        return BadRequest("User and message cannot be empty.");
      }

      // Lógica para enviar mensagem via SignalR
      await _hubContext.Clients.All.SendAsync("ReceiveMessage", message.user, message.Message);

      // Se precisar salvar a mensagem em um banco de dados ou em memória,
      // a lógica de persistência vem aqui.


      return Ok(); // Mensagem enviada com sucesso via SignalR
    }
  }
}
