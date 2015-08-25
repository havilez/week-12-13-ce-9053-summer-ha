angular.module("my_world")
    .controller("ThingsCtrl", function($scope, $http, ThingsSvc, NavSvc, AuthSvc){
        var self = this;
        NavSvc.setSelectedPath("/things");

        self.canDelete = function(){
            return AuthSvc.user.authenticated();
        };

        // controller function, not on scope i.e. not for use outside of controller
        function activate(){
            ThingsSvc.getThings()
            .then( function(things){
                self.things = things;
            });
        };

        self.delete = function(thing){
            ThingsSvc.deleteThing(thing)
                .then(function(){
                    activate();
                });
        };
        activate();
    });