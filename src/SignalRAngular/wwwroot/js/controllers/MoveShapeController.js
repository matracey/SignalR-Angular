(function() {
'use strict';

    angular.module('SignalRAngular').controller('MoveShapeController', MoveShapeController);

    MoveShapeController.$inject = ['$scope', 'Shape'];
    function MoveShapeController($scope, Shape) {
        $scope.shape = Shape.current;

        // Handles the Element drag event for the draggable directive. 
        $scope.onDrag = function(event, ui){
            Shape.updateModel(ui.position.left, ui.position.top);
            //console.log(Shape.current.left, Shape.current.top);
        };
    }
})();