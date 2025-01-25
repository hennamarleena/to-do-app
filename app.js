const add = document.getElementById("add_btn");
let task_input = document.getElementById("task_input");
const deleteAll = document.getElementById("delete_all_btn") 
const tasksContainer = document.getElementById("tasks_container");

function toggleDeleteAllButton() {
    if (tasksContainer.children.length === 0) {
        deleteAll.style.display = "none";
    } else {
        deleteAll.style.display = "block";
    }
}

task_input.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        addTaskToList();
    }
})

add.addEventListener("click", addTaskToList);

function addTaskToList() {
    if (task_input.value != "") {

    const newTask = document.createElement("li");
    newTask.classList.add("task");

    const taskLeftSide = document.createElement("div");
    taskLeftSide.classList.add("task-left-side");

    const taskRightSide = document.createElement("div");
    taskRightSide.classList.add("task-right-side");

    const newTaskText = document.createElement("span");
    newTaskText.textContent = task_input.value;
    newTaskText.classList.add("task-text");

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-btn");
    editBtn.innerHTML = "Edit";

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "✖️";
    deleteBtn.classList.add("delete-btn");

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

    deleteBtn.addEventListener("click", () => {
        newTask.remove();
        toggleDeleteAllButton();
    });

    taskLeftSide.appendChild(checkbox);
    taskLeftSide.appendChild(newTaskText);
    taskRightSide.appendChild(editBtn)
    taskRightSide.appendChild(deleteBtn);
    newTask.appendChild(taskLeftSide);
    newTask.appendChild(taskRightSide);
    task_input.value = "";
    document.getElementById("tasks_container").appendChild(newTask);

    editBtn.addEventListener("click", () => {
        if (newTaskText.querySelector("input.editinput")) {
            return;
        }
        const editinput = document.createElement("input");
        editinput.classList.add("editinput");
        editinput.value = newTaskText.textContent;

        newTaskText.textContent = "";
        newTaskText.appendChild(editinput);
    
        const saveUpdatedBtn = document.createElement("button");
        saveUpdatedBtn.classList.add("saveUpdatedBtn");
        saveUpdatedBtn.textContent = "Save";
    
        saveUpdatedBtn.addEventListener("click", () => {
            if (editinput.value.trim() !== "") {
                newTaskText.textContent = editinput.value;
            } else alert( "Error, task cannot be empty")
        });
        newTaskText.appendChild(saveUpdatedBtn);
        });
    }
    toggleDeleteAllButton();
}

deleteAll.addEventListener("click", () => {
    if (tasksContainer) {
        tasksContainer.innerHTML = "";
        toggleDeleteAllButton();
    }
});

toggleDeleteAllButton();
