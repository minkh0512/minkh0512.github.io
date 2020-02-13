const todoForm = document.querySelector('.form__todo'),
    todoInput = todoForm.querySelector('.input__todo'),
    todoInputButton = todoForm.querySelector('.button__submit'),
    todoListWrap = todoForm.querySelector('.list__todo');

const TODO_LIST = 'todoList';
let todoList = [];

function saveTodo(){
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
}
function paintTodo(todoText){
    const todoObject = {
        'id' : todoList.length + 1,
        'text' : todoText,
    }
    todoListWrap.insertAdjacentHTML(
        'beforeend',
        `<li class="list-item" id="list-item${todoObject.id}">
            <div class="box__checkbox">
                <input type="checkbox" id="todo${todoObject.id}" class="input__text" />
                <label for="todo${todoObject.id}" class="label"></label>
            </div>
            <span class="text__todo" contenteditable="false">${todoText}</span>
            <div class="box__button">
                <button type="button" class="button__modify"><i class="fa fa-edit"></i><span class="for-a11y">수정</span></button>
                <button type="button" class="button__complete"><i class="fa fa-check-circle"></i><span class="for-a11y">수정 완료</span></button>
                <button type="button" class="button__cancel"><i class="fa fa-times-circle"></i><span class="for-a11y">수정 취소</span></button>
                <button type="button" class="button__delete"><i class="fa fa-trash"></i><span class="for-a11y">삭제</span></button>
            </div>
        </li>`,
    );
    document.querySelector(`#list-item${todoObject.id} .button__modify`).addEventListener('click', modifyTodo);
    document.querySelector(`#list-item${todoObject.id} .button__complete`).addEventListener('click', modifyTodoComplete);
    document.querySelector(`#list-item${todoObject.id} .button__cancel`).addEventListener('click', modifyTodoCancel);
    document.querySelector(`#list-item${todoObject.id} .button__delete`).addEventListener('click', deleteTodo);
    todoList.push(todoObject);
    todoInput.value = '';
    saveTodo();
}
function loadTodoList(){
    const todoList = localStorage.getItem(TODO_LIST);
    if(todoList !== null){
        const parsedTodoList = JSON.parse(todoList);
        parsedTodoList.forEach(function(todo){
            paintTodo(todo.text);
        });
    }
}
function modifyTodo(){
    const selectList = this.parentNode.parentNode;
    const dotoText = selectList.querySelector('.text__todo');
    const buttonBox = selectList.querySelector('.box__button');
    dotoText.setAttribute('contenteditable','true');
    const selection = window.getSelection();
    selection.selectAllChildren(dotoText);
    selection.collapseToEnd();
    buttonBox.classList.add('box__button--modify');
    dotoText.addEventListener('blur', e => {
        dotoText.setAttribute('contenteditable','false');
        buttonBox.classList.remove('box__button--modify');
    });
}
function modifyTodoComplete(){

}
function modifyTodoCancel(){
    const selectList = this.parentNode.parentNode;
    const dotoText = selectList.querySelector('.text__todo');
    const buttonBox = selectList.querySelector('.box__button');
    dotoText.setAttribute('contenteditable','false');
    buttonBox.classList.remove('box__button--modify');
}
function deleteTodo(){
    const selectList = this.parentNode.parentNode;
    const selectListIndex = Number(selectList.id.split('list-item')[1]);
    selectList.remove();
    localStorage.removeItem(todoList[selectListIndex]);
    const newTodoList = todoList.filter(function(todo){
        return todo.id !== selectListIndex
    });
    todoList = newTodoList;
    saveTodo();
}
function handleSubmit(event){
    event.preventDefault();
    const inputValue = todoInput.value;
    if(inputValue == ''){return}
    paintTodo(inputValue);
}

function init(){
    loadTodoList();
    todoForm.addEventListener('submit', handleSubmit);
    todoInputButton.addEventListener('click', handleSubmit);
}

init();