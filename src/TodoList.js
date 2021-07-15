import Task from "./Task.js"

export default class TodoList {
    constructor(lclStrg) {
        this.todoList = [];
        this.lclStrg = lclStrg;
        this.crnFilter = "all";
        this.counter = 0;
    }

    // updateLocal() {
    //     const array = [];
    //     this.todoList.forEach((el) => {
    //         array.push(el.getMessage());
    //     })
    //     localStorage.setItem('todos', JSON.stringify(array));
    // }

    _updateCounter() {
        this.todoList.forEach((el) => {
            if (el.getState() === false) {
                this.counter += 1;
            }
        })
        this.counterHTML.textContent = `Todos left: ${this.counter}`;
        this.counter = 0;
    }

    _deleteTask(task) {
        this.todoList = this.todoList.filter(el => el !== task);
    }

    _deleteCompleted = () => {
        if (this.todoList.length !== 0){
            this.todoList.forEach((el) => {
                if (el.getState() === true) {
                    el._deleteTask();
                }
            })
        }
    }

    _completeAll = () => {
        if (this.todoList.length !== 0) {
            if (this.todoList.some((todo) => !todo.getState())){
                this.todoList.forEach((el) => {
                    el.makeComplete();
                })
            }
            else {
                this.todoList.forEach((el) => {
                    el.makeIncomplete();
                })
            }
        }
        this.whatFilter();
    }

    addNewTask(message) {
        if (message) {
            const newTask = new Task(message, '.task__template', (task) => this._deleteTask(task), () => this._updateCounter()).getTask();
            this.todoList.push(newTask);
            this.todoUl.append(newTask.task);
        }
        this.whatFilter();
        this._updateCounter();
    }

    whatFilter() {
        if (this.crnFilter === 'all') this.showAll();
        if (this.crnFilter === 'active') this.showActive();
        if (this.crnFilter === 'complete') this.showCompleted();
    }

    showAll() {
        this.crnFilter = "all";
        this.todoList.forEach((el) => {
            el.makeVisible();
        })
    }

    showActive() {
        this.showAll();
        this.crnFilter = "active";
        this.todoList.forEach((el) => {
            if (el.getState() === true) el.makeInvisible();
        })
    }

    showCompleted() {
        this.showAll();
        this.crnFilter = "complete";
        this.todoList.forEach((el) => {
            if (el.getState() === false) el.makeInvisible();
        })
    }

    _setEventListeners() {
        this.deleteCompletedBtn.addEventListener('click', this._deleteCompleted);
        this.completeAllBtn.addEventListener('click', this._completeAll);
    }

    getTodoList() {
        this.todoUl = document.querySelector('.main_todoList');
        this.completeAllBtn = document.querySelector('.filter__completeAll');
        this.deleteCompletedBtn = document.querySelector('.filter__deleteCompleted');
        this.counterHTML = document.querySelector('.counter');
        this.counterHTML.textContent = `Todos left: ${this.counter}`;
        this._setEventListeners();
        return(this)
    }
}