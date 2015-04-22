'use strict';
angular.module('log_in',[])
.controller('LoginCtrl',['$scope', '$http', function($scope, $http) {
	$scope.dologin = function() {
		$http.get('index.php?ctrl=auth&action=login&login='+$scope.login+'&pass='+$scope.pass).success(
			function(data){
				if(data.done){
					window.location = 'index.php?ctrl=warelog';
				}else{
					$scope.error = data.error;
				}
			}
		);
	}
}]);