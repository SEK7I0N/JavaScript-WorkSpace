import { useState, useEffect } from "react";

import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);

  const [tasks, setTask] = useState([]);

  useEffect(() => {
    const getTask = async () => {
      const taskFromServer = await fetchTasks();
      setTask(taskFromServer);
    };
    getTask();
  }, []);

  // ? Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  // ? Fetch task this will fetch based on ID
  const fetchTaskById = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  // ? Save task
  const saveTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTask([...tasks, data]);

    // * here we generate the id
    // `` const id = Math.floor(Math.random() * 417683235486752344) + 1;
    // `` const newTask = { id, ...task };
    // `` console.log(newTask);
    // `` setTask([...tasks, newTask]);
    // `` console.log(tasks);
  };
  // ? DeleteTask(ID)  --> this funtion will simulate delete funtion as it will filter out the tasks based on IDs
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTask(tasks.filter((task) => task.id !== id));
  };
  // ?

  const toggleReminder = async (id) => {
    const toggleTask = await fetchTaskById(id);
    const newToggleTask = { ...toggleTask, reminder: !toggleTask.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newToggleTask),
    });

    const data = await res.json();

    await setTask(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    );
  };

  return (
    <div className="container">
      <Header
        onAdd={() => setShowAddTask(!showAddTask)}
        showAdd={showAddTask}
      />

      {showAddTask && <AddTask saveTask={saveTask} />}
      {tasks.length > 0 ? (
        <Tasks
          tasks={tasks}
          onDelete={deleteTask}
          onReminder={toggleReminder}
        />
      ) : (
        "There are no tasks"
      )}
    </div>
  );
}

export default App;
