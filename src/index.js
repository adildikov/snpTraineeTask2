import TodoList from "./TodoList.js";
import * as Consts from "./constants.js"

let lclStrg = localStorage.getItem('todos');
const toDoList = new TodoList(lclStrg);

Consts.newTodoMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter'){
        toDoList.addNewTodo();
    }
});

Consts.showAllBtn.addEventListener('click', toDoList.filters.showAll());
Consts.showActiveBtn.addEventListener('click', toDoList.filters.showActive());
Consts.showCompletedBtn.addEventListener('click', toDoList.filters.showCompleted());
Consts.completeAllBtn.addEventListener('click', toDoList.completeAll());
Consts.deleteCompletedBtn.addEventListener('click', toDoList.deleteCompleted());

Consts.addBtn.addEventListener('click', () => toDoList.addNewTodo());

Consts.todoList.addEventListener('change', (e) => toDoList.todoCompleteChanges(e));

Consts.todoList.addEventListener('dblclick',(e) => toDoList.todoTextChange(e));