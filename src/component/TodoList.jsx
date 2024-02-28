import { useState, useEffect } from "react";
import './TodoList.css'
import { FiTrash2, FiEdit, FiXCircle, FiCheckCircle } from "react-icons/fi";
import axios from "axios";

const BASE_URL = "https://65c6558de5b94dfca2e16204.mockapi.io/todos";

function TodoList({ id, detail, setIsLoading, getList, status}) {
    const [input, setInput] = useState('')
    const [statusActive, setStatusActive] = useState(false);

    const deleteTodo = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/${id}`)
            getList();
        } catch (error) {
            console.log('error', error);
        }
    } 

    const completeTodo = async (id) => {
        try {
            await axios.put(`${BASE_URL}/${id}`, {
                status: !status
            }).then((result) => {
                if (result.statusText == 'OK') {
                    getList();
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    }

    const setEdit = () => {
        setStatusActive(true)
    }

    const updateTodo = async (id) => {
        try {
            await axios.put(`${BASE_URL}/${id}`, {
                detail: input
            }).then((result) => {
                console.log('update');
                console.log(result);
                if (result.statusText == 'OK') {
                    getList();
                }
            })
        } catch (error) {
            console.log('error', error);
        }
    }

    useEffect(() => {
        setInput(detail);
      }, [detail]);

    return (
        <div className={status ? 'todo-item complete' : 'todo-item'}>
            <input
                className={statusActive ? 'todo-item__input active' : 'todo-item__input'}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!statusActive}
            /> 
            <div className="todo-action">
                {statusActive ?    
                    <>
                        <button className="todo-action__btn" onClick={() => updateTodo(id)}>Update</button>
                        <button className="todo-action__btn" onClick={() => setStatusActive(false)}>Cancel</button>
                    </>
                :
                    status ? 
                        <>
                            <FiTrash2 onClick={() => deleteTodo(id)}/> 
                            <FiXCircle onClick={() => completeTodo(id)}/>
                        </>
                    : 
                        <>
                            <FiTrash2 onClick={() => deleteTodo(id)}/>
                            <FiEdit onClick={setEdit}/>
                            <FiCheckCircle onClick={() => completeTodo(id)}/>
                        </>  
                }
                
            </div>
        </div>
    )
}

export default TodoList
