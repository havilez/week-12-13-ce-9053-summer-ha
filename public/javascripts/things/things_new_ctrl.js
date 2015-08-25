angular.module("my_world")
    .controller("ThingsNewCtrl", function($scope, $http, $location, ThingsSvc, NavSvc){
        var self = this;
        NavSvc.setSelectedPath("/things");
        self.thing = {
        };
        self.save = function(){
            ThingsSvc.save($scope.thing)
                .then( function(thing){
                    $location.path("/things");
                })
                .catch(function(error){
                    self.error = error;
                });
        }
    });