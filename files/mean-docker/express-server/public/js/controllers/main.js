angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.loading = true;
		$scope.account;
		$scope.amount;
		$scope.balance = 1024;
		$scope.income = 233;
		$scope.outcome = 666;
		$scope.customer = {
			username: "LotteWong",
			password: "password",
			lastSuccessfulLogin: "20190528",
			account: "ICBCAccount",
			balance: 1024,
			income: 233,
			outcome: 666,
		};
		$scope.transaction = {
			type: "Transfer",
			from: "Charlotte",
			to: "Greta",
			amount: "1024",
			time: "20190528"
		};
		$scope.finance = {
			type: "Yu'E Bao",
			rate: "2.33%",
			interest: "6.66",
		};

		$scope.selected;

		// GET =====================================================================
		// when landing on the page, get all todos and show them
		// use the service to get all the todos
		Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});

		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		$scope.createTodo = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			if ($scope.formData.id != undefined && $scope.formData.pwd != undefined) {
				$scope.loading = true;

				console.log($scope.formData.id);
				console.log($scope.formData.pwd);

				// call the create function from our service (returns a promise object)
				Todos.create($scope.formData)

					// if successful creation, call our get function to get all the new todos
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.todos = data; // assign our new list of todos
					});
			}

		};

		// DELETE ==================================================================
		// delete a todo after checking it
		$scope.deleteTodo = function(id) {
			console.log("exisited id: " + id);
			
			/*$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});*/

			$scope.selected = id;

			console.log("selected id: " + $scope.selected);
		};

		$scope.query = function() {			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					$scope.loading = true;
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							console.log("Query " + data[idx]["balance"] + " yuan");
							alert("Query " + data[idx]["balance"] + " yuan");
						}
					}
					$scope.amount = '';
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		}
		
		$scope.deposit = function() {
			alert("Deposit " + $scope.amount + " yuan");
			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							$scope.loading = true;
							console.log("origin balance: " + data[idx]["balance"]);
							console.log("newly amount: " + parseFloat($scope.amount));
							Todos.put($scope.selected, {amount: data[idx]["balance"] + parseFloat($scope.amount)})
							// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.todos = data; // assign our new list of todos
							});
						};
					}
					$scope.amount = '';
				});
		};

		$scope.withdraw = function() {

			alert("Withdraw " + $scope.amount + " yuan");
			
			Todos.get()
				.success(function(data) {
					var msg = JSON.stringify(data);
					console.log(msg);
					
					for(var idx in data) {
						console.log("item id: " + data[idx]["_id"]);
						console.log("selected id: " + $scope.selected);
						if(data[idx]["_id"] == $scope.selected) {
							$scope.loading = true;
							console.log("origin balance: " + data[idx]["balance"]);
							console.log("newly amount: " + parseFloat($scope.amount));
							Todos.put($scope.selected, {amount: data[idx]["balance"] - parseFloat($scope.amount)})
							// if successful creation, call our get function to get all the new todos
								.success(function(data) {
									$scope.loading = false;
									$scope.todos = data; // assign our new list of todos
							});
						};
					}
					$scope.amount = '';
				});

		}
	}]);
