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
    const listIndex = todoObject.id;
    todoListWrap.insertAdjacentHTML(
        'beforeend',
        `<li class="list-item" id="list-item${listIndex}">
            <div class="box__checkbox">
                <input type="checkbox" id="todo${listIndex}" class="input__text" />
                <label for="todo${listIndex}" class="label"></label>
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
    document.querySelector(`#todo${listIndex}`).addEventListener('change', inputChangekFunc(listIndex));
    document.querySelector(`#list-item${listIndex} .button__modify`).addEventListener('click', modifyTodoFunc(listIndex));
    document.querySelector(`#list-item${listIndex} .button__complete`).addEventListener('click', modifyTodoCompleteFunc(listIndex));
    document.querySelector(`#list-item${listIndex} .button__cancel`).addEventListener('click', modifyTodoCancelFunc(listIndex));
    document.querySelector(`#list-item${listIndex} .button__delete`).addEventListener('click', deleteTodoFunc(listIndex));
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
const inputChangekFunc = listIndex => () => inputChange(listIndex);
function inputChange(listIndex){
    const selectList = document.querySelector(`#list-item${listIndex}`);
    const selectInput = selectList.querySelector(`#todo${listIndex}`);
    selectInput.checked ? selectList.classList.add('list-item--done') : selectList.classList.remove('list-item--done');
}
const modifyTodoFunc = listIndex => () => modifyTodo(listIndex);
function modifyTodo(listIndex){
    const selectList = document.querySelector(`#list-item${listIndex}`);
    const dotoText = selectList.querySelector('.text__todo');
    const buttonBox = selectList.querySelector('.box__button');
    dotoText.setAttribute('contenteditable','true');
    const selection = window.getSelection();
    selection.selectAllChildren(dotoText);
    selection.collapseToEnd();
    buttonBox.classList.add('box__button--modify');
}
const modifyTodoCompleteFunc = listIndex => () => modifyTodoComplete(listIndex);
function modifyTodoComplete(listIndex){
    const prevTodoList = localStorage.getItem(TODO_LIST);
    const parsedTodoList = JSON.parse(prevTodoList);
    const selectList = document.querySelector(`#list-item${listIndex}`);
    const selectListIndex = Number(selectList.id.split('list-item')[1]) -1;
    const dotoText = selectList.querySelector('.text__todo');
    const buttonBox = selectList.querySelector('.box__button');
    dotoText.setAttribute('contenteditable','false');
    buttonBox.classList.remove('box__button--modify');
    parsedTodoList[selectListIndex].text = dotoText.textContent;
    todoList = parsedTodoList;
    saveTodo();
}
const modifyTodoCancelFunc = listIndex => () => modifyTodoCancel(listIndex);
function modifyTodoCancel(listIndex){
    const prevTodoList = localStorage.getItem(TODO_LIST);
    const parsedTodoList = JSON.parse(prevTodoList);
    const selectList = document.querySelector(`#list-item${listIndex}`);
    const selectListIndex = Number(selectList.id.split('list-item')[1]) -1;
    const dotoText = selectList.querySelector('.text__todo');
    const buttonBox = selectList.querySelector('.box__button');
    dotoText.setAttribute('contenteditable','false');
    buttonBox.classList.remove('box__button--modify');
    dotoText.textContent = parsedTodoList[selectListIndex].text;
}
const deleteTodoFunc = listIndex => () => deleteTodo(listIndex);
function deleteTodo(listIndex){
    const selectList = document.querySelector(`#list-item${listIndex}`);
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