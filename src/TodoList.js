import Task from "./Task.js"

export default class TodoList {
    constructor(lclStrg) {
        this.todoList = [];
        this.lclStrg = lclStrg;
        this.crnFilter = "all";
    }

    updateLocal() {
        const array = [];
        this.todoList.forEach((el) => {
            array.push(el.getMessage());
        })
        localStorage.setItem('todos', JSON.stringify(array));
    }

    _deleteTask(task) {
        this.todoList = this.todoList.filter((el) => el !== task);
        this.updateLocal();
    }

    _deleteCompleted = () => {
        if (this.todoList.length !== 0){
            this.todoList.forEach((el) => {
                if (el.getState() === true) {
                    el._deleteTask();
                }
            })
        }
        this.updateLocal();
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
    }

    addNewTask(message) {
        if (message) {
            const newTask = new Task(message, '.task__template', (task) => this._deleteTask(task)).getTask();
            this.todoList.push(newTask);
            this.todoUl.append(newTask.task);
        }
        this.updateLocal();
    }

    showAll() {
        this.todoList.forEach((el) => {
            console.log(el)
            el.makeVisible();
        })
    }

    showActive() {
        this.todoList.forEach((el) => {
            if (el.getState() === true) el.toggleActiveChange();
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
        this._setEventListeners();
        return(this)
    }
}