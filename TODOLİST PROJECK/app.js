// işlem yapılacak tüm elementleri çağırıyoruz
const firstCardBody=document.querySelectorAll(".card-body")[0]
const form=document.querySelector("#todo-form");
const todoInput=document.querySelector("#todo");
const secondCardBody=document.querySelectorAll(".card-body")[1]
const todoList=document.querySelector(".list-group");//ul listesi çağrılır.
const filter=document.querySelector("#filter");
const clearButton=document.querySelector("#clear-todos");


//**************************************************************************
//SAYFADA ÇALIŞACAK FONKSİYONLAR YAZILIR.

eventListeners();

function eventListeners(){
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI)
    secondCardBody.addEventListener("click",deleteTodo)
    filter.addEventListener("keyup",filtertodos);
    clearButton.addEventListener("click",clearAllTodos);
}
//**************************************************************************

function clearAllTodos(e){

    if(confirm("tüm todoları silmek istediğinizden emin misiniz...")){

        while(todoList.firstElementChild!=null)
        {
            todoList.removeChild(todoList.firstElementChild);
        }
        localStorage.removeItem("todos");
    }
}


//**************************************************************************
// ARAMA YAPILMAK İSTENDİĞİNDE.
function filtertodos(e){
const filtervalue=e.target.value.toLowerCase();
const listItems=document.querySelectorAll(".list-group-item")

listItems.forEach(function(listItem){
const text=listItem.textContent.toLowerCase();
if(text.indexOf(filtervalue)===-1)
{
    listItem.setAttribute("style","display:none !important")
}
else
{
    listItem.setAttribute("style","dislay:block")
}


});


}

//**************************************************************************

//**************************************************************************
// ARAYÜZE KALICI EKLEME
function loadAllTodosToUI(){
    let todos=getTodoFromStorage();

    todos.forEach(function(todo){
        addTodoToUI(todo);

    });   

}
//*****************************************************************************

//*****************************************************************************
//ARAYÜZDEN TODO'LARI SİLME

function deleteTodo(e){
    if(e.target.className==="fa fa-remove")
    {
        e.target.parentElement.parentElement.remove();
        deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
        showAlert("warning","Todo başarıyla silindi...");
    }

}

//*****************************************************************************


//*****************************************************************************
//LOCA STORAGE DEN VERİ SİLME

//******************************************************************************
function deleteTodoFromStorage(deleteTodo){
        let todos=getTodoFromStorage();

        todos.forEach(function(todo,index){

            if(todo===deleteTodo)
            {
                todos.splice(index,1);
            }           
        })
localStorage.setItem("todos",JSON.stringify(todos));
}



//****************************************************************
//LOCASTORAGE DİZİ ŞEKLİNDE BİLGİ YÜKLEME
function getTodoFromStorage(){//storageden todoları alma
    let todos;
    if(localStorage.getItem("todos")===null)
    {
        todos=[];
    }
    else
    {         //arraye çevirme
        todos=JSON.parse(localStorage.getItem("todos"));
    }
    return todos;

}
function addTodoTostorage(newTodo){
   let todos=getTodoFromStorage();
   todos.push(newTodo);
   localStorage.setItem("todos",JSON.stringify(todos))
}
//******************************************************************


//********************************************************************
// BİLGİ MESAJI VERME
function showAlert(type,message){
    const alert=document.createElement("div");
    alert.className=`alert alert-${type}`;
    alert.textContent=message;
    firstCardBody.appendChild(alert);

    setTimeout(function(){
        alert.remove();
    },1000);
}
//*********************************************************************

//*********************************************************************
// TODO OLUŞTURUP ARAYÜZE YAZDIRMA

function addTodo(e){
    const newTodo=todoInput.value;
    
    if(newTodo==="")
    {
        showAlert("danger","lütfen bir todo giriniz...")
    }
    else{
        addTodoToUI(newTodo);//arayüze yazdırma.
        addTodoTostorage(newTodo);
        showAlert("info","Todo başarıyla kaydedilmiştir...")
    }
    
    e.preventDefault();
}

function addTodoToUI(newTodo){
    //list item oluşturma
    const listItem=document.createElement("li");
    listItem.className="list-group-item d-flex justify-content-between"
    //link oluşturma
    const link=document.createElement("a");
    link.href="#";
    link.className="delete-item";
    link.innerHTML="<i class = 'fa fa-remove'></i>"

    

    //text node ekleme
    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    //toda list'ı list ıtemı ekleme
    todoList.appendChild(listItem);

    todoInput.value="";

    console.log(listItem);
}
//**************************************************************************