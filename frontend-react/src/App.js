import React, { useEffect, useState } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTodos = async () => {
    const response = await fetch('/api/todos');
    const data = await response.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!title) return;
    await fetch('/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    });
    setTitle('');
    fetchTodos();
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>To-do App</h1>
      <input
        type="text"
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="New task"
      />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>{todo.title} {todo.done ? '✔️' : ''}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
