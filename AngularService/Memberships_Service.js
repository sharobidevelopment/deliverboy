/**
 * 
 */
'use strict';
angular.module('myApp').factory('MembershipsService', ['$http', '$q','$cookies', function($http, $q,$cookies){

var REST_GET_ALL_FEATURES_URI = serverurl + '/features';
    
    var factory = {
    	getAllFeaturesService: getAllFeaturesService
    };
    return factory;

    
function getAllFeaturesService() {
        //alert("getAllFeaturesService");
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
        $http.get(REST_GET_ALL_FEATURES_URI,{        
                    headers:{'Authorization': tokenCookie}
                  })
        .then(
            function (response) {
                deferred.resolve(response);
                //console.log("getAllFeaturesService: "+JSON.stringify(response.data));
            },
            function(errResponse){
                console.error('Error while features fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    




}]);
