using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;
using SignalRAngular.Models;

namespace SignalRAngular
{
    public class ChatHub : Hub
    {
        private List<Message> _messages;
        private Subtitle _subtitle;

        public ChatHub(List<Message> messages, Subtitle subtitle)
        {
            _messages = messages;
            _subtitle = subtitle;

            if (_subtitle.Text == null) _subtitle.Text = "Cats and dogs living together.";
        }

        public override Task OnConnected()
        {
            Clients.Caller.loadMessages(_messages);
            Clients.Caller.broadcastSubtitle(_subtitle);
            return base.OnConnected();
        }

        public void Send(string name, string message)
        {
            if (!string.IsNullOrWhiteSpace(name) && !string.IsNullOrWhiteSpace(message))
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

        public void UpdateSubtitle(string subtitle)
        {
            if(!string.IsNullOrWhiteSpace(subtitle))
            {
                _subtitle.LastUpdatedBy = Context.ConnectionId;
                _subtitle.Text = subtitle;
                Clients.AllExcept(_subtitle.LastUpdatedBy).broadcastSubtitle(_subtitle);
            }
        }
        
    }
}