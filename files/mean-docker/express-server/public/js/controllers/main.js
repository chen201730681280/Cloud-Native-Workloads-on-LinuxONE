angular.module('todoController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','Todos', function($scope, $http, Todos) {
		$scope.formData = {};
		$scope.amount;
		$scope.loading = true;

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

				alert($scope.formData.id);
				alert($scope.formData.pwd);

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
			$scope.loading = true;

			Todos.delete(id)
				// if successful creation, call our get function to get all the new todos
				.success(function(data) {
					$scope.loading = false;
					$scope.todos = data; // assign our new list of todos
				});
		};

		$scope.query = function() {
			alert("Query " + $scope.amount + " yuan");
			
			Todos.get()
				.success(function(data) {
					for(var key in data){
						alert(key + data[key]);
					}
				});
		}
		
		$scope.deposit = function() {

			alert("Deposit " + $scope.amount + " yuan");
			// TODO: balance -= amount

		};

		$scope.withdraw = function() {

			alert("Withdraw " + $scope.amount + " yuan");
			// TODO: balance += amount

		}
	}]);
