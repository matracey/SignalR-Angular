(function() {
'use strict';

    angular
        .module('SignalRAngular')
        .controller('MainController', MainController);

    MainController.$inject = ['$scope', 'Messages', '$timeout'];
    function MainController($scope, Messages, $timeout) {
        $scope.title = "SignalR with AngularJS";
        $scope.subtitle = "Cats and dogs living together.";
        $scope.messages = Messages.all;
        
        $scope.sendMessage = function (name, message) {
            Messages.send(name, message);
        };

    }
})();