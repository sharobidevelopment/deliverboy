/**
 * 
 */

'use strict';
angular.module('myApp').factory('OrdertakingService', ['$http', '$q','$cookies', function($http, $q,$cookies){
    
    var REST_TARGET_URI = serverurl+'/';
    var REST_GET_ORDERS_URI = REST_TARGET_URI+'orders/forstore';
    var REST_GET_ORDERS_PEGINITION_URI = REST_TARGET_URI+'orders/forstore?page=';
    var REST_GET_ORDERS_PEGINITION_SUB_URI ='&limit=';
    var REST_SALE_ITEM_URI=REST_TARGET_URI+'orders/sale';
    var REST_ACCEPT_ITEM_URI=REST_TARGET_URI+'orders/accept';
    var REST_ACCEPT_ITEM_URI_DUP=REST_TARGET_URI+'orders/assignOrderItemStore';
    var REST_FETCH_PRESCRIPTION_URI=REST_TARGET_URI+'prescriptions/download/';
    var REST_SUB_URI1='/foradmin';
    var REST_GET_STORES_LOCATION_URI=serverurl+'/orders/getAllStoreForAgentAdmin';
    var REST_GET_ORDER_ADDRESS_LATLNG_URI=REST_TARGET_URI+'addresses/';
    var REST_SALE_ORDER_URI='';
    var REST_ACCEPT_ORDER_URI='';
    var limit=20;

    var factory = {
    	getOrdersByStore: getOrdersByStore,
        getStoresLocation:getStoresLocation,
        getOrdersByPeginition:getOrdersByPeginition,
        fetchFile:fetchFile,
        itemAccept:itemAccept,
        getAddressLatLng:getAddressLatLng
    };
    return factory;

    

    function getOrdersByStore() {
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
        $http.get(REST_GET_ORDERS_URI,{        
                    headers:{'Authorization': tokenCookie}
                  })
            .then(
            function (response) {
                
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    
function getOrdersByPeginition(pageno){
     var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
        $http.get(REST_GET_ORDERS_PEGINITION_URI+pageno+REST_GET_ORDERS_PEGINITION_SUB_URI+limit,{        
                    headers:{'Authorization': tokenCookie}
                  })
            .then(
            function (response) {
                
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
}




  function fetchFile(pid){
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();

        $http.get(REST_FETCH_PRESCRIPTION_URI+pid+REST_SUB_URI1,{        
                    headers:{'Authorization': tokenCookie},responseType: 'arraybuffer'
                  })
            .then(
            function (response) {
                deferred.resolve(response.data);
            },
            function(errResponse){
              console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;


  }




function getStoresLocation(){
     var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
        $http.get(REST_GET_STORES_LOCATION_URI,{        
                    headers:{'Authorization': tokenCookie}
                  })
            .then(
            function (response) {
                
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
}



 function getAddressLatLng(addressid) {
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
        $http.get(REST_GET_ORDER_ADDRESS_LATLNG_URI+addressid,{        
                    headers:{'Authorization': tokenCookie}
                  })
            .then(
            function (response) {
                
                deferred.resolve(response);
            },
            function(errResponse){
                console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }
    


   function itemAccept(orderDetails) {
        var tokenCookie = $cookies.get('storeToken');
        var deferred = $q.defer();
         
         $http.post(REST_ACCEPT_ITEM_URI_DUP,orderDetails,{        
                    headers:{'Authorization': tokenCookie}
                  })
            .then(
            function (response) {
                $.alert.open(response.data.message);
                deferred.resolve(response);
            },
            function(errResponse){
                $.alert.open(errResponse.data.message);
                console.error('Error while orders  fetch');
                deferred.reject(errResponse);
            }
        );
        return deferred.promise;
    }






}]);
