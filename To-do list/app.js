const FormSubmit=document.querySelector('form');
const valueSearch=document.querySelector('#valueSearch');
const task=document.querySelector('.task');
const completeSymbol=document.querySelector('.content i')
let id=1;

let taskArray=[];
let taskCompleted=[];



 

FormSubmit.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(valueSearch.value!=""){
        taskArray.push({
            "id": id,
             value:valueSearch.value
        });
        displayArray();
    }
    id++;
    valueSearch.value='';
})

console.log(taskArray);

const displayArray=()=>{
    task.innerHTML='';
    if(taskArray.length>0){
        taskArray.forEach((tsk)=>{
            let content=document.createElement('div');
            content.classList.add('content'); 
            content.dataset.id=tsk.id;
        
            content.innerHTML=`
                <h3 class="">${tsk.value}</h3>
                <i class="fa-regular fa-circle-check green"></i>
            `;
            task.append(content);
        });
    }
    if(taskCompleted.length>0){
        taskCompleted.forEach((tsk)=>{
            let content=document.createElement('div');
            content.classList.add('content'); 
            content.dataset.id=tsk.id;
        
            content.innerHTML=`
                <h3 class="underLine">${tsk.value}</h3>
                <i class="${tsk.iClass}"></i>
            `;
            task.append(content);
        });
    }

}

const completedArray=(idIndex)=>{
    let index=taskArray.findIndex((value)=>value.id==idIndex);
    let id=taskArray[index].id;
    let valueTask=taskArray[index].value;
    taskCompleted.push({
        "id":id,
        value:valueTask,
        iClass:"fa-regular fa-circle-xmark red"
    })
    taskArray.splice(index,1);
displayArray();
}

task.addEventListener('click',(event)=>{
    let targetElement=event.target;
    if(targetElement.classList.contains('green')){
        completedArray(targetElement.parentElement.dataset.id);
    }
})