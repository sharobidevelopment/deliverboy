/**
 * 
 */

'use strict';
angular.module('myApp').factory('ContactService', ['$http', '$q','$cookies', function($http, $q,$cookies){

  
    var REST_LOGIN_SERVICE_URI = serverurl+'/login';
    var REST_REGISTER_SERVICE_URI = serverurl+'/contact/deleteAllContacts';
    var factory = {
	         delectAllContact: delectAllContact
	        // updateUser:updateUser,
	        // userRequest:userRequest
    };
    return factory;

//==========================================================================================================
     //   function createUser(register) {
	    //     var deferred = $q.defer();
	    //     $http.post(REST_SERVICE_URI, register)
	    //         .then(
	    //         function (response) {
	    //             deferred.resolve(response.data);
	    //         },
	    //         function(errResponse){
	    //             console.error('Error while creating User');
	    //             deferred.reject(errResponse);
	    //         }
	    //     );
	    //     return deferred.promise;
	    // }


	    // function updateUser(register, id) {
	    //     var deferred = $q.defer();
	    //     $http.put(REST_SERVICE_URI+id, register)
	    //         .then(
	    //         function (response) {
	    //             deferred.resolve(response.data);
	    //         },
	    //         function(errResponse){
	    //             console.error('Error while updating User');
	    //             deferred.reject(errResponse);
	    //         }
	    //     );
	    //     return deferred.promise;
	    // }

//=====================================================================================================
    /* function delectAllContact(SelectdItemJson) {
      //alert("userRequest::"+self.register);
      var tokenCookie = $cookies.get('storeToken');
      var deferred = $q.defer();
        $http({
            method: 'DELETE',
            url: REST_REGISTER_SERVICE_URI,
            data: SelectdItemJson ,       
            headers:{'Authorization': tokenCookie}
        }).then(function(response) {
                deferred.resolve(response);
            },function(error){
                console.log(error);
                deferred.reject(error);
            })
        return deferred.promise;
    }*/
   
    function delectAllContact(SelectdItemJson) {
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
            $http.post(REST_REGISTER_SERVICE_URI, SelectdItemJson,{        
                            headers:{'Authorization': tokenCookie}
                  }).then(
                function (response) {
                    deferred.resolve(response.data);
                },
                function(errResponse){
                    console.error('Error while creating User');
                    deferred.reject(errResponse);
                }
            );
            return deferred.promise;
    }










}]);
