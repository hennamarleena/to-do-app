const addTaskButton = document.getElementById("addTaskButton");
let taskInput = document.getElementById("taskInput");
const deleteAllButton = document.getElementById("deleteAllButton") 
const taskList = document.getElementById("taskList");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function toggleDeleteAllVisibility() {
    if (taskList.children.length === 0) {
        deleteAllButton.style.display = "none";
    } else {
        deleteAllButton.style.display = "block";
    }
}

function addTask() {
    if (taskInput.value.trim() !== "") {
    const task = {
        text: taskInput.value,
        id: Date.now(),
        };
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskList();
        taskInput.value = "";
    } else {
        alert("Task cannot be empty!")
    }
}

function updateTaskList() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
    
    const taskElement  = document.createElement("li");
    taskElement.classList.add("taskItem");

    const taskItemLeft = document.createElement("div");
    taskItemLeft.classList.add("taskItemLeft");

    const taskItemRight = document.createElement("div");
    taskItemRight.classList.add("taskItemRight");

    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = task.text;
    taskTextElement.classList.add("taskText");

    const taskCheckbox = document.createElement("input");
    taskCheckbox.setAttribute("type", "checkbox");
    taskCheckbox.classList.add("taskCheckbox");
    
    taskCheckbox.onchange = () => {
        if (taskCheckbox.checked) {
            taskTextElement.style.textDecoration = "line-through";
            taskTextElement.style.color = "grey";
        } else {
            taskTextElement.style.textDecoration = "none";
            taskTextElement.style.color = "black";
        }
    };

    const editButton = document.createElement("button");
    editButton.classList.add("editButton");
    editButton.innerHTML = "Edit";

    const deleteTaskButton = document.createElement("button");
    deleteTaskButton.innerHTML = "✖️";
    deleteTaskButton.classList.add("deleteTaskButton");

    deleteTaskButton.addEventListener("click", () => {
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTaskList();
    });

    taskItemLeft.appendChild(taskCheckbox);
    taskItemLeft.appendChild(taskTextElement);
    taskItemRight.appendChild(editButton)
    taskItemRight.appendChild(deleteTaskButton);
    taskElement.appendChild(taskItemLeft);
    taskElement.appendChild(taskItemRight);
    taskList.appendChild(taskElement);

    editButton.addEventListener("click", () => {
        if (taskTextElement.querySelector("input.editinput")) {
            return;
        }
        const editInput = document.createElement("input");
        editInput.classList.add("editInput");
        editInput.value = task.text;

        taskTextElement.textContent = "";
        taskTextElement.appendChild(editInput);
    
        const saveButton = document.createElement("button");
        saveButton.classList.add("saveButton");
        saveButton.textContent = "Save";
    
        saveButton.addEventListener("click", () => {
            if (editInput.value.trim() !== "") {
                taskTextElement.textContent = editInput.value;
                tasks[index].text = editInput.value.trim();
                localStorage.setItem("tasks", JSON.stringify(tasks));
                updateTaskList();
            } else {
                alert("Error, task cannot be empty")
            }
        });
        taskTextElement.appendChild(saveButton);
        });
    });
    toggleDeleteAllVisibility();
}

addTaskButton.addEventListener("click", addTask);

deleteAllButton.addEventListener("click", () => {
    tasks = [];
    localStorage.setItem("tasks", JSON.stringify(tasks));
    updateTaskList();
});

taskInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTask();
    }
})


updateTaskList();