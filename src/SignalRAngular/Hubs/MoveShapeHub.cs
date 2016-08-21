using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

namespace SignalRAngular
{
    public class MoveShapeHub : Hub
    {
        private Shape _shape;

        public MoveShapeHub (Shape shape)
        {
            _shape = shape;
        }

        public override Task OnConnected()
        {
            Clients.Caller.updateShape(_shape);
            return base.OnConnected();
        }

        public void UpdateModel(Shape clientModel)
        {
            clientModel.LastUpdatedBy = Context.ConnectionId;
            Clients.All.updateShape(clientModel);
        }
    }
}