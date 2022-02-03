window.todoStore = {
	todos: JSON.parse(localStorage.getItem("todo-store") || "[]"),
	save() {
		localStorage.setItem("todo-store", JSON.stringify(this.todos));
	},
};
window.todos = function () {
	return {
		...todoStore,
		todo: "",
		filter: "all",
		editedTodo: null,
		get allComplete() {
			return this.todos.length === this.completed.length;
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
		addTodos() {
			if (!this.todo) return;
			this.todos.push({
				id: Date.now(),
				body: this.todo,
				completed: false,
			});
			this.save();
			this.todo = "";
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
			this.save();
		},
		toggleCompletion(todo) {
			todo.completed = !todo.completed;
			this.save();
		},
		editComplete(todo) {
			if (todo.body.trim() === "") {
				return this.deleteTodo(todo);
			}
			this.editedTodo = null;
			this.save();
		},
		toggleAllComplete() {
			let allComplete = this.allComplete;
			this.todos.forEach((todo) => (todo.completed = !allComplete));
			this.save();
		},
		clearCompletedTodos() {
			this.todos = this.active;
			this.save();
		},
	};
};
