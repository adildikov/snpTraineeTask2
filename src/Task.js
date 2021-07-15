

export default class Task{
    constructor(message, taskTemplateClass, deleteFromTDL, updateCounter) {
        this.message = message;
        this.taskTemplateClass = taskTemplateClass;
        this.deleteFromTDL = deleteFromTDL;
        this.updateCounter = updateCounter;
    }

    getState() {
        return this.checkBox.checked;
    }

    toggleActiveChange() {
        this.task.classList.toggle('hidden');
    }

    makeVisible() {
        this.task.classList.remove('hidden');
    }

    makeInvisible() {
        this.task.classList.add('hidden');
    }

    _showInput() {
        this.inputChange.classList.remove('hidden');
        this.text.classList.add('hidden')
    }

    _showText() {
        this.inputChange.classList.add('hidden');
        this.text.classList.remove('hidden')
    }

    _toggleComplete = () => {
        if (this.checkBox.checked){
            this.checkBox.checked = true;
        }
        else {
            this.checkBox.checked = false;
        }
        this.updateCounter();
    }

    makeComplete() {
        this.checkBox.checked = true;
        this.updateCounter();
    }

    makeIncomplete() {
        this.checkBox.checked = false;
        this.updateCounter();
    }

    _deleteTask = () => {
        this.deleteFromTDL(this);
        this.task.remove();
        this.updateCounter();
    }

    _textChange = () => {
        this._showInput();
        this.inputChange.focus();
        this.inputChange.selectionStart = this.text.textContent.length;
        this.inputChange.addEventListener("keypress", (e) => {
            if (e.key === "Enter"){
                this._showText();
                if (this.inputChange.value){
                    this.text.textContent = this.inputChange.value;
                }
                else{
                    this._deleteTask();
                }
            }
        })
        this.inputChange.addEventListener("focusout", () => {
            this._showText();
            if (this.inputChange.value){
                this.text.textContent = this.inputChange.value;
            }
            else{
                this._deleteTask();
            }
        })
    }

    _setEventListeners() {
        this.checkBox.addEventListener('click', this._toggleComplete);
        this.dltBtn.addEventListener("click", this._deleteTask);
        this.text.addEventListener('dblclick', this._textChange);
    }

    getMessage() {
        return this.text.textContent;
    }

    getTask() {
        this.taskTemplate = document.querySelector(this.taskTemplateClass).content;
        this.task = this.taskTemplate.querySelector('.task').cloneNode(true);
        this.checkBox = this.task.querySelector('.todoList__checkbox');
        this.text = this.task.querySelector('.todoList__todoText');
        this.dltBtn = this.task.querySelector('.todoList__deleteBtn');
        this.inputChange = this.task.querySelector('.todotxt_edit');
        this.inputChange.value = this.message;
        this.text.textContent = this.message;
        this.checkBox.checked = false;
        this._setEventListeners();
        return(this);
    }
}