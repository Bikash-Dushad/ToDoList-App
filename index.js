const toDo = document.getElementById("inputToDo");
const addToDo = document.getElementById("addToDoBtn");
const toDoList = document.getElementById("todoList");

const completeAllBtn = document.getElementById("completeAllBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const taskLeft = document.getElementById('taskLeft');
const allBtn = document.getElementById("allBtn");
allBtn.addEventListener('click', showTask);

const completedBtn = document.getElementById("completedBtn");
completedBtn.addEventListener('click', showTask);

const uncompletedBtn = document.getElementById("uncompletedBtn");
uncompletedBtn.addEventListener('click', showTask);


//adding event listner to add all the list of task
addToDo.addEventListener('click', function(){
    const todoText = toDo.value;
    if(todoText !==""){
        const newToDo = document.createElement("li");  //creates li tag where all task will be displayed
        
        newToDo.innerHTML = `<input type="checkbox" class="checkbox">${todoText}`; // li tag contains checkbox with task
        toDoList.appendChild(newToDo);
        const deleteBtn = document.createElement('button'); // create button when a li tag is created to delete task individually
        deleteBtn.id = 'deleteIndividualTask';
        deleteBtn.innerText = 'x';
        deleteBtn.addEventListener('click', () => {
            toDoList.removeChild(newToDo);
            updateTask();
        });
        newToDo.appendChild(deleteBtn);
        toDoList.appendChild(newToDo);
        toDo.value = '';
        updateTask();

        const checkbox = newToDo.querySelector('.checkbox');
        checkbox.addEventListener('change', updateTask);  //updates the number of task to be done
    }
});


//check mark all the remaining checkboxs
completeAllBtn.addEventListener('click', function(){
    const allList = document.querySelectorAll('.checkbox');
    allList.forEach((chekbox)=>{
        chekbox.checked = true;
    });
    updateTask();
});


// clears all the task from the list
clearAllBtn.addEventListener('click', function(){
    const completedTask = document.querySelectorAll('.checkbox');
    completedTask.forEach((todo)=>{
        todo.parentElement.remove();
        updateTask();
    });
});

//deletes individual task from list 
const deleteButtons = document.querySelectorAll('#deleteIndividualTask');
deleteButtons.forEach(deleteButton => {
    deleteButton.addEventListener('click', function () {
        const todo = deleteButton.parentElement;
        toDoList.removeChild(todo);
        updateTask();
    });
});


//used to update number of task left to do
function updateTask(){
    const allList = document.querySelectorAll('.checkbox').length;
    const completedTask = document.querySelectorAll('.checkbox:checked').length;
    console.log(completedTask);
    console.log(allList)
    const leftTask = allList - completedTask;
    taskLeft.innerText = leftTask + " Task left";
}
// shows all, completed and uncompleted task from list
function showTask(event) {
    const filter = event.target.id;
    const todos = document.querySelectorAll('#todoList li');

    todos.forEach((todo) => {
        const checkbox = todo.querySelector('.checkbox');
        switch (filter) {
            case 'allBtn':
                todo.style.display = '';
                break;
            case 'completedBtn':
                todo.style.display = checkbox.checked ? '' : 'none';
                break;
            case 'uncompletedBtn':
                todo.style.display = checkbox.checked ? 'none' : '';
                break;
        }
    });
}


