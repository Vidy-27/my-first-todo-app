const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.className = "task-item";

    const taskSpan = document.createElement("span");
    taskSpan.className = "task-text";
    taskSpan.textContent = taskText;

    taskSpan.addEventListener("click", function () {
        li.classList.toggle("completed");
        updateTaskCount();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        li.remove();
        updateTaskCount();
    });

    li.appendChild(taskSpan);
    li.appendChild(deleteButton);

    taskList.appendChild(li);

    taskInput.value = "";
    taskInput.focus();

    updateTaskCount();
}

function updateTaskCount() {
    const tasks = document.querySelectorAll(".task-item");
    const completedTasks = document.querySelectorAll(".task-item.completed");

    const totalTasks = tasks.length;
    const completedCount = completedTasks.length;

    if (totalTasks === 0) {
        taskCount.textContent = "0 tasks";
        emptyMessage.style.display = "block";
    } else {
        taskCount.textContent =
            `${totalTasks} ${totalTasks === 1 ? "task" : "tasks"} · ${completedCount} completed`;

        emptyMessage.style.display = "none";
    }
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

updateTaskCount();
