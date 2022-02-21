import './App.css';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const todoFromServer = await fetchTodos();
      setTodos(todoFromServer);
    };

    getTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const res = await fetch(
        'https://jsonplaceholder.typicode.com/todos?userId=2'
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodoById = async (id) => {
    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };
  const toggleColor = async (id) => {
    try {
      const getTodo = await fetchTodoById(id);
      const updateTodo = { ...getTodo, completed: !getTodo.completed };

      const res = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body: JSON.stringify(updateTodo),
        }
      );
      const data = await res.json();
      setTodos(
        todos.map((todo) =>
          id === todo.id ? { ...todo, completed: data.completed } : todo
        )
      );
    } catch (error) {
      console.log('error');
    }
  };
  const deleteById = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => id !== todo.id));
    } catch (error) {}
  };
  console.log(todos);
  return (
    <div className="App">
      <h1>Todo List</h1>
      <>
        {todos.map((todo) => (
          <div
            onDoubleClick={() => toggleColor(todo.id)}
            style={{ backgroundColor: todo.completed ? 'yellowgreen' : '' }}
            key={todo.id}
            className="TodoList"
          >
            <span>{todo.id}</span>
            <span>{todo.title}</span>
            <MdDelete
              style={{ minWidth: '25px' }}
              onClick={() => deleteById(todo.id)}
            />
          </div>
        ))}
      </>
    </div>
  );
}

export default App;
