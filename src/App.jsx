import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './Navbar';
import { Alert, Button } from 'react-bootstrap';
import Pagination from './Pagination'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage] = useState(10);
  const [errormsg, setErrormsg] = useState('');

  // Fetch todos from api 
  const fetchTodos = async () => {
    try {
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await resp.json();
      setTodos(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo items at top
  const addTodo = () => {
    if (newTodo.length !== 0) {
      if (newTodo.trim()) {
        const newTodoItem = {
          id: todos.length + 1,
          title: newTodo,
          completed: false,
        };
        setTodos([newTodoItem, ...todos]);
        setNewTodo('');
        setErrormsg('');
      }
    } else {
      setErrormsg('Enter Todo ...');
    }
  };

  // delete todo item by clicking button
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="input-group mt-5 w-50 m-auto mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Add a new todo"
            value={newTodo}
            onChange={(e) => {setNewTodo(e.target.value); setErrormsg('')  } }
          />
          <Button variant="primary" onClick={addTodo}>
            Add
          </Button>
          {errormsg !== '' && (
            <Alert variant="danger" className="mt-3 w-100">
              {errormsg}
            </Alert>
          )}
        </div>

        <div className="table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Todo Item</th>
                <th>Completed?</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className="records">
              {currentTodos.map((item, index) => (
                <tr key={item.id}>
                  <td>{indexOfFirstTodo + index + 1}</td>
                  <td>{item.title}</td>
                  <td>{item.completed ? 'Yes' : 'No'}</td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => deleteTodo(item.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination
            todosPerPage={todosPerPage}
            totalTodos={todos.length}
            paginate={paginate}
          />
        </div>
      </div>
    </>
  );
}

export default App;
