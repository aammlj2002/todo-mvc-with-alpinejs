window.todos = function () {
	return {
		todos: [],
		todo: "",
		filter: "all",
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
		get filteredTodos() {
			return {
				all: this.todos,
				active: this.active,
				completed: this.completed,
			}[this.filter];
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
		editComplete(todo) {
			if (todo.body.trim() === "") {
				return this.deleteTodo(todo);
			}
			this.editedTodo = null;
		},
	};
};
