document.addEventListener("DOMContentLoaded" , () => {
  const todoInput = document.getElementById("todo-input")
  const todoButton = document.getElementById("add-task-btn")
  const todoList = document.getElementById("todo-list")

  let tasks = JSON.parse(localStorage.getItem("token")) || [];
  tasks.forEach((task) => {
    renderTask(task);
  })

  todoButton.addEventListener("click", () => {
   createTask();
  })

  document.addEventListener("keydown", (e) => {
    if(e.key.toLowerCase() === "enter") createTask();
  })

  function createTask(){
     const taskDetails = todoInput.value.trim();
     if(taskDetails === "") return;

    const newTask = {
      id : Date.now(),
      text : taskDetails,
      completed : false
    }

    tasks.push(newTask);
    saveTask();
    renderTask(newTask);

    todoInput.value = "";
  }

  function renderTask(task){
    const li = document.createElement("li");
    li.setAttribute("data-id",task.id);
    if(task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>Delete</button>
    `;

    li.addEventListener("click" , (e) => {
      if(e.target.tagName === "BUTTON") return;
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click",(e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id != task.id);
      li.remove();
      saveTask();
    });

    todoList.appendChild(li);
  }

  function saveTask(){
    localStorage.setItem("token", JSON.stringify(tasks));
  }
})
