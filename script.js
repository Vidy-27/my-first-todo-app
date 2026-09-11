function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");
    li.textContent = taskText;

    li.addEventListener("click", function () {
        li.style.textDecoration =
            li.style.textDecoration === "line-through"
                ? "none"
                : "line-through";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function (event) {
        event.stopPropagation();
        li.remove();
    });

    li.appendChild(deleteButton);
    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
}
