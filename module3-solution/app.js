(function() {
"use strict";

angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
	.directive('foundItems', foundItemsDirective);

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
	var vm = this;

	vm.found = [];

	vm.getMatchedMenuItems = function(searchTerm) {
		var menuItemsPromise = MenuSearchService.getMatchedMenuItems(searchTerm);
		menuItemsPromise.then (function(foundItems) {
			vm.found = foundItems;
		})
		.catch(function (error) {
			console.log(error);
		});
	}

	vm.removeItem = function(index) {
		vm.found.splice(index, 1);
	}
}

function foundItemsDirective() {
	var ddo = {
		restrict: 'E',
	    templateUrl: 'foundItems.html',
	    scope: {
	      items: '<',
	      onRemove: '&'
	    }
	};

	return ddo;
}

MenuSearchService.$inject = ['$http','ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
	var service = this;

	service.getMatchedMenuItems = function(searchTerm) {
		return $http({
			url: (ApiBasePath + "/menu_items.json")
		})
		.then (function (result) {
			var menuItems = result.data.menu_items;
			var foundItems = [];
			for (var i = menuItems.length - 1; i >= 0; i--) {
				if (menuItems[i].description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
					foundItems.push(menuItems[i]);
				}
			}

			return foundItems;
		});

	}
}


})();