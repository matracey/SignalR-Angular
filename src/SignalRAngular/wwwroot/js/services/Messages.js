(function () {
    'use strict';

    angular.module('SignalRAngular').factory('Messages', Messages);

    Messages.$inject = ['$rootScope', 'Hub'];

    function Messages($rootScope, Hub) {
        var Messages = this;

        // Define ViewModel.
        var Message = function (message) {
            if (!message) message = {};

            var Message = {
                Id: message.Id | null,
                Name: message.Name || 'New',
                Message: message.Message || 'New'
            };
            return Message;
        };

        var chatHub = new Hub('chatHub', {
            listeners: {
                'newConnection': function (id) {
                    Messages.connected.push(id);
                    $rootScope.$apply();
                },
                'removeConnection': function (id) {
                    Messages.connected.splice(Messages.connected.indexOf(id), 1);
                    $rootScope.$apply();
                },
                'loadMessages': function(messages) {
                    messages.forEach(function(message) {
                        Messages.all.push(message);
                    }, this);
                    $rootScope.$apply();
                },
                'broadcastMessage': function (message) {
                    Messages.all.push(message);
                    $rootScope.$apply();
                }
            },
            methods: ['send'],
            stateChanged: function (state) {
                switch (state.newState) {
                    case $.signalR.connectionState.connecting:
                        console.log("Connecting...");
                        break;
                    case $.signalR.connectionState.connected:
                        console.log("Connected.");
                        break;
                    case $.signalR.connectionState.reconnecting:
                        console.log("Reconnecting...");
                        break;
                    case $.signalR.connectionState.disconnected:
                        console.log("Disconnected.");
                        break;
                    default:
                        console.log(state.newState);
                        break;
                }
            },
            errorHandler: function (error) {
                console.error(error);
            }
        });

        // Properties
        if(!Messages.all)  Messages.all = [];
        if(!Messages.connected) Messages.connected = [];

        // Methods

        Messages.send = function (name, message) {
            chatHub.send(name, message); // Calling Send method on the ChatHub.
        };
        
        return Messages;
    }
})();