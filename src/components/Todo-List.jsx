import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css"; // Import the CSS file
import { IoMdCheckmark } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { BsAlphabetUppercase } from "react-icons/bs";
import { RxLetterCaseLowercase } from "react-icons/rx";

const TodoKey = "TodoApp";

function TodoList() {
  const [dateTime, setDateTime] = useState("");
  let [todos, setTodo] = useState(() => {
    const rowTodo = localStorage.getItem(TodoKey);
    if (!rowTodo) return [];
    return JSON.parse(rowTodo);
  });

  let [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    if (newTodo.trim() !== "") {
      setTodo([...todos, { task: newTodo, id: uuidv4(), isDone: false }]);
      setNewTodo("");
    }
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodo((preTodos) => preTodos.filter((preTodos) => preTodos.id !== id));
  };

  let deleteAllTodos = () => {
    setTodo([]);
  };

  let UpperCaseAll = () => {
    setTodo((preTodos) =>
      preTodos.map((todo) => ({
        ...todo,
        task: todo.task.toUpperCase(),
      }))
    );
  };

  let LowerCaseAll = () => {
    setTodo((preTodos) =>
      preTodos.map((todo) => ({
        ...todo,
        task: todo.task.toLowerCase(),
      }))
    );
  };

  let MarkAsDoneOne = (id) => {
    setTodo((preTodos) =>
      preTodos.map((todo) =>
        todo.id === id ? { ...todo, isDone: true } : todo
      )
    );
  };

  let MarkAsDoneAll = () => {
    setTodo((preTodos) =>
      preTodos.map((todo) => ({
        ...todo,
        isDone: true,
      }))
    );
  };

  localStorage.setItem(TodoKey, JSON.stringify(todos));

  // Date and Time
  const interval = setInterval(() => {
    const now = new Date();
    const formattedDate = now.toLocaleDateString();
    const formattedTime = now.toLocaleTimeString();
    setDateTime(`${formattedDate} - ${formattedTime}`);
  }, 1000);

  return (
    <div className="notes-container">
      <h3 className="notes-title">ToDo List</h3>
      <h2 className="date-time">{dateTime}</h2>
      <div className="notes-input-container">
        <input
          className="notes-input"
          placeholder="Write Your Task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="notes-button" onClick={addNewTask}>
          Add
          <IoMdAdd />
        </button>
      </div>
      <ul className="notes-list">
        {todos.map((todo) => (
          <li key={todo.id} className="notes-item">
            <span className={`notes-text ${todo.isDone ? "done" : ""}`}>
              {todo.task}
            </span>
            <div className="notes-buttons">
              <button
                className="notes-delete-button"
                onClick={() => deleteTodo(todo.id)}
              >
                <MdDeleteForever />
              </button>
              <button
                className="notes-done-button"
                onClick={() => MarkAsDoneOne(todo.id)}
              >
                <IoMdCheckmark />
              </button>
            </div>
          </li>
        ))}
      </ul>
      {todos.length > 0 && (
        <div className="notes-extra-buttons">
          <button className="notes-extra-button" onClick={UpperCaseAll}>
            <BsAlphabetUppercase />
          </button>
          <button className="notes-extra-button" onClick={LowerCaseAll}>
            <RxLetterCaseLowercase />
          </button>
          <button className="notes-extra-button" onClick={MarkAsDoneAll}>
            <IoCheckmarkDoneSharp />
          </button>
          <button
            className="notes-extra-button notes-delete-all"
            onClick={deleteAllTodos}
          >
            Delete All
          </button>
        </div>
      )}
      <footer className="footer">
        <p>❤️ Suraj</p>
      </footer>
    </div>
  );
}

export default TodoList;
