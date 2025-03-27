document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("list");
    const progressText = document.getElementById("progress-text");
    const progressCircle = document.getElementById("progress-circle");

    function loadTasks() {
        const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
        savedTasks.forEach((task, index) => addTask(task.text, index + 1, task.completed, false));
        updateProgress();
    }
    function saveTasks() {
        const tasks = [...taskList.children].map(item => ({
            text: item.querySelector(".task-text").innerText,
            completed: item.classList.contains("completed")
        }));
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateProgress();
    }

    function addTask(taskText = null, taskNumber = null, completed = false, save = true) {
        let task = taskText || taskInput.value.trim();
        if (task === "") return;
        const li = document.createElement("li");
        li.className = `grid grid-cols-2 gap-6 justify-between items-center py-1 border-b border-gray-400 ${completed ? "completed opacity-50" : ""}`;
        const taskNum = taskNumber || taskList.children.length + 1;

        li.innerHTML = `
            <span class="task-text">${taskNum}. ${task}</span>
            <div class="flex justify-end">
                <button class="done-btn px-2 py-1 bg-green-500 text-white rounded-sm mr-2">${completed ? "Undo" : "Done"}</button>
                <button class="edit-btn px-2 py-1 bg-blue-500 text-white rounded-sm mr-2">Edit</button>
                <button class="delete-btn px-2 py-1 bg-red-500 text-white rounded-sm">Delete</button>
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
                li.querySelector(".task-text").innerText = `${taskNum}. ${newTaskText}`;
                saveTasks();
            }
        });

        li.querySelector(".done-btn").addEventListener("click", function () {
            li.classList.toggle("completed");
            li.classList.toggle("line-through");
            this.textContent = li.classList.contains("completed") ? "Undo" : "Done";
            saveTasks();
        });

        if (save) saveTasks();
    }

    function updateTaskNumbers() {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            const taskText = tasks[i].querySelector(".task-text").innerText.split(". ")[1];
            tasks[i].querySelector(".task-text").innerText = `${i + 1}. ${taskText}`;
        }
        updateProgress();
    }

    function updateProgress() {
        let totalTasks = taskList.children.length;
        let completedTasks = [...taskList.children].filter(task => task.classList.contains("completed")).length;

        let progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;
        progressText.textContent = `${Math.round(progress)}%`;

        let offset = 251.2 - (progress / 100) * 251.2;
        progressCircle.style.strokeDashoffset = offset;
    }

    addButton.addEventListener("click", () => addTask());
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    loadTasks();
});
