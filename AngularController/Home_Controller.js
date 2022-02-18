/**
 * 
 */
'use strict';

angular.module('myApp').controller('HomeController', ['$scope', '$http' , '$cookies', '$location',  '$route', '$rootScope' , '$interval' , function($scope, $http, $cookies, $location, $route, $rootScope, $interval) {
    var self = this;
    $scope.time=Date.parse(new Date());
    $scope.time_interval = 1; // Time reservation before subadmin can respond. After that control task part to admin
    var pageno=2;
    $scope.interval_count = 0;
    localStorage.setItem("page_link_no", 1);
    
     $scope.storeStatusCookie = $cookies.get('StoreStatus');
       if ($scope.storeStatusCookie === undefined) {
           $location.path($rootScope.contextpath + "/");
           $scope.storeStatusCookie = 'Deactive';
       }
       else if ($scope.storeStatusCookie === 'Deactive') {
           $location.path($rootScope.contextpath + "/");
       }

    
    $scope.deliveryPersonDetails = {};

    var d = new Date();
    var month = d.getMonth()+1;
    var day = d.getDate();
    if(month<=9) {
    	var month1 = "0"+month;
    }
    else {
    	var month1 = month;
    }
    if(day<=9) {
        var day1 = "0"+day;
    }
    else {
        var day1 = day;
    }
    var year = d.getFullYear();

    $scope.TodayDate = year + "-" + month1 + "-" +  day1;
    $scope.TodayContacts = [];
    if(month < 4) {
        $scope.startDateYear = year-1;
    }
    else {
        $scope.startDateYear = year;
    }
       var tokenCookie = $cookies.get('storeToken');
       
     $http.get(serverurl+"/delivery/details", {        
                    headers:{'Authorization': tokenCookie}
    }).then(
    function(response) {
       $scope.deliveryPersonDetails = response.data;
       //$rootScope.deliverPersonId  = response.data.id;
       localStorage.setItem("deliverypersonidforymmdeliverboy" , response.data.id)
       //alert("call hoache");             
    },
    function(errResponse) {}
    );



}]);