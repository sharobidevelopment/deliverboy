/**
 * 
 */
'use strict';
var applog = angular.module('myApp',['ngRoute','ui.bootstrap','ngCookies','ngIdle','infinite-scroll']);
applog.config([ '$routeProvider', '$locationProvider','IdleProvider', 'KeepaliveProvider',
    function($routeProvider, $locationProvider,IdleProvider, KeepaliveProvider) {
	
	var contextpath='/deliverboy';
        $routeProvider.when('/deliverboy/', {
            templateUrl : 'views/login.html',
        }).when(contextpath+"/home", {
			     templateUrl : "views/home.html"
		    }).when(contextpath+"/readytopickuporders", {
           templateUrl : "views/ready_to_pickup.html"
        }).when(contextpath+"/readytodeliverorders", {
           templateUrl : "views/ready_to_deliver.html"
        }).when(contextpath+"/placedorderlist", {
           templateUrl : "views/already_order_done.html"
        }).otherwise({
            redirectTo : '/deliverboy'
        });
      
      $locationProvider.html5Mode({
        	  enabled: true,
        	  requireBase: false
        	});/*For avoid #! from url*/

     }

    
  
]).run(function(Idle,$rootScope){
	// start watching when the app runs. also starts the Keepalive service by default.
    Idle.watch();
   
      $rootScope.lat=0;
      $rootScope.lng=0;
      $rootScope.contextpath = '/deliverboy';
      
      if(localStorage.getItem("loggedinuserdetails") != null ){
          var userdata=JSON.parse(localStorage.getItem("loggedinuserdetails"));
         $rootScope.activeusername=userdata.name;
         }
         else{
           $rootScope.activeusername='User'; 
         }


});
applog.directive('numbersOnly', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attr, ngModelCtrl) {
            function fromUser(text) {
                if (text) {
                    var transformedInput = text.replace(/[^0-9]/g, '');

                    if (transformedInput !== text) {
                        ngModelCtrl.$setViewValue(transformedInput);
                        ngModelCtrl.$render();
                    }
                    return transformedInput;
                }
                return undefined;
            }            
            ngModelCtrl.$parsers.push(fromUser);
        }
    };
});

