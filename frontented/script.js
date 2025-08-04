const form = document.getElementById("todo-form");
const API = "http://localhost:3000/api/tasks";

const taskList = document.getElementById("todo_task_list");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("todo_Title").value;
  const description = document.getElementById("todo_description").value;

  const response = await fetch(API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, description }),
  });

  console.log("Response after post request", response.status, response.json());

  if (response.status === 200) {
    alert(`Task ${title} added successfully`);
  }
  document.getElementById("todo_Title").value = "";
  document.getElementById("todo_description").value = "";

  // featch a request to get the task and show it on the frontend
  loadTasks();
});
async function loadTasks() {
  const result = await fetch(API);
  const tasks = await result.json();
  console.log("tasks", tasks);
  taskList.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");

    if (task.iscompleted) {
      li.className = "completed";
    } else {
      li.className = "not completed";
    }
    li.innerHTML = `<div class="left_div">
          <input type="checkbox" name="" id="" class="checkbox" ${
            task.iscompleted ? "checked" : ""
          }  onclick="toggleUpdate('${task._id}', ${!task.iscompleted})"/>
          <details>
            <summary class="taskTitle">${task.title}</summary>
            <br />
            <p class="tasDesc">${task.description}</p>
          </details>
        </div>

        <button class="delete_btn" onclick="deleteTask('${task._id}')">Delete</button>`;
    taskList.appendChild(li);
  });
}

loadTasks();
// put delete request
// let checkbox
// async function handlecheckbox(id , iscompleted) {
//  await loadTasks();
//  checkbox = document.querySelectorAll(".checkbox");

// }
// handlecheckbox();
// async function handleDeleteClick(id) {}
async function toggleUpdate(id, iscompleted) {
  const response = await fetch(`${API}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ iscompleted }),
  });
console.log(response.json())

   await loadTasks();

}

// delete
async function deleteTask(id) {
  const response = await fetch(`${API}/${id}`, {
    method: "DELETE"
  });
  loadTasks();
}