// সব DOM element select করছি
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// ✅ Load saved tasks when page loads
window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach((task) => {
    addTaskToDOM(task.text, task.completed);
  });
};

// ✅ Add Button এ Click করলে Task add হবে
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    addTaskToDOM(taskText, false); // false = not completed yet
    saveTask(taskText, false);
    taskInput.value = ""; // ইনপুট ফাঁকা করো
  }
});

// ✅ Function: Task DOM-এ দেখাও
function addTaskToDOM(text, isCompleted) {
  const li = document.createElement("li");
  li.textContent = text;

  if (isCompleted) {
    li.classList.add("completed");
  }

  // Click করলে complete toggle হবে
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateLocalStorage();
  });

  // ❌ Delete button add
  const deleteBtn = document.createElement("span");
  deleteBtn.textContent = "❌";
  deleteBtn.style.marginLeft = "10px";
  deleteBtn.style.cursor = "pointer";

  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // যাতে li click না হয়
    li.remove();
    updateLocalStorage();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

// ✅ Function: Save new task
function saveTask(text, isCompleted) {
  const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.push({ text, completed: isCompleted });
  localStorage.setItem("tasks", JSON.stringify(savedTasks));
}

// ✅ Function: Update localStorage (after delete/toggle)
function updateLocalStorage() {
  const allTasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    const text = li.childNodes[0].nodeValue;
    const completed = li.classList.contains("completed");
    allTasks.push({ text, completed });
  });
  localStorage.setItem("tasks", JSON.stringify(allTasks));
}
