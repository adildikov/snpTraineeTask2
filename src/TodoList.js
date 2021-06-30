import * as Consts from "./constants.js";
import Filters from "./Filters.js";

export default class TodoList {
    constructor(lclStrg) {
        this.todos = [];
        this.lclStrg = lclStrg;
        if (this.lclStrg) {
            this.todos = JSON.parse(this.lclStrg);
        }
        this.filters = new Filters(this.todos);
        this.displayTodos();
    }

    updateLocal() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    countTodos() {
        let cnt = 0;
        this.todos.forEach((todo) => {
            if (!todo.complete) cnt += 1;
        })
        return cnt;
    }

    displayTodos() {
        let displayTodoStr = '';
        if (this.todos.length === 0) {
            this.filters._filters.classList.add('hidden');
            Consts.todoList.classList.add('hidden');
        }
        else{
            this.filters._filters.className = 'main_filter';
            Consts.todoList.className = 'main_todoList';
            Consts.counterHTML.innerHTML = "Todos left: " + this.countTodos();
    
            this.todos.forEach((todo, i) => {
                todo.id = i;
                displayTodoStr += `
                    <li>
                        <input type="checkbox" class="todoList__checkbox" id="todo_${i}" ${todo.complete ? 'checked' : ''}>
                        <div class="todoList__todoText" id="todotxt_${i}">${todo.message}</div>
                        <button onClick="deleteTodo(${todo.id})" class="todoList__deleteBtn button">X</button>
                    </li>
                `;
                Consts.todoList.innerHTML = displayTodoStr;
            })
            this.filters.whatFilter();
        }
    }

    addNewTodo() {
        let newTodo = {
            id: -1,
            message: Consts.newTodoMessage.value,
            complete: false,
        }
        if (Consts.newTodoMessage.value.trim()){
            this.todos.push(newTodo);
            Consts.newTodoMessage.value = '';
            Consts.showAllBtn.className = 'filter__all button current_filter';
            Consts.showActiveBtn.className = 'filter__active button';
            Consts.showCompletedBtn.className = 'filter__completed button';
            this.updateLocal();
        }
        else Consts.newTodoMessage.value = '';
        this.displayTodos();
    }

    todoCompleteChanges(e) {
        let id = e.target.getAttribute('id');
        this.todos.forEach((todo) => {
            if (`todo_${todo.id}` === id){
                todo.complete = !todo.complete;
                this.updateLocal();
                this.displayTodos();
            }
        })
    };

    completeAll() {
        if (this.todos.some((todo) => !todo.complete)){
            this.todos.forEach((todo) => {
                todo.complete = true;
                this.updateLocal();
            })
        }
        else {
            this.todos.forEach((todo) => {
                todo.complete = false;
                this.updateLocal();
            })
        }
        this.displayTodos();
    }
    
    deleteTodo(id) {
        this.todos = this.todos.filter((todo) => todo.id !== id);
        this.updateLocal();
        this.displayTodos();
    }
    
    deleteCompleted() {
        this.todos.forEach((todo) => {
            if (todo.complete){
                this.deleteTodo(todo.id);
            }
        })
        this.displayTodos();
    }
    
    todoTextChange(e) {
        let elem = e.target;
        let id = elem.getAttribute('id');
        this.todos.forEach((todo) => {
            if (`todotxt_${todo.id}` === id){
                elem.innerHTML = `<input type="text" class="todotxt_edit" value="${todo.message}" />`
                let input = document.querySelector(".todotxt_edit")
                input.focus();
                input.selectionStart = input.value.length;
                elem.addEventListener("keypress", (e) => {
                    if (e.key === "Enter"){
                        if (document.querySelector('.todotxt_edit').value){
                            todo.message = elem.firstChild.value;
                            this.updateLocal();
                            this.displayTodos();
                        }
                        else{
                            this.deleteTodo(todo.id);
                        }
                    }
                })
                elem.addEventListener("focusout", (e) => {
                    if (document.querySelector('.todotxt_edit').value){
                        todo.message = elem.firstChild.value;
                        this.updateLocal();
                        this.displayTodos();
                    }
                    else{
                        this.deleteTodo(todo.id);
                    }
                })
            }
        })
    }


}