angular.module('toDo', []).
controller('toDoCtrl', ['$scope', function ($scope) {
	$scope.todos = [];
	$scope.markAll = false;
	$scope.saved = localStorage.getItem('todos');
	$scope.todos = (localStorage.getItem('todos')!==null) ? JSON.parse($scope.saved) : [];
	localStorage.setItem('todos', JSON.stringify($scope.todos));

	$scope.getTotalTodos = function () {
    	return $scope.todos.length;
  	}

	$scope.toggleMarkAll = function() {
      angular.forEach($scope.todos, function(todo) {
        todo.done = $scope.markAll;
      });
	};

	$scope.addTask = function () {
		$scope.todos.push({
			'title': $scope.newTask,
			'done': false,
			'editing': false
		});
		$scope.newTask = '';
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}

	$scope.isTodo = function(){
      return $scope.todos.length > 0;  
	}

	$scope.remainingTasks = function() {
		var count = 0;
		angular.forEach($scope.todos, function(todo){
			count+= todo.done ? 0 : 1;
		});
		return count;
	};

	$scope.editOnEnter = function(todo){
      	$scope.editTask(todo);
	};

	$scope.editTask = function(todo){
      todo.editing = !todo.editing;
	};

	$scope.clearCompleted = function () {
		$scope.todos = $scope.todos.filter(function (todo) {
			return !todo.done;
		});
		$scope.markAll = false;
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}

	$scope.remaining = function() {
	    var count = 0;
	    angular.forEach($scope.todos, function(todo) {
	      count += todo.done ? 0 : 1;
	    });
	    return count;
	};

	$scope.hasDone = function() {
      return ($scope.todos.length != $scope.remaining());
	}


	$scope.deleteTask = function(todo) {
		$scope.todos.splice($scope.todos.indexOf(todo), 1);
		localStorage.setItem('todos', JSON.stringify($scope.todos));
	}
}]);