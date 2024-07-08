import {Component, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import "./Userpage.css"

function Userpage() {
    const location = useLocation();
    const navigate = useNavigate();
    const {state} = location;
    const {userId, name, rank, password} = state;
    let [title, setTitle] = useState("");
    let [list, setList] = useState([]);
    let [priority, setPriority] = useState(0);
    let [change, setChange] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
        </svg>
    )
    const [isChanged, setIsChanged] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        if (!state || localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === "") {
            // If state is null, navigate back to homepage or login page
            navigate('/');
            return;
        }
        fetchToDos();
    }, [state, navigate]);

    async function fetchToDos() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/list-of-todos/${userId}`, {method: 'GET'});
            const data = await response.json();
            setList(data)
            setList(list.reverse())
        } catch (error) {
            console.error('Error Fetching data: ', error)
        }
    }

    async function addToDo(e) {
        e.preventDefault();
        if (title.trim() === '') {
            showAlert('Error Adding Task! Field is empty.', 'danger');
            return;
        }
        try {
            const respone = await fetch(`http://127.0.0.1:8000/add-todo/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({todo: title, status: 'false', priority: priority})
            });
            // setListtop("false")
            const newToDo = await respone.json();
            setList([...list, newToDo]);
            showAlert('new task added!', 'success')
            setPriority(0) //false top list default
            setChange(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                <path fill-rule="evenodd"
                      d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
            </svg>) //change icon  after add list
        } catch (e) {
            showAlert('Error Adding Task! Field either empty or not supported', 'danger');
        }
        setTitle("")
    }

    async function markAsDone(todoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/complete-todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({status: 'true'})
            });
            const updateTodo = await response.json();
            setList(list.map(todo => (todo.todo_id === todoId ? updateTodo : todo)));
            showAlert('Task Marked As Done!', 'success');
        } catch (e) {
            showAlert('Error Making Task as Done', 'danger');
        }
    }

    async function deleteTodo(todoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete-todo/${todoId}`, {method: 'DELETE'});
            setList(list.filter(todo => todo.todo_id !== todoId));
            showAlert('Task Deleted Successfully!', 'primary')
        } catch (e) {
            showAlert('Error Deleting Data!', 'alert')
        }
    }

    function logOut(e){
        e.preventDefault()
        localStorage.setItem('access_token',"")
        alert('YOU ARE LOGGED OUT')
        navigate('/')
    }

    function showAlert(message, type) {
        const alertPlaceholder = document.querySelector('.todo-title');
        if (!alertPlaceholder) return;

        const wrapper = document.createElement('div');
        wrapper.innerHTML = `
            <div class="alert alert-${type} alert-dismissible" role="alert">
                ${message}
            </div>
        `;
        alertPlaceholder.append(wrapper);

        setTimeout(() => {
            if (alertPlaceholder.contains(wrapper)) {
                wrapper.remove();
            }
        }, 3000);
    }

    const handleClick = () => {
        if (!isChanged) {
            setPriority(1);
            setChange(<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                           class="bi bi-check-lg" viewBox="0 0 16 16">
                <path
                    d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
            </svg>);
            showAlert('Task Marked as Priority', 'success')
            setIsChanged(true)
        }else {
            setPriority(0)
            setChange(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                     fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                          d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                </svg>
            )
            setIsChanged(false)
        }
    };


    return (
        <>
            <div className="head">
                <div className="header-user ">
                    <div className="main-user container-fluid ">
                        <div className="text-main"><p className='text-dark'>MY TO DO LIST</p></div>

                        <div className='mt-5 todo-title'>
                            <form action="" onSubmit={addToDo}>
                            <div className="boxform">
                                    <input className={'task'} type="text" id='todolist' placeholder='Enter Your Task'
                                           onChange={(e) => setTitle(e.target.value)}/>
                                    <button type='submit'>Save</button>
                                    <button type='button' onClick={handleClick}>{change}</button>
                                </div>
                            </form>
                        </div>

                        <div className="counter d-flex mt-3">
                            <p className='mr-5'>Topic Done : {list.filter(todo => todo.status === 'true').length} </p>
                            <p className='ml-5'>Todo On Progress : {list.filter(todo => todo.status === 'false').length} </p>
                        </div>



                        <button type={"button"} onClick={logOut} className='btn btn-danger logout'>LogOut</button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Userpage;