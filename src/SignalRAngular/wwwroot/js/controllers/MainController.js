(function() {
'use strict';

    angular
        .module('SignalRAngular')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'ChatService', '$timeout'];
    function MainController($scope, ChatService, $timeout) {
        $scope.title = "SignalR with AngularJS";
        $scope.subtitle = "Cats and dogs living together.";
        
        $scope.sendMessage = function () {
            ChatService.send('Martin', 'Hello, Hub!');
        };

        // var chat = $.connection.chatHub;
        // chat.client.broadcastMessage = function (name, message) {
        //     alert(name, message);
        // };
        // $.connection.hub.start().done(function () {
        //     console.log('Connected...');
        //     chat.server.send('Martin', 'Hello!');
        // });

    }
})();