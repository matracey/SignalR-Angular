(function() {
'use strict';

    angular
        .module('SignalRAngular')
        .controller('ChatController', ChatController);

    ChatController.$inject = ['$scope', 'Messages', '$timeout'];
    function ChatController($scope, Messages, $timeout) {
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