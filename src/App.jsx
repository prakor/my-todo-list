import { useState, useEffect } from "react";
import axios from "axios";
import TodoList from "./component/TodoList";
import Loading from "./component/Loading";
import "./App.css";

const BASE_URL = "https://65c6558de5b94dfca2e16204.mockapi.io/todos";

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getList = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}`);
      console.log(res.data);
      setTodos(res.data.sort((a, b) => b.id - a.id));
      setIsLoading(false);
    } catch (error) {
      console.log("error", error);
    }
  };

  const addList = async () => {
    try {
      setIsLoading(true)
      await axios.post(`${BASE_URL}`, {
        detail: input
      })
      setInput('');
      getList();
    } catch (error) {
      console.log('error', error);
      setIsLoading(false)
    }
  }


  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      {isLoading && <div className='todo-page'><Loading/></div>}
      {!isLoading && (
        <div className="todo-app">
          <div className="todo-app__title">My Todo List</div>
          <div className="todo-app__form">
           <input
              type="text"
              placeholder="Add todo"
              className="todo-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button className="todo-btn" onClick={addList}>Add todo</button>
          </div>
          <div className="todo-app__list">
            {todos.map((item, index) => (
              <TodoList key={index} id={item.id} detail={item.detail} getList={getList} status={item.status}/>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default App;
