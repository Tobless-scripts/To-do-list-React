import { useState, useEffect } from "react";

function Todo() {
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [];
    });

    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks((t) => [...t, { text: newTask, completed: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function completeTask(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <div className="todo-container">
            <h1>To-Do List</h1>

            <div className="todo-input">
                <input
                    type="text"
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Enter new task..."
                    value={newTask}
                />
                <button onClick={addTask}>Add Task</button>
            </div>

            <ul className="todo-list">
                {tasks.map((task, index) => (
                    <li
                        key={index}
                        className={task.completed ? "completed" : ""}
                    >
                        <input
                            type="checkbox"
                            onChange={() => completeTask(index)}
                            checked={task.completed}
                        />
                        <span className="taskText">{task.text}</span>
                        <button
                            className="delete-btn"
                            onClick={() => deleteTask(index)}
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Todo;
