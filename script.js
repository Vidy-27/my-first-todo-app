const taskInput = document.getElementById("taskInput");
const addTaskButton = document.getElementById("addTaskButton");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function (task) {
        const li = document.createElement("li");
        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }

        const taskSpan = document.createElement("span");
        taskSpan.className = "task-text";
        taskSpan.textContent = task.text;

        taskSpan.addEventListener("click", function () {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            tasks = tasks.filter(function (currentTask) {
                return currentTask.id !== task.id;
            });

            saveTasks();
            renderTasks();
        });

        li.appendChild(taskSpan);
        li.appendChild(deleteButton);

        taskList.appendChild(li);
    });

    updateTaskCount();
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    renderTasks();

    taskInput.value = "";
    taskInput.focus();
}

function updateTaskCount() {
    const totalTasks = tasks.length;

    const completedCount = tasks.filter(function (task) {
        return task.completed;
    }).length;

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

renderTasks();
