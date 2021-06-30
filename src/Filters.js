import * as Consts from "./constants.js";
import TodoList from "./TodoList.js";

export default class Filters {
    constructor(todos) {
        this.todos = todos;
        this._filters = Consts.filters;
        this.crnFilter = "all";
    }

    whatFilter() {
        if (this.crnFilter === 'all') this.showAll();
        if (this.crnFilter === 'active') this.showActive();
        if (this.crnFilter === 'complete') this.showCompleted();
    }

    showAll() {
        this.crnFilter = "all";
        Consts.showAllBtn.className = 'filter__all button current_filter';
        Consts.showActiveBtn.className = 'filter__active button';
        Consts.showCompletedBtn.className = 'filter__completed button';
        this.todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            parent.className = '';
        })
        Consts.todoList.classList.remove('hidden');
    }
    
    showActive() {
        this.showAll();
        this.crnFilter = "active";
        Consts.showAllBtn.className = 'filter__all button';
        Consts.showActiveBtn.className = 'filter__active button current_filter';
        Consts.showCompletedBtn.className = 'filter__completed button';
        this.todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            if (todo.complete && !parent.classList.contains('hidden')){
                parent.className += 'hidden';
            }
        })
        this.allTodosCompleted();
    }
    
    showCompleted() {
        this.showAll();
        this.crnFilter = "complete";
        Consts.showAllBtn.className = 'filter__all button';
        Consts.showActiveBtn.className = 'filter__active button';
        Consts.showCompletedBtn.className = 'filter__completed button current_filter';
        this.todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            if (!todo.complete && !parent.classList.contains('hidden')){
                parent.className += 'hidden';
            }
        })
        this.allTodosActive();
    }
    
    allTodosActive() {
        let allActive = true;
        this.todos.forEach((todo) => {
            if (todo.complete){
                allActive = false;
                return;
            }
        })
        if (allActive) Consts.todoList.classList.add('hidden');
    }
    
    allTodosCompleted() {
        let allCompl = true;
        this.todos.forEach((todo) => {
            if (!todo.complete){
                allCompl = false;
                return;
            }
        })
        if (allCompl) Consts.todoList.classList.add('hidden');
    }
}