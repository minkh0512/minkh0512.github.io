const todoForm = document.querySelector('.form__todo'),
    todoInput = todoForm.querySelector('.input__todo'),
    todoInputButton = todoForm.querySelector('.button__submit'),
    todoListWrap = todoForm.querySelector('.list__todo');
    


function paintTodoList(todoText){
    return todoListWrap.insertAdjacentHTML(
        'beforeend',
        `<div>${todoText}</div>`,
    );
}

function handleSubmit(event){
    event.preventDefault();
    paintTodoList('ttt');
    console.log('submit');
}

function init(){
    console.log('init');
    todoForm.addEventListener('submit', handleSubmit);
    todoInputButton.addEventListener('click', handleSubmit);
}

init();