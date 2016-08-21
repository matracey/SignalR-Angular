(function() {
    'use strict';

    angular
        .module('SignalRAngular')
        .directive('draggable', Draggable);

    function Draggable() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                dragCallback: '=?' // attr is drag-callback
            }
        };
        return directive;
        
        function link(scope, element, attrs) {

            if(!scope.dragCallback) {
                scope.dragCallback = function (event, ui) {
                    console.log(ui.position);
                };
            }

            element.draggable({
                drag: scope.dragCallback
            });
        }
    }
})();