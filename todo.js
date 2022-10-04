const inputBox = document.getElementById("inputbox"); // GETTING THE VALUE FROM FROM THE USER MBY ID

const addBtn = document.getElementById("btn");
const taskContainer = document.getElementById("taskcontainer"); //ROOT DIV 

inputBox.focus();// focusing the input box even after refresh 

// / creating an ARRAY
const taskArr = [];

//finction for capitalletter
function cpaLetter() {
  const inputBox = document.getElementById("inputbox");
  inputBox.value = inputBox.value.toUpperCase();
}

// USED FOR ENTER KEY IN KEY BOARD
function Handlenter(e) {
  if (e.keycode === 13)
  {
    task();
  }
}
// !ADDING STYLES method 1
// function addStyles(newElement){
// newElement.style.border= "5px solid  green";
// newElement.style.width= "50%";
// newElement.style.padding= "10px";
// newElement.style.margin= "10px";
// }

// FUNCTION TO PERFORM TO DO LIST

function handelTaskClick() {
  // this.style.borderColor="red";
  // this.style.textDecoration="line-through";
  // this.style.opacity="0.2";

  this.classList.toggle("completed");
  // const taskValue = this.innerText; 
  const taskId = this.id.toString();
  

  for (let i = 0; i < taskArr.length; i++) {
    const taskObj = taskArr[i];
    if (taskObj.id.toString()  === taskId) {
      taskObj.isCompleted = !taskObj.isCompleted;
    }
  }

  setTask();
}

function handelRemove() { 

    // const taskValue = this.innerText; 

    const taskId = this.id.toString();

    for (let i = 0; i < taskArr.length; i++) {
        const taskObj = taskArr[i];

        if (taskObj.id.toString() === taskId) {
         taskArr.splice(i,1);
        }
      } 
      setTask();
  this.remove();
}

function setTask() {
  localStorage.setItem("task", JSON.stringify(taskArr));
}

function getTask() {
  let tasks = localStorage.getItem("task");
  if (!tasks) {
    return;
  }
  tasks = JSON.parse(tasks);
  for (i in tasks) {
    const taskObj =tasks[i];
    createTask( taskObj.value, taskObj.isCompleted, taskObj.id);

    taskArr.push(tasks[i]);
  }
}
getTask();

function createTask(userInput, isCompleted, taskId) 
{
  const newElement = document.createElement("div");
  newElement.innerText = userInput;

newElement.setAttribute("id",taskId);
  // !addStyles(newElement);
  // *ADDING STYLES method 2

  if (isCompleted) {
    newElement.setAttribute("class", "tstyle completed");
  } else {
    newElement.setAttribute("class", "tstyle ");
  }

  newElement.addEventListener("click", handelTaskClick);
  newElement.addEventListener("dblclick", handelRemove);
  taskContainer.append(newElement);
}




function task() {
  const userInput = inputBox.value;
  if (userInput.length === 0) return alert("Please Enter Some Task");

  const inputLength = userInput.length;
  console.log(inputLength);
  let count = 0;

  for (let i = 0; i < inputLength; i++) {
    if (userInput[i] === " ") {
      count++;
    }
  }

  console.log(count);

  if (inputLength === count) {
    return alert("Please dont leave Empty space");
  } 

  let taskId=Math.random().toString();

  let taskObj = {};
  taskObj.value = userInput;
  taskObj.isCompleted = false;
  taskObj.id = taskId;
  // adding user input values into array
  taskArr.push(taskObj);
  setTask();

  createTask(userInput, false,taskId);
  inputBox.value="";
  inputBox.focus();
}

addBtn.addEventListener("click", task);
addBtn.addEventListener("keyup", Handlenter);
inputBox.addEventListener("keyup", cpaLetter);

// # web storage

//local storage
//cookies
//session storage

// sessionStorage.setItem("name","Krithick");
// sessionStorage.setItem("mobno","7094306859");

// const fname=sessionStorage.getItem("name");
// console.log(fname);

// localStorage.setItem("age","25");
// localStorage.removeItem("age");
// const expire=new Date(2022 ,9 , 20).toUTCString();
// document.cookie="roll=25 " + expire;
