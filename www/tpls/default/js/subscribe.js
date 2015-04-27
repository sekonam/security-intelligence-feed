'use strict';
(function(){
	var first_time = true;
	function filter($scope) {
		return (($scope.ip_start) ? '&ip_start=' + $scope.ip_start : '') + (($scope.ip_finish) ? '&ip_finish='+$scope.ip_finish : '') + (($scope.cidr) ? '&cidr='+$scope.cidr : '');
	}
	addWareLogCtrl('Subscribe',filter,function ($scope,$http) {
		$http.get('index.php?ctrl=subscribe&action=lst').success(
			function(data) {
				$scope.ranges = data;
			}
		);
		$scope.dosubscribe = function () {
			cidr2range();
			$http.get('index.php?ctrl=subscribe&action=add'+filter($scope)).success(
				function(data){
					$scope.ranges.push(data);
				}
			);
		};
		$scope.rangedel = function (id,index) {
			if(confirm("Are you sure you want to delete the range from your watchlist?")){
				$http.get('index.php?ctrl=subscribe&action=del&id='+id).success(
					function(data){
						$scope.ranges.splice(index,1);
					}
				);
			}
		};
		$scope.filtereddata = function(){
			cidr2range();
			$scope.loadpages(
				function(){
					if(first_time){
						$scope.pagesFrom = 1;
						$scope.pagesTo = Math.min($scope.pages_amount,10);
						first_time=false;
					}
					$scope.loaddata(1);
				}
			);
		};
		$scope.setrange = function(start,finish) {
			$scope.ip_start = start;
			$scope.ip_finish = finish;
			$scope.cidr = '';
			$scope.filtereddata()	;
		}
		function cidr2range() {
			if($scope.cidr) {
				$http.get('index.php?ctrl=warelog&action=cidr2range&cidr='+$scope.cidr).success(
					function (data){
						$scope.ip_start = data.ip_start;
						$scope.ip_finish = data.ip_finish;
					}
				);
			}
		}
		$scope.rangechange = function () {
			$scope.cidr = '';
		}
	});
})();
