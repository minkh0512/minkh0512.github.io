const todoForm = document.querySelector('.form__todo'),
    todoInput = todoForm.querySelector('.input__todo'),
    todoInputButton = todoForm.querySelector('.button__submit'),
    todoListWrap = todoForm.querySelector('.list__todo');

const TODO_LIST = 'todoList';
let todoList = [];

function saveTodo(){
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
}
function checkClearTimer(){
    localStorage.setItem('clearTodo', new Date().getDate());
}
function paintTodo(todoText, totoDone){
    const todoObject = {
        'id' : todoList.length + 1,
        'text' : todoText,
        'done' : totoDone ? true : false,
    }
    const listIndex = todoObject.id;
    let listDone = '';
    let listCheck = '';
    if(todoObject.done){
        listDone = 'list-item--done',
        listCheck = 'checked'
    }else{
        listDone = ''
        listCheck = ''
    };
    todoListWrap.insertAdjacentHTML(
        'beforeend',
        `<li class="list-item ${listDone}" id="list-item${listIndex}">
            <div class="box__checkbox">
                <input type="checkbox" id="todo${listIndex}" class="input__text" ${listCheck} />
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
    const prevDate = Number(localStorage.getItem('clearTodo'));
    checkClearTimer();
    const currentDate = new Date().getDate();
    const todoList = localStorage.getItem(TODO_LIST);
    if(todoList !== null){
        let parsedTodoList = JSON.parse(todoList);
        let currenttodoList = [];
        if(prevDate !== currentDate){
            parsedTodoList.forEach(function(v){
                if(!v.done){
                    currenttodoList.push(v);
                }
            })
            parsedTodoList = currenttodoList;
        }
        parsedTodoList.forEach(function(todo){
            paintTodo(todo.text,todo.done);
        });
    }
}
const inputChangekFunc = listIndex => () => inputChange(listIndex);
function inputChange(listIndex){
    const prevTodoList = localStorage.getItem(TODO_LIST);
    const parsedTodoList = JSON.parse(prevTodoList);
    const selectList = document.querySelector(`#list-item${listIndex}`);
    const selectListIndex = Number(selectList.id.split('list-item')[1]) -1;
    const selectInput = selectList.querySelector(`#todo${listIndex}`);
    if(selectInput.checked){
        selectList.classList.add('list-item--done');
        parsedTodoList[selectListIndex].done = true;
    }else{
        selectList.classList.remove('list-item--done');
        parsedTodoList[selectListIndex].done = false;
    }
    todoList = parsedTodoList;
    saveTodo();
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
function clearTodo(){
    
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