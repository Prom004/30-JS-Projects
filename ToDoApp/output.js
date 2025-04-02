document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("list");

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task) => addTask(task.text, task.time, false));
    }

    function saveTasks() {
        const tasks = [...taskList.children].map(item => {
            return {
                text: item.querySelector("span").innerText.split(". ")[1],
                time: item.dataset.time
            };
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function addTask(taskText = null, timeSpent = "0s", save = true) {
        let task = taskText || taskInput.value.trim();
        if (task === "") return;

        const li = document.createElement("li");
        li.className = "grid grid-cols-2 gap-2 justify-between items-center py-1 border-b border-gray-400";
        li.dataset.time = timeSpent;

        const taskNum = taskList.children.length + 1;
        let startTime = new Date();

        li.innerHTML = `
            <span>${taskNum}. ${task}</span>
            <div class="flex justify-end">    
                <span class="time-spent text-sm text-gray-400">${timeSpent}</span>
                <button class="done-btn px-2 py-1 bg-green-500 text-white rounded-sm ml-2">Done</button>
                <button class="edit-btn px-2 py-1 bg-blue-500 text-white rounded-sm ml-2">Edit</button>
                <button class="delete-btn px-2 py-1 bg-red-500 text-white rounded-sm ml-2">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = "";

        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
            updateTaskNumbers();
            saveTasks();
        });

        li.querySelector(".edit-btn").addEventListener("click", function () {
            let newTaskText = prompt("Edit your task:", task);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                li.querySelector("span").innerText = `${taskNum}. ${newTaskText}`;
                saveTasks();
            }
        });

        li.querySelector(".done-btn").addEventListener("click", function () {
            let endTime = new Date();
            let timeTaken = Math.floor((endTime - startTime) / 1000) + "s";
            li.querySelector(".time-spent").innerText = timeTaken;
            li.dataset.time = timeTaken;
            saveTasks();
        });

        if (save) saveTasks();
    }

    function updateTaskNumbers() {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            const taskText = tasks[i].querySelector("span").innerText.split(". ")[1];
            tasks[i].querySelector("span").innerText = `${i + 1}. ${taskText}`;
        }
    }

    addButton.addEventListener("click", () => addTask());
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
    
    loadTasks();
});
