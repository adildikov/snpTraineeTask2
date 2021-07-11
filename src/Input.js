
export default class Input{
    constructor(addTask) {
        this.addTask = addTask;
    }

    _setEventListeners() {
        this.addBtn.addEventListener('click', () => {
            this.addTask(this.newTodoMessage.value);
            this.newTodoMessage.value = '';
        });
        this.newTodoMessage.addEventListener('keypress', (e) => {
            if (e.key === 'Enter'){
                this.addTask(this.newTodoMessage.value);
                this.newTodoMessage.value = '';
            }
        });
    }

    getInput() {
        this.newTodoMessage = document.querySelector('.addTodoArea__newTodo');
        this.addBtn = document.querySelector('.addTodoArea__addTodo');
        this._setEventListeners();
        return(this);
    }
}