import { useEffect, useState } from "react";
import AddForm from "../AddForm/AddForm";
import TodoItem from "../TodoItem/TodoItem";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    if (tasks.length !== 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  function handleDelete(index) {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  }

  function handleDone(index, newDone) {
    setTasks(prev => {
      const newTasks = [...prev];
      newTasks[index].done = newDone;
      return newTasks; 
    })
  }

  function handleAdd(taskName) {
    setTasks(prev => {
      return [{taskName: taskName, done: false}, ...prev];
    })  
  }

  const numberDone = tasks.filter(t => t.done).length;
  const numberAll = tasks.length;

  return (
    <div className="App">
      <h1 className="title">Todo List</h1>
      <h1 className="title">{numberDone}/{numberAll} Complete</h1>
      <AddForm
        handleAdd={handleAdd}
      />
      <ul className="list">
      {tasks.map((task, index) => (
        <TodoItem 
        {...task}
        onDone={done => handleDone(index, done)}
        key={index}
        onDelete={() => handleDelete(index)}/>
      ))}
      </ul>
    </div>
  );
}

export default App;