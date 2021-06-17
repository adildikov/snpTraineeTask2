let newTodoMessage = document.querySelector('.newTodo');
let addBtn = document.querySelector('.addTodo');
let todoList = document.querySelector('.todoList')
let todos = [];

let lclStrg = localStorage.getItem('todos');

let filters = document.querySelector('.filter');
let counterHTML = document.querySelector('.counter');

const updateLocal = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const countTodos = () => {
    let cnt = 0;
    todos.forEach((todo) => {
        if (!todo.complete) cnt += 1;
    })
    return cnt;
}

const displayTodos = () => {
    let displayTodoStr = '';
    let displayFiltersStr = '';
    if (todos.length === 0) {
        todoList.innerHTML = '';
        filters.innerHTML = '';
    }
    else{
        displayFiltersStr += `
            <div class="counter">${countTodos()}</div>
            <button onClick="showAll()" class="filter_all">All</button>
            <button onClick="showActive()" class="filter_active">Active</button>
            <button onClick="showCompleted()" class="filter_completed">Completed</button>
        `;
        filters.innerHTML = displayFiltersStr;

        todos.forEach((todo, i) => {
            todo.id = i;
            displayTodoStr += `
                <li>
                    <input type="checkbox" id="todo_${i}" ${todo.complete ? 'checked' : ''}>
                    <div class="todoText" id="todotxt_${i}">${todo.message}</div>
                    <button onClick="deleteTodo(${todo.id})" class="deleteBtn">X</button>
                </li>
            `;
            todoList.innerHTML = displayTodoStr;
        })
    }
}

if(lclStrg){
    todos = JSON.parse(lclStrg);
    displayTodos();
}

const addNewTodo = () => {
        let newTodo = {
            id: -1,
            message: newTodoMessage.value,
            complete: false,
        }
        todos.push(newTodo);
        newTodoMessage.value = '';
        updateLocal();
        displayTodos();
}

newTodoMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        addNewTodo();
    }
});
addBtn.addEventListener('click', addNewTodo);

const todoCompleteChanges = (e) => {
    let id = e.target.getAttribute('id');
    todos.forEach((todo) => {
        if (`todo_${todo.id}` === id){
            todo.complete = !todo.complete;
            updateLocal();
            displayTodos();
        }
    })
};

todoList.addEventListener('change', todoCompleteChanges);

const deleteTodo = (id) => {
    todos.splice(id, 1);
    updateLocal();
    displayTodos();
}

const todoTextChange = (e) => {
    let elem = e.target;
    let id = elem.getAttribute('id');
    todos.forEach((todo) => {
        if (`todotxt_${todo.id}` === id){
            elem.innerHTML = `<input type="text" class="todotxt_edit" value="${todo.message}" />`
            document.querySelector(".todotxt_edit").focus();
            elem.addEventListener("keypress", (e) => {
                if (e.key === "Enter"){
                    if (document.querySelector('.todotxt_edit').value){
                        todo.message = elem.firstChild.value;
                        updateLocal();
                        displayTodos();
                    }
                    else{
                        deleteTodo(todo.id);
                    }
                }
            })
            elem.addEventListener("focusout", (e) => {
                if (document.querySelector('.todotxt_edit').value){
                    todo.message = elem.firstChild.value;
                    updateLocal();
                    displayTodos();
                }
                else{
                    deleteTodo(todo.id);
                }
            })
        }
    })
}

todoList.addEventListener('dblclick', todoTextChange);

const showAll = () => {
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        parent.className = '';
    })
}

const showActive = () => {
    showAll();
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        if (todo.complete && !parent.classList.contains('hidden')){
            parent.className += 'hidden';
        }
    })
}

const showCompleted = () => {
    showAll();
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        if (!todo.complete && !parent.classList.contains('hidden')){
            parent.className += 'hidden';
        }
    })
}