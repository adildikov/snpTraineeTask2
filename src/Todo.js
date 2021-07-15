import TodoList from "./TodoList.js";
import Input from "./Input.js";
import Filters from "./Filters.js";

export default class Todo {

    getTodo() {
        this.todoList = new TodoList().getTodoList();
        this.input = new Input((msg) => this.todoList.addNewTask(msg)).getInput();
        this.filters = new Filters(() => this.todoList.showAll(), () => this.todoList.showActive(), () => this.todoList.showCompleted()).getFilters();
    }
}