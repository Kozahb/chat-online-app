using Microsoft.AspNetCore.SignalR;

namespace ChatOnlineApp.Server.Hub
{
    public class ChatHub : Hub
    {
        public async Task SendMessage(string user, string message)
        {
            await Clients.All.SendAsync(user, message);
        }
    }
}
