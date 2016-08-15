using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRAngular.Models;

namespace SignalRAngular
{
    public class ChatHub : Hub
    {
        private List<Message> _messages;

        public ChatHub (List<Message> messages)
        {
            _messages = messages;
        }

        public override Task OnConnected()
        {
            Clients.Caller.loadMessages(_messages);
            return base.OnConnected();
        }

        public void Send(string name, string message)
        {
            var msg = new Message()
            {
                Name = name, 
                Content = message
            };

            _messages.Add(msg);
            Clients.All.broadcastMessage(msg);
        }
        
    }
}