import * as Consts from "./constants.js";
import TodoList from "./TodoList.js";

export default class Filters {
    constructor() {
        this._filters = Consts.filters;
        this.crnFilter = "all";
    }

    whatFilter(todos) {
        if (this.crnFilter === 'all') this.showAll(todos);
        if (this.crnFilter === 'active') this.showActive(todos);
        if (this.crnFilter === 'complete') this.showCompleted(todos);
    }

    showAll(todos) {
        this.crnFilter = "all";
        Consts.showAllBtn.className = 'filter__all button current_filter';
        Consts.showActiveBtn.className = 'filter__active button';
        Consts.showCompletedBtn.className = 'filter__completed button';
        todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            parent.className = '';
        })
        Consts.todoList.classList.remove('hidden');
    }
    
    showActive(todos) {
        this.showAll(todos);
        this.crnFilter = "active";
        Consts.showAllBtn.className = 'filter__all button';
        Consts.showActiveBtn.className = 'filter__active button current_filter';
        Consts.showCompletedBtn.className = 'filter__completed button';
        todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            if (todo.complete && !parent.classList.contains('hidden')){
                parent.className += 'hidden';
            }
        })
        this.allTodosCompleted(todos);
    }
    
    showCompleted(todos) {
        this.showAll(todos);
        this.crnFilter = "complete";
        Consts.showAllBtn.className = 'filter__all button';
        Consts.showActiveBtn.className = 'filter__active button';
        Consts.showCompletedBtn.className = 'filter__completed button current_filter';
        todos.forEach((todo) => {
            parent = document.getElementById(`todo_${todo.id}`).parentElement;
            if (!todo.complete && !parent.classList.contains('hidden')){
                parent.className += 'hidden';
            }
        })
        this.allTodosActive(todos);
    }
    
    allTodosActive(todos) {
        let allActive = true;
        todos.forEach((todo) => {
            if (todo.complete){
                allActive = false;
                return;
            }
        })
        if (allActive) Consts.todoList.classList.add('hidden');
    }
    
    allTodosCompleted(todos) {
        let allCompl = true;
        todos.forEach((todo) => {
            if (!todo.complete){
                allCompl = false;
                return;
            }
        })
        if (allCompl) Consts.todoList.classList.add('hidden');
    }
}