let form= document.querySelector('#task_form');
let taskList= document.querySelector('ul');
let textArea=document.querySelector('#texts');
let clearButton= document.querySelector('#clear_task');
let filter= document.querySelector('#task_filter');
let taskInput= document.querySelector('#new_task');

form.addEventListener('submit',addTask);
taskList.addEventListener('click', removeTask);
clearButton.addEventListener('click', removeAll);
filter.addEventListener('keyup',filterTask);
document.addEventListener('DOMContentLoaded',getTasks);

function addTask(e){
    if(taskInput.value === ''){
        alert("Fill up the field first");
    }
    else{
        let li=document.createElement('li');
        let heading=document.createElement('h3');
        heading.appendChild(document.createTextNode(taskInput.value +" "));
        li.appendChild(heading);
        let a=document.createElement('a');
        let p=document.createElement('p');
        p.appendChild(document.createTextNode(textArea.value +" "));
        a.setAttribute('href','#');
        a.setAttribute('style','text-decoration:none');
        a.innerHTML='x';
        li.appendChild(a);
        li.appendChild(p);
        taskList.appendChild(li);
        storeTaskInLocalStorage(taskInput.value, textArea.value);
        taskInput.value = '';
        textArea.value = '';
    }
    e.preventDefault();
}

function removeTask(e){
    if(e.target.hasAttribute('href')){
        if(confirm("Are you sure to remove this?")){
            let parent=e.target.parentElement;
            parent.remove();
            
            removeFromLS(parent);
    }
}
}

function removeAll(){
    taskList.innerHTML="";
    localStorage.clear();
}

function filterTask(e){
    let text=e.target.value.toLowerCase();
    document.querySelectorAll('h3').forEach(task=>{
        let item=task.firstChild.textContent;
        let parent=task.parentElement;
        if(item.toLowerCase().indexOf(text)!=-1){
            parent.style.display="block";
        }
        else{
            parent.style.display="none";
        }
    });
    
}

function storeTaskInLocalStorage(task, text){
    let tasks=[];
    let obj = {};
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    obj["task"] = task;
    obj["text"] = text;
    tasks.push(obj);
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function getTasks(){
    let tasks;
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    for(let task in tasks){
        let li=document.createElement('li');
        let heading=document.createElement('h3');
        heading.appendChild(document.createTextNode(tasks[task].task +" "));
        li.appendChild(heading);
        let a=document.createElement('a');
        let p=document.createElement('p');
        p.appendChild(document.createTextNode(tasks[task].text + " "));
        a.setAttribute('href','#');
        a.setAttribute('style','text-decoration:none');
        a.innerHTML='x';
        li.appendChild(a);
        li.appendChild(p);
        taskList.appendChild(li);
    }
}

function removeFromLS(tk){
    let tasks=[];
    if(localStorage.getItem('tasks')===null){
        tasks=[];
    }
    else{
        tasks=JSON.parse(localStorage.getItem('tasks'));
    }
    let str=tk.firstChild.textContent.toLowerCase().split(' ').join('');
    //let x=str.nextSibling;
    //x.previousSibling.lastChild.remove();
    //let trial=x.previousSibling;
    //let tsk=x.previousSibling.textContent.trim().toLowerCase().split(' ').join('');
    tasks.forEach((task,index)=>{
        let y=task.task.toLowerCase().split(' ').join('');
        console.log(`${str} === ${y}`);
        if(str === y){
            console.log("Found");
            tasks.splice(index, 1);

        }
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

