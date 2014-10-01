angular.module('toDo', []).
controller('toDoCtrl', ['$scope', function ($scope) {
	$scope.todos = [];
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

	$scope.getTotalTodos = function () {
    	return $scope.todos.length;
  	}

	$scope.addTask = function () {
		$scope.todos.push({
			'title': $scope.newTask,
			'done': false
		});
		$scope.newTask = '';
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}
	$scope.remainingTasks = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};
	$scope.clearCompleted = function () {
		$scope.todos = $scope.todos.filter(function (todo) {
			return !todo.done;
		});
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}
	$scope.deleteTask = function(todo) {
		$scope.todos.splice($scope.todos.indexOf(todo), 1);
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}
}]);