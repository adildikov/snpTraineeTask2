import TodoList from "./TodoList.js";
import * as Consts from "./constants.js"

let lclStrg = localStorage.getItem('todos');
const toDoList = new TodoList(lclStrg);

Consts.newTodoMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        toDoList.addNewTodo();
    }
});

Consts.showAllBtn.addEventListener('click', () => { 
    toDoList.filters.showAll();
    toDoList.displayTodos();
});
Consts.showActiveBtn.addEventListener('click', () => { 
    toDoList.filters.showActive();
    toDoList.displayTodos();
});
Consts.showCompletedBtn.addEventListener('click', () => { 
    toDoList.filters.showCompleted();
    toDoList.displayTodos();
});
Consts.completeAllBtn.addEventListener('click', () => { 
    toDoList.completeAll();
    toDoList.displayTodos();
});
Consts.deleteCompletedBtn.addEventListener('click', () => { 
    toDoList.deleteCompleted();
    toDoList.displayTodos();
});

Consts.addBtn.addEventListener('click', () => toDoList.addNewTodo());

Consts.todoList.addEventListener('change', (e) => toDoList.todoCompleteChanges(e));

Consts.todoList.addEventListener('dblclick',(e) => toDoList.todoTextChange(e));