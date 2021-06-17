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
                <label for="todo_${i}">${todo.message}</label>
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

const ulChanges = (e) => {
    let id = e.target.getAttribute('id');
    todos.forEach((todo) => {
        if (`todo_${todo.id}` === id){
            todo.complete = !todo.complete;
            updateLocal();
        }
    })
};

todoList.addEventListener('change', ulChanges);

const deleteTodo = (id) => {
    todos.splice(id, 1);
    updateLocal();
    displayTodos();
}