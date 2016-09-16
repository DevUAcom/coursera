(function () {
'use strict';

angular.module('LunchCheck', [])

.controller('LunchCheckController', LunchCheckController);
LunchCheckController.$inject = ['$scope'];

function LunchCheckController($scope) {
	$scope.lunchMenu = '';
	$scope.message = '';

	$scope.lunchCheck = function () {
		if(!$scope.lunchMenu) {
			$scope.message = 'Please enter data first';
		} else {
			var menuArray = $scope.lunchMenu.split(',');
			console.log(menuArray.length);
			if(menuArray.length <= 3) {
				$scope.message = 'Enjoy!';
			} else {
				$scope.message = 'Too much!';
			}
		}
	}

}

})();
