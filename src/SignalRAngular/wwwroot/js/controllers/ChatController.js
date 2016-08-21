(function() {
'use strict';

    angular.module('SignalRAngular').controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', 'Messages'];
    function ChatController($scope, Messages) {
        $scope.title = "SignalR with AngularJS";
        $scope.subtitle = Messages.subtitle;
        $scope.messages = Messages.all;
        
        $scope.sendMessage = function (name, message) {
            Messages.send(name, message);
        };

        $scope.subtitleUpdate = function (text, elem) {
            Messages.updateSubtitle(text);
        };

    }
})();