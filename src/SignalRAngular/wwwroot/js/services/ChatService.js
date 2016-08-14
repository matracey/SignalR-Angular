(function () {
    'use strict';

    angular
        .module('SignalRAngular')
        .factory('ChatService', ChatService);

    ChatService.$inject = ['$rootScope', 'Hub', '$timeout'];
    function ChatService($rootScope, Hub, $timeout) {
        var chatHub = new Hub('chatHub', {
            listeners: {
                'broadcastMessage': function (name, message) {
                    alert(name, message);
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

        return {
            send: function (name, message) {
                chatHub.send(name, message); // Calling Send method on the ChatHub.
            }
        };
    }
})();