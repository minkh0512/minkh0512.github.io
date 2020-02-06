const todoForm = document.querySelector('.form__todo'),
    todoInput = todoForm.querySelector('.input__todo'),
    todoInputButton = todoForm.querySelector('.button__submit'),
    todoListWrap = todoForm.querySelector('.list__todo');

function deleteTodo(event){
    console.log(event)
}
function paintTodoList(todoText){
    todoListWrap.insertAdjacentHTML(
        'beforeend',
        `<li class="list-item">
            <input type="checkbox" id="" class="input__text" />
            <label for="" class="label">${todoText}</label>
            <div class="box__button">
                <button type="button" class="button__modify" onclick="deleteTodo(event)"><i class="fa fa-edit"></i><span class="for-a11y">수정</span></button>
                <button type="button" class="button__delete"><i class="fa fa-trash"></i><span class="for-a11y">삭제</span></button>
            </div>
        </li>`,
    );
    todoInput.value = '';
    todoInput.focus();
}

function handleSubmit(event){
    event.preventDefault();
    const inputValue = todoInput.value;
    paintTodoList(inputValue);
}

function init(){
    todoForm.addEventListener('submit', handleSubmit);
    todoInputButton.addEventListener('click', handleSubmit);
}

init();