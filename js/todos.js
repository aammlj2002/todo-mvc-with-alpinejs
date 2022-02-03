window.todos = function () {
	return {
		todos: [],
		todo: "",
		editedTodo: null,
		addTodos() {
			this.todos.push({
				id: this.todos.length + 1,
				body: this.todo,
				completed: false,
			});
			this.todo = "";
		},
		get active() {
			return this.todos.filter((todo) => !todo.completed);
		},
		get completed() {
			return this.todos.filter((todo) => todo.completed);
		},
		editTodo(todo) {
			todo.cacheBody = todo.body;
			this.editedTodo = todo;
		},
		cancleEdit(todo) {
			todo.body = todo.cacheBody;
			this.editedTodo = null;
			delete todo.cacheBody;
		},
		deleteTodo(todo) {
			let position = this.todos.indexOf(todo);
			this.todos.splice(position, 1);
		},
		completedTodo(todo) {
			todo.completed = !todo.completed;
		},
		completeEdit(todo) {
			this.editedTodo = null;
		},
	};
};
