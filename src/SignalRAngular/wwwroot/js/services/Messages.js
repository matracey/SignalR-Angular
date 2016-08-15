(function () {
    'use strict';

    angular.module('SignalRAngular').factory('Messages', Messages);

    Messages.$inject = ['$rootScope', 'Hub'];

    function Messages($rootScope, Hub) {
        
        var allMessages = [];
        var displayedSubtitle = {
            Text: "Cats and dogs living together."
        };

        // Define ViewModel.
        var Message = function (message) {
            if (!message) message = {};

            var Message = {
                Id: message.Id | null,
                Name: message.Name || 'New',
                Message: message.Message || 'New',
                Timestamp: message.Timestamp || Date.UTC()
            };
            return Message;
        };

        var chatHub = new Hub('chatHub', {
            listeners: {
                'loadMessages': function(messages) {
                    messages.forEach(function(message) {
                        allMessages.push(message);
                    }, this);
                    $rootScope.$apply();
                },
                'broadcastMessage': function (message) {
                    allMessages.push(message);
                    $rootScope.$apply();
                },
                'broadcastSubtitle': function (subtitle) {
                    displayedSubtitle.Text = subtitle.Text;
                    $rootScope.$apply();
                }
            },
            methods: ['send', 'updateSubtitle'],
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

        // Methods

        var send = function (name, message) {
            if(name.trim().length > 0 && message.trim().length > 0)
                chatHub.send(name, message); // Calling Send method on the ChatHub.
        };

        var updateSubtitle = function (subtitle) {
            if(subtitle.trim().length > 0)
                chatHub.updateSubtitle(subtitle);
        };
        
        return {
            all: allMessages,
            subtitle: displayedSubtitle,

            send: send,
            updateSubtitle: updateSubtitle
        };
    }
})();