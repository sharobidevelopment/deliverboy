'use strict';

angular.module('myApp').controller('alreadyDeliveredOrderController', ['$scope', '$cookies', '$location',  '$route', '$rootScope','$window', '$timeout', '$interval' , '$http' , function($scope, $cookies, $location, $route, $rootScope,$window,$timeout,$interval,$http) {
    //alert("hiiii");
    var self = this;
    $scope.orders=[];
    //alert("Hiiiii");
    $scope.orders=[];
    $scope.limit = 10;
    $scope.time=Date.parse(new Date());
    $scope.time=Date.parse(new Date());
    $scope.navigators = {prev:{state:true}, next:{state:true}};

    $scope.storeStatusCookie = $cookies.get('StoreStatus');
       if ($scope.storeStatusCookie === 'Deactive') {
           $location.path($rootScope.contextpath + "/");
     }
       else if ($scope.storeStatusCookie === undefined) {
           $scope.storeStatusCookie = 'Deactive';
           $location.path($rootScope.contextpath + "/");
       }

    var tokenCookie = $cookies.get('storeToken');   

    $scope.postcombination = {"deliveryType":"YMM Delivery","status":4}

    $http.get(serverurl + "/orders/getOrderDetailsByDeliveryPersonId/4", {
            headers: {
                'Authorization': tokenCookie
            }
        })
        .then(
         function(response) {
         	$scope.orders = response.data;
         	console.log($scope.orders);
         	if($scope.orders.length != 0) { 
         		//alert("Hiu")
                      $scope.paginate = function(){ 
                        $scope.pages = [];//clear it here resetting
                        var n = Math.ceil($scope.orders.length / $scope.limit);
                        for(var i=0; i<n; i++)
                          $scope.pages.push({start:(i*$scope.limit), page:i+1, active:false});
                        $scope.setPageActive(1); 
                      }
                      $scope.setPageActive = function(page){
                        var index = page-1;
                        $scope.index_no = page-1;
                        var n =   $scope.pages.length;
                        var previous_page = 1;
                        for(var i=0; i<n; i++){
                          if($scope.pages[i].active)
                            var current_page = $scope.pages[i].page;
                        
                          if(i==index)
                            $scope.pages[i].active = true;
                          else
                          $scope.pages[i].active= false;
                        } 
                       var limit = $scope.pages[index].start+$scope.limit;
                      $scope.copy_items = angular.copy($scope.orders); 
                      $scope.copy_items = $scope.copy_items.splice($scope.pages[index].start, limit+1);
                      $scope.navigators["next"].state =  index < (n-1) ? true:false;
                      $scope.navigators["prev"].state =  index > 0 ? true:false;
                      }
                      $scope.prev = function(){ 
                        if($scope.navigators.prev.state){
                           $scope.setPageActive($scope.getCurrentPage()-1);
                        }
                      }
                      $scope.next = function(){
                        if($scope.navigators.next.state){
                           $scope.setPageActive($scope.getCurrentPage()+1);
                        }
                      }
                      $scope.getCurrentPage = function (){
                         for(var i=0;i<$scope.pages.length; i++)
                          if($scope.pages[i].active)
                            return i+1;
                      }
                          $scope.paginate();
                          console.log($scope.copy_items);
                     }
                     else {
                        console.log("No Data Found");
                        }

        },
        function(errResponse) {
            console.error("errResponse:" + 'Error while fetching All Contacts details');
		});

        $scope.chkShow= function(order) {
		   for( var i=0;i<order.orderDetails.length;i++){
		    if( order.orderDetails[i].status == 4 && order.orderDetails[i].deliveryAgentId !=0){
		          return true;  
		        }     
		    }
		    return false;        
 		}

 	

// var myFunction =function(id){
// 	alert(id)
// }



}]);    