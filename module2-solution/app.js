(function() {
"use strict";

angular.module("ShoppingListCheckOff", [])
	.controller("ToBuyShoppingController", ToBuyShoppingController)
	.controller("AlreadyBoughtShoppingController", AlreadyBoughtShoppingController)
	.service("ShoppingListCheckOffService", ShoppingListCheckOffService);


	ToBuyShoppingController.$inject = ["ShoppingListCheckOffService"];
	function ToBuyShoppingController(ShoppingListCheckOffService) {
		var vm = this;
		vm.items = ShoppingListCheckOffService.getToByItems();

		vm.buyItem = function(itemIndex) {
			ShoppingListCheckOffService.buyItem(itemIndex);
		}
	}

	AlreadyBoughtShoppingController.$inject = ["ShoppingListCheckOffService"];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var vm = this;
		vm.items = ShoppingListCheckOffService.getBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;

		var toBuyItems = [
			{name: "banana", quantity: 10},
			{name: "strawberry", quantity: 2},
			{name: "mango", quantity: 5},
			{name: "apple", quantity: 1},
			{name: "cherry", quantity: 3}
		];
		var boughtItems = [];

		service.getToByItems = function() {
			return toBuyItems;
		}

		service.getBoughtItems = function() {
			return boughtItems;
		}

		service.buyItem = function(itemIndex) {
			if(itemIndex >= 0 && itemIndex < toBuyItems.length) {
				console.log("service.buyItem");
				boughtItems.push(toBuyItems[itemIndex]);
				toBuyItems.splice(itemIndex, 1);
			}
		}

	}

})();