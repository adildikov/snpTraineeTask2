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
    todos.forEach((todo, i) => {
        todo.id = i;
        displayTodoStr += `
            <li>
                <input type="checkbox" id="todo_${i}" ${todo.complete ? 'checked' : ''}>
                <label for="todo_${i}">${todo.message}</label>
                <button class="deleteBtn">X</button>
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
        displayTodos();
        updateLocal();
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