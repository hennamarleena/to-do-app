const add = document.getElementById("add_btn");
let task_input = document.getElementById("task_input");
const deleteAll = document.getElementById("delete_all_btn") 
const tasksContainer = document.getElementById("tasks_container");
let todos = JSON.parse(localStorage.getItem("todos")) || [];

function toggleDeleteAllButton() {
    if (tasksContainer.children.length === 0) {
        deleteAll.style.display = "none";
    } else {
        deleteAll.style.display = "block";
    }
}

function addTaskToList() {
    if (task_input.value.trim() !== "") {
    const newTodo = {
        text: task_input.value,
        id: Math.floor(Math.random() * 999),
        };
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTaskList();
        task_input.value = "";
    } else {
        alert("Task cannot be empty!")
    }
}

function renderTaskList() {
    tasksContainer.innerHTML = "";
    todos.forEach((todo, index) => {
    
    const newTask = document.createElement("li");
    newTask.draggable = true;
    newTask.classList.add("task");

    const taskLeftSide = document.createElement("div");
    taskLeftSide.classList.add("task-left-side");

    const taskRightSide = document.createElement("div");
    taskRightSide.classList.add("task-right-side");

    const newTaskText = document.createElement("span");
    newTaskText.textContent = todo.text;
    newTaskText.classList.add("task-text");

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkbox.classList.add("checkbox");
    
    checkbox.onchange = () => {
        if (checkbox.checked) {
            newTaskText.style.textDecoration = "line-through";
            newTaskText.style.color = "grey";
        } else {
            newTaskText.style.textDecoration = "none";
            newTaskText.style.color = "black";
        }
    };

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "✖️";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", () => {
        todos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(todos));
        renderTaskList();
    });

    taskLeftSide.appendChild(checkbox);
    taskLeftSide.appendChild(newTaskText);
    taskRightSide.appendChild(editBtn)
    taskRightSide.appendChild(deleteBtn);
    newTask.appendChild(taskLeftSide);
    newTask.appendChild(taskRightSide);
    tasksContainer.appendChild(newTask);

    editBtn.addEventListener("click", () => {
        if (newTaskText.querySelector("input.editinput")) {
            return;
        }
        const editInput = document.createElement("input");
        editInput.classList.add("editinput");
        editInput.value = todo.text;

        newTaskText.textContent = "";
        newTaskText.appendChild(editInput);
    
        const saveUpdatedBtn = document.createElement("button");
        saveUpdatedBtn.classList.add("saveUpdatedBtn");
        saveUpdatedBtn.textContent = "Save";
    
        saveUpdatedBtn.addEventListener("click", () => {
            if (editInput.value.trim() !== "") {
                newTaskText.textContent = editInput.value;
                todos[index].text = editInput.value.trim();
                localStorage.setItem("todos", JSON.stringify(todos));
                renderTaskList();
            } else {
                alert("Error, task cannot be empty")
            }
        });
        newTaskText.appendChild(saveUpdatedBtn);
        });
    });
    toggleDeleteAllButton();
}

add.addEventListener("click", addTaskToList);

deleteAll.addEventListener("click", () => {
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
    renderTaskList();
});

task_input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTaskToList();
    }
})

renderTaskList();