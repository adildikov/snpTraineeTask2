let newTodoMessage = document.querySelector('.addTodoArea__newTodo');
let addBtn = document.querySelector('.addTodoArea__addTodo');
let todoList = document.querySelector('.main_todoList')
let todos = [];

let lclStrg = localStorage.getItem('todos');

let filters = document.querySelector('.main_filter');

let showAllBtn = document.querySelector('.filter__all');
let showActiveBtn = document.querySelector('.filter__active');
let showCompletedBtn = document.querySelector('.filter__completed');
let completeAllBtn = document.querySelector('.filter__completeAll');
let deleteCompletedBtn = document.querySelector('.filter__deleteCompleted');
let counterHTML = document.querySelector('.counter');

let crnFilter = '';

let whatFilter = () => {
    if (crnFilter === 'all') showAll();
    if (crnFilter === 'active') showActive();
    if (crnFilter === 'complete') showCompleted();
}

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
    if (todos.length === 0) {
        filters.className += ' hidden';
        todoList.className += ' hidden';
    }
    else{
        filters.className = 'main_filter';
        todoList.className = 'main_todoList';
        counterHTML.innerHTML = "Todos left: " + countTodos();

        todos.forEach((todo, i) => {
            todo.id = i;
            displayTodoStr += `
                <li>
                    <input type="checkbox" class="todoList__checkbox" id="todo_${i}" ${todo.complete ? 'checked' : ''}>
                    <div class="todoList__todoText" id="todotxt_${i}">${todo.message}</div>
                    <button onClick="deleteTodo(${todo.id})" class="todoList__deleteBtn button">X</button>
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
        if (newTodoMessage.value.trim()){
            todos.push(newTodo);
            newTodoMessage.value = '';
            showAllBtn.className = 'filter__all button current_filter';
            showActiveBtn.className = 'filter__active button';
            showCompletedBtn.className = 'filter__completed button';
            updateLocal();
        }
        else newTodoMessage.value = '';
        displayTodos();
        whatFilter();
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

const completeAll = () => {
    if (todos.some((todo) => !todo.complete)){
        todos.forEach((todo) => {
            todo.complete = true;
            updateLocal();
        })
    }
    else {
        todos.forEach((todo) => {
            todo.complete = false;
            updateLocal();
        })
    }
    displayTodos();
}

const deleteTodo = (id) => {
    todos = todos.filter((todo) => todo.id !== id);
    updateLocal();
    displayTodos();
    whatFilter();
}

const deleteCompleted = () =>{
    todos.forEach((todo) => {
        if (todo.complete){
            deleteTodo(todo.id);
        }
    })
    displayTodos();
}

const todoTextChange = (e) => {
    let elem = e.target;
    let id = elem.getAttribute('id');
    todos.forEach((todo) => {
        if (`todotxt_${todo.id}` === id){
            elem.innerHTML = `<input type="text" class="todotxt_edit" value="${todo.message}" />`
            let input = document.querySelector(".todotxt_edit")
            input.focus();
            input.selectionStart = input.value.length;
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
    crnFilter = "all";
    showAllBtn.className = 'filter__all button current_filter';
    showActiveBtn.className = 'filter__active button';
    showCompletedBtn.className = 'filter__completed button';
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        parent.className = '';
    })
}

const showActive = () => {
    showAll();
    crnFilter = "active";
    showAllBtn.className = 'filter__all button';
    showActiveBtn.className = 'filter__active button current_filter';
    showCompletedBtn.className = 'filter__completed button';
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        if (todo.complete && !parent.classList.contains('hidden')){
            parent.className += 'hidden';
        }
    })
}

const showCompleted = () => {
    showAll();
    crnFilter = "complete";
    showAllBtn.className = 'filter__all button';
    showActiveBtn.className = 'filter__active button';
    showCompletedBtn.className = 'filter__completed button current_filter';
    todos.forEach((todo) => {
        parent = document.getElementById(`todo_${todo.id}`).parentElement;
        if (!todo.complete && !parent.classList.contains('hidden')){
            parent.className += 'hidden';
        }
    })
}
