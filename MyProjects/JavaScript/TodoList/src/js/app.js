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
            <span contenteditable="false">${todoText}</span>
            <div class="box__button">
                <button type="button" class="button__modify"><i class="fa fa-edit"></i><span class="for-a11y">수정</span></button>
                <button type="button" class="button__delete"><i class="fa fa-trash"></i><span class="for-a11y">삭제</span></button>
            </div>
        </li>`,
    );
    document.querySelector(`#list-item${todoObject.id} .button__modify`).addEventListener('click', modifyTodo);
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
function deleteTodo(event){
    const selectList = this.parentNode.parentNode;
    const selectListIndex = Number(selectList.id.split('list-item')[1]) - 1;
    selectList.remove();
    localStorage.removeItem(todoList[selectListIndex]);
    console.log(todoList);
}
function modifyTodo(event){
    console.log('modify')
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