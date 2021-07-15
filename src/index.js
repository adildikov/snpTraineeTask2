import Todo from "./Todo.js"

//const toDoList = new TodoList(lclStrg);

// let message = "abc";
// let taskTemplateClass = '.task__template';
// let array = [];
// const deleteFromTDL = () => {
//     array.pop();
// }

// const todoList = new TodoList().getTodoList();
// const input = new Input((msg) => todoList.addNewTask(msg)).getInput();
// todoList.addNewTask(message);

//let lclStrg = localStorage.getItem('todos') ? localStorage.getItem('todos') : [];

const todo = new Todo().getTodo();


// Consts.newTodoMessage.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter'){
//         toDoList.addNewTodo();
//     }
// });

// Consts.showAllBtn.addEventListener('click', () => { 
//     toDoList.filters.showAll(toDoList.todos);
//     toDoList.displayTodos();
// });
// Consts.showActiveBtn.addEventListener('click', () => { 
//     toDoList.filters.showActive(toDoList.todos);
//     toDoList.displayTodos();
// });
// Consts.showCompletedBtn.addEventListener('click', () => { 
//     toDoList.filters.showCompleted(toDoList.todos);
//     toDoList.displayTodos();
// });
// Consts.completeAllBtn.addEventListener('click', () => { 
//     toDoList.completeAll();
//     toDoList.displayTodos();
// });
// Consts.deleteCompletedBtn.addEventListener('click', () => { 
//     toDoList.deleteCompleted();
//     toDoList.displayTodos();
// });

// Consts.addBtn.addEventListener('click', () => toDoList.addNewTodo());

// Consts.todoList.addEventListener('change', (e) => toDoList.todoCompleteChanges(e));

// Consts.todoList.addEventListener('click', (e) => toDoList.deleteTodo(e));

// Consts.todoList.addEventListener('dblclick',(e) => toDoList.todoTextChange(e));