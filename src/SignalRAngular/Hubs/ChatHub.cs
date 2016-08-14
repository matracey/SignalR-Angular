using Microsoft.AspNetCore.SignalR;

namespace SignalRAngular
{
    public class ChatHub : Hub
    {
        public void Send(string name, string message)
        {
            Clients.All.broadcastMessage(name, message);
        }
        
    }
}