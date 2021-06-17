let newTodoMessage = document.querySelector('.newTodo');
let addBtn = document.querySelector('.addTodo');
let todoList = document.querySelector('.todoList')
let todos = [];

let lclStrg = localStorage.getItem('todos');

const updateLocal = () => {
    localStorage.setItem('todos', JSON.stringify(todos));
}

const displayTodos = () => {
    let displayTodoStr = '';
    if (todos.length === 0) {
        todoList.innerHTML = '';
    }
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
        }
    })
}

todoList.addEventListener('dblclick', todoTextChange);