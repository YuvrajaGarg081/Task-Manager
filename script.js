const input = document.getElementById('tname');
const addBtn = document.getElementById('addBtn');
const list = document.getElementById('task-list');

// Loading saved task from local storage
const saved = localStorage.getItem('task');
const tasks = saved ? JSON.parse(saved) : [];

const saveTasks = () =>{
    // Save current task to Local Storeage
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const createTask = (task, index)=>{
    const li = document.createElement('li');

    // checkbox to toggle completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = !!task.completed;
    checkbox.addEventListener = ('change', ()=>{
        task.completed = checkbox.checked;
        // Strick-Through when completed as visual task effect
        textSpan.style.textDecoration = task.completed ? 'line-through' : '';
        saveTasks();
    });

    const textSpan = document.createElement('span');
    textSpan.textContent = task.text;
    textSpan.style.margin = '0 8px';
    if(task.completed){
        textSpan.style.textDecoration = 'line-through';
    }
    // Event Listener -- Double-Click -- Edit task
    textSpan.addEventListener('dblclick', ()=>{
        const newText = prompt('Edit Task', task.text);
        if(newText !== null){
            task.text = newText.trim();
            taskSpan.textContent = task.text;
            saveTasks();
        }
    })

    // Delete Task Button
    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', ()=>{
        tasks.splice(index,1);
        render();
        saveTasks();
    })

    li.appendChild(checkbox);
    li.appendChild(textSpan);
    li.appendChild(delBtn);
    return li
    }

const render = () => {
    list.innerHTML = '';

    tasks.forEach((task, index) => {
        const data = createTask(task, index);
        list.appendChild(data);
    });
}

const addTask = () => {
    const text = input.value.trim();
    if(!text){
        return
    }

    // Push a new task object
    tasks.push({text, completed: false});
    input.value = '';
    render();
    saveTasks();
}

addBtn.addEventListener('click', addTask);
input.addEventListener('keydown', (e)=>{
    if(e.key == 'Enter'){
        addTask();
    }
})
render();