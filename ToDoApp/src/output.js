document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("task");
    const addButton = document.getElementById("add");
    const taskList = document.getElementById("list");

    function addTask() {
        let taskText = taskInput.value.trim();
        if (taskText === "") return; // Prevent adding empty tasks

        // Create task item
        const li = document.createElement("li");
        li.className = "grid grid-cols-2 justify-between items-center py-1 border-b border-gray-400";
        
        // Get task number based on existing items
        const taskNumber = taskList.children.length + 1;

        li.innerHTML = `
            <span>${taskNumber}. ${taskText}</span>
            <div class="flex justify-end">	
                <button class="edit-btn px-2 py-1 bg-blue-500 text-white rounded-sm mr-2">Edit</button>
                <button class="delete-btn px-2 py-1 bg-red-500 text-white rounded-sm">Delete</button>
            </div>
        `;

        taskList.appendChild(li);
        taskInput.value = ""; // Clear input field

        // Add event listener to the delete button
        li.querySelector(".delete-btn").addEventListener("click", function () {
            li.remove();
            updateTaskNumbers();
        });

        // Add event listener to the edit button
        li.querySelector(".edit-btn").addEventListener("click", function () {
            let newTaskText = prompt("Edit your task:", taskText);
            if (newTaskText !== null && newTaskText.trim() !== "") {
                li.querySelector("span").innerText = `${taskNumber}. ${newTaskText}`;
            }
        });
    }

    function updateTaskNumbers() {
        const tasks = taskList.children;
        for (let i = 0; i < tasks.length; i++) {
            const taskText = tasks[i].querySelector("span").innerText.split(". ")[1];
            tasks[i].querySelector("span").innerText = `${i + 1}. ${taskText}`;
        }
    }

    // Add task when clicking the "Add" button
    addButton.addEventListener("click", addTask);

    // Allow adding tasks by pressing "Enter"
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });
});
