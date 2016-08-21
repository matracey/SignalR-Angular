(function() {
'use strict';

    angular.module('SignalRAngular').factory('Shape', Shape);

    Shape.$inject = ['$rootScope', 'Hub'];
    function Shape($rootScope, Hub) {
        // ViewModel definition
        var Shape = function (shape) {
            if(!shape) shape = {};

            return {
                left: shape.left || 0,
                top: shape.top || 0
            };
        };

        // Properties
        var current = new Shape();

        // Hub definition
        var moveShapeHub = new Hub('moveShapeHub', {
            listeners: {
                'updateShape': function (shape) {
                    current.left = shape.left;
                    current.top = shape.top;
                    $rootScope.$apply();
                }
            },
            methods: ['updateModel'],
            stateChanged: function (state) {
                switch (state.newState) {
                    case $.signalR.connectionState.connecting:
                        console.log("ShapeHub Connecting...");
                        break;
                    case $.signalR.connectionState.connected:
                        console.log("ShapeHub Connected.");
                        break;
                    case $.signalR.connectionState.reconnecting:
                        console.log("ShapeHub Reconnecting...");
                        break;
                    case $.signalR.connectionState.disconnected:
                        console.log("ShapeHub Disconnected.");
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
        // Functions
        var updateModel = function (l, t) {
            if(l && t) {
                moveShapeHub.updateModel(new Shape({left: l, top: t}));
                current.left = l;
                current.top = t;
            }
        };
        
        return {
            // Properties
            current: current,

            // Methods
            updateModel: updateModel
        };
    }
})();