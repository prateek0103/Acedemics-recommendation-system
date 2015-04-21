

stealthApp.controller('status',
    function ($scope, $http, $interval) {
        var obj = {};
        obj.income = 0;
        obj.online = 0;
        obj.unique = 0;
        obj.cash=0;

        function xhr() {
            $http.get('peopleOnline.php').
            success(function (data, status, headers, config) {
                obj.online = data;
            }).
            error(function (data, status, headers, config) {
                obj.online = 'ERROR';
            });
        }

        function income() {
            $http.get('todayIncome.php').success(function (data, status, headers, config) {
                obj.income = data;

            }).error(function (data, status, headers, config) {
                obj.income = 'ERROR';
            });
        }

        function unique() {
            $http.get('uniqueUsers.php').success(function (data, status, headers, config) {
                obj.unique = data;

            }).error(function (data, status, headers, config) {
                obj.unique = 'ERROR';
            });
        }
    
        function cash() {
            $http.get('cashInDrawer.php').success(function (data, status, headers, config) {
                obj.cash = data;

            }).error(function (data, status, headers, config) {
                obj.cash = 'ERROR';
            });
        }


        $interval(xhr, 5000);
        $interval(income, 5001);
        $interval(unique, 5002);
        $interval(cash, 5003);
        $scope.obj = obj;


    });

stealthApp.controller('newUser',
    function ($scope, $http) {
        var newUser = {};
        newUser.error = "ERROR";
        var formSubmit = false;

        $scope.clear = function () {
            $scope.userName = "";
            $scope.userContact = "";
            $scope.userPwd = "";
        };

        $scope.$watch("userContact", function () {
            if ($scope.userContact.length == 10) {
                $http.post('checkNumber.php', {
                    "number": $scope.userContact
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        formSubmit = false;
                        toast('User already exists in the system', 4000);
                    } else {
                        formSubmit = true;
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        });

        $scope.newUserSubmit = function () {
            if (formSubmit == true) {
                $http.post('newUser.php', {
                    "number": $scope.userContact,
                    "name": $scope.userName,
                    "password": $scope.userPwd,
                    "level": $scope.userType
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>New user created</span>', 4000);
                        $scope.clear();
                    } else {
                        toast('New user creation failed', 4000);
                        $scope.clear();
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            } else {
                obj.error = "<div class=\"red-text\"><i class=\"mdi-alert-error\"></i>User with this contact exists</div>";
            }


        };
    });

stealthApp.controller('existingUser', function ($scope, $http) {
  $scope.object={};

    $scope.fetchData = function () {
        $http.post('existingUser.php', {
            "number": $scope.userContact
        }).
        success(function (data, status, headers, config) {

            if (data == 0) {
                toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>User not found</span>', 4000);

            } else {
              $scope.object=angular.fromJson(data);

                toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Query Successful</span>', 4000);
            }
        }).
        error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });



    };

});

stealthApp.controller('recharge',
    function ($scope, $http) {

        var formSubmit = false;

        $scope.clear = function () {
            $scope.amount = "";
            $scope.userContact = "";
        };

        $scope.$watch("userContact", function () {
            if ($scope.userContact.length == 10) {
                $http.post('checkNumber.php', {
                    "number": $scope.userContact
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        formSubmit = true;
                    } else {
                        formSubmit = false;
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        });

        $scope.recharge = function () {
            if (formSubmit == true) {
                $http.post('recharge.php', {
                    "number": $scope.userContact,
                    "amount": $scope.amount
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Recharge Successful</span>', 4000);
                        $scope.clear();
                    } else {
                        toast('Recharge Failed', 4000);
                        $scope.clear();
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            } else {
                toast('No such user', 4000);
            }


        };
    });

stealthApp.controller('refund',
    function ($scope, $http) {

        var formSubmit = false;

        $scope.clear = function () {
            $scope.amount = "";
            $scope.userContact = "";
        };

        $scope.$watch("userContact", function () {
            if ($scope.userContact.length == 10) {
                $http.post('checkNumber.php', {
                    "number": $scope.userContact
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        formSubmit = true;
                    } else {
                        formSubmit = false;
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            }
        });

        $scope.refund = function () {
            if (formSubmit == true) {
                $scope.amount=-1*$scope.amount;
                $http.post('recharge.php', {
                    "number": $scope.userContact,
                    "amount": $scope.amount
                }).
                success(function (data, status, headers, config) {
                    if (data > 0) {
                        toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Refund Successful</span>', 4000);
                        $scope.clear();
                    } else {
                        toast('Refund Failed', 4000);
                        $scope.clear();
                    }
                }).
                error(function (data, status, headers, config) {
                    // called asynchronously if an error occurs
                    // or server returns response with an error status.
                });
            } else {
                toast('No such user', 4000);
            }


        };
    });

stealthApp.controller('pricingTable',
    function ($scope, $http, $interval,$rootScope) {

    $scope.pricings={};
    $scope.balance=0.0;

        $scope.getPricing=function() {

            $http.get('pricingTable.php').
            success(function (data, status, headers, config) {
                $scope.pricings = angular.fromJson(data);
            }).
            error(function (data, status, headers, config) {
                $scope.pricings = 'ERROR';
            });


        }
        
        $scope.getBalance=function(){
          $http.post('accBalance.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          
              $scope.balance=data;
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }
        
        $scope.select=function(pricings,option){
          $http.post('putPricing.php', {
              "code": pricings.code,
              "number": $rootScope.localContact,
              "option":option
          }).
          success(function (data, status, headers, config) {
          
              if(data==1){
              window.location.href="user.php"
              }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }

        $scope.removeRow=function(pricings){
          $http.post('deletePricing.php', {
              "code": pricings.code
          }).
          success(function (data, status, headers, config) {
              if (data > 0) {
                  toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Pricing plan deleted successfully</span>', 4000);

                  $scope.getPricing();
              } else {
                  toast('POST failed', 4000);
              }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }



        $scope.putPricing=function(){

          $http.post('newPricing.php', {
              "cost": $scope.cost,
              "cycle": $scope.cycle,
              "period":$scope.period
          }).
          success(function (data, status, headers, config) {
              if (data > 0) {
                  toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Pricing plan made successfully</span>', 4000);

                  $scope.getPricing();
              } else {
                  toast('POST failed', 4000);
              }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
        }
    $scope.getPricing();
    $scope.getBalance();

    });

stealthApp.controller('billsTable',
    function ($scope, $http, $interval) {

    $scope.bills={};

        $scope.getBills=function() {

            $http.post('billing.php', {
                "number": $scope.number
            }).
            success(function (data, status, headers, config) {
                $scope.bills = angular.fromJson(data);
            }).
            error(function (data, status, headers, config) {
                $scope.bills = 'ERROR';
            });
        }
        
        

    });

stealthApp.controller('usersOnlineTable',
    function ($scope, $http, $interval, $rootScope) {

    $scope.onlineUsers={};
    
    $scope.contact=$rootScope.localContact;
    

        $scope.getUsers=function() {

            $http.get('loggedOnList.php').
            success(function (data, status, headers, config) {
                $scope.onlineUsers = angular.fromJson(data);
            }).
            error(function (data, status, headers, config) {
                $scope.onlineUsers = 'ERROR';
            });
        }
        
        $scope.removeRow=function(users){
            
          $http.post('logoutUser.php', {
              "contact": users.user,
              "number": users.number
          }).
          success(function (data, status, headers, config) {
              if(data>0){
                  toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>User logged out successfully</span>', 4000);

                  $scope.getUsers();}
              else{
              toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>User log out failed</span>', 4000);

                  $scope.getUsers();
              }
              
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }

    $interval($scope.getUsers, 8000);
    $scope.getUsers();
    });

stealthApp.controller('products',
    function ($scope, $http, $interval, $rootScope) {

    $scope.products={};

        $scope.getProduct=function() {

            $http.get('getProduct.php').
            success(function (data, status, headers, config) {
                $scope.products = angular.fromJson(data);
            }).
            error(function (data, status, headers, config) {
                $scope.products = 'ERROR';
            });


        }

        $scope.removeRow=function(product){
          
          $http.post('deleteProduct.php', {
              "name": product.name
          }).
          success(function (data, status, headers, config) {
              if (data > 0) {
                  toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Product deleted successfully</span>', 4000);

                  $scope.getProduct();
              } else {
                  toast('POST failed', 4000);
              }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }
        
        $scope.order=function(product){
          
          $http.post('meter.php', {
              "number": $rootScope.localContact,
                "amount":product.price
          }).
          success(function (data, status, headers, config) {
              toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Product ordered successfully</span>', 4000);

                 
              
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }



        $scope.putProduct=function(){

          $http.post('addProduct.php', {
              "name": $scope.name,
              "price": $scope.price
          }).
          success(function (data, status, headers, config) {
              if (data > 0) {
                  toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Product added successfully</span>', 4000);

                  $scope.getProduct();
              } else {
                  toast('POST failed', 4000);
              }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
        }
    $scope.getProduct();

    });

stealthApp.controller('userCards',
    function ($scope, $http, $interval, $rootScope) {

        $scope.getBalance=function(){
          $http.post('accBalance.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          
              $scope.balance=data;
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }
        
        $scope.getPlan=function(){
          $http.post('pricingPlan.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          
              $scope.plan=data;
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }

        $scope.getHoursPlayed=function(){
          $http.post('getHours.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          
              $scope.hours=data;
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }

        $scope.getLastRecharge=function(){
          $http.post('getLastRecharge.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          
              $scope.lastRecharge=data;
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });

        }
        
        $scope.billing=function(){
        
            $scope.getPlan();
            $http.post('getPricing.php', {
              "code": $scope.plan
          }).
          success(function (data, status, headers, config) {
          
              $scope.planDetails=angular.fromJson(data);
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
            
            switch($scope.planDetails[0].cycle){
            case "month":
    $time=2592000;
    break;

case "hour":
    $time=3600;
    break;

case "day":
    $time=86400;
    break;

case "week":
    $time=604800;
    break;

case "year":
    $time=31556926;
    break;

default: $time= "Wrong Cycle Type";
            }
           
            $pulseRate=$scope.planDetails[0].amount/$time;
            $amount=$pulseRate*12;
            
            $http.post('meter.php', {
              "number": $rootScope.localContact,
                "amount":$amount
          }).
          success(function (data, status, headers, config) {
          
              $scope.getBalance();
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
            
        }


     //   $interval($scope.getBalance, 10000);
        $interval($scope.getPlan, 10001);
        $interval($scope.getHoursPlayed, 10002);
        $interval($scope.getLastRecharge, 10003);
        $interval($scope.billing, 12000);


    });

stealthApp.controller('changePassword',
    function ($scope, $http, $interval, $rootScope) {
    
    $scope.newPassSubmit=function(){
    $new=$.md5($scope.newPwd1);
        $old=$.md5($scope.oldPwd);
        
        $http.post('password.php', {
              "contact": $rootScope.localContact,
                "old":$old,
            "newpwd":$new
          }).
          success(function (data, status, headers, config) {
          
              if(data==1)
              {
              toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Password change successful</span>', 4000);
              }
            else if(data==2){
            toast('<i class=&quot;mdi-action-done green-text&quot;></i><span>Old password is wrong</span>', 4000);
            }
          }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    }
});

stealthApp.controller('sessionsInfo',
    function ($scope, $http, $interval, $rootScope) {
    
    $scope.getSessions=function(){
        
        $http.post('getSessions.php', {
              "contact": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          $scope.sessions = angular.fromJson(data);
              }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    }
    
    $scope.getSessions();
});

stealthApp.controller('bills',
    function ($scope, $http, $interval, $rootScope) {
    
    $scope.getBills=function(){
        
        $http.post('billing.php', {
              "number": $rootScope.localContact
          }).
          success(function (data, status, headers, config) {
          $scope.bills = angular.fromJson(data);
              }).
          error(function (data, status, headers, config) {
              // called asynchronously if an error occurs
              // or server returns response with an error status.
          });
    }
    
    $scope.getBills();
});
