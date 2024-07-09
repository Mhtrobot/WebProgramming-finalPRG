import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import "./Userpage.css";

function Userpage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { userId } = state;
    let [title, setTitle] = useState("");
    let [list, setList] = useState([]);
    let [priority, setPriority] = useState(0);
    let [change, setChange] = useState(
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
        </svg>
    );
    const [isChanged, setIsChanged] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleToggle = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        if (!state || localStorage.getItem('access_token') === null || localStorage.getItem('access_token') === "") {
            navigate('/');
            return;
        }
        fetchToDos();
    }, [state, navigate]);

    async function fetchToDos() {
        try {
            const response = await fetch(`http://127.0.0.1:8000/list-of-todos/${userId}`, { method: 'GET' });
            const data = await response.json();
            setList(data);
        } catch (error) {
            console.error('Error Fetching data: ', error);
        }
    }

    async function addToDo(e) {
        e.preventDefault();
        if (title.trim() === '') {
            showAlert('Error Adding Task! Field is empty.', 'danger');
            return;
        }
        try {
            const response = await fetch(`http://127.0.0.1:8000/add-todo/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ todo: title, status: 'false', priority: priority })
            });
            const newToDo = await response.json();
            setList([...list, newToDo]);
            showAlert('New task added!', 'success');
            setPriority(0);
            setChange(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                </svg>
            );
        } catch (e) {
            showAlert('Error Adding Task! Field either empty or not supported', 'danger');
        }
        setTitle("");
    }

    async function markAsDone(todoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/complete-todo/${todoId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ status: 'true' })
            });
            const updateTodo = await response.json();
            setList(list.map(todo => (todo.todo_id === todoId ? updateTodo : todo)));
            showAlert('Task Marked As Done!', 'success');
        } catch (e) {
            showAlert('Error Marking Task as Done', 'danger');
        }
    }

    async function deleteTodo(todoId) {
        try {
            const response = await fetch(`http://127.0.0.1:8000/delete-todo/${todoId}`, { method: 'DELETE' });
            setList(list.filter(todo => todo.todo_id !== todoId));
            showAlert('Task Deleted Successfully!', 'primary');
        } catch (e) {
            showAlert('Error Deleting Data!', 'alert');
        }
    }

    function logOut(e) {
        e.preventDefault();
        localStorage.setItem('access_token', "");
        alert('YOU ARE LOGGED OUT');
        navigate('/');
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
            setChange(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-check-lg" viewBox="0 0 16 16">
                    <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
                </svg>
            );
            showAlert('Task Marked as Priority', 'success');
            setIsChanged(true);
        } else {
            setPriority(0);
            setChange(
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-bar-up" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 10a.5.5 0 0 0 .5-.5V3.707l2.146 2.147a.5.5 0 0 0 .708-.708l-3-3a.5.5 0 0 0-.708 0l-3 3a.5.5 0 1 0 .708.708L7.5 3.707V9.5a.5.5 0 0 0 .5.5m-7 2.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5"/>
                </svg>
            );
            setIsChanged(false);
        }
    };

    const priorityTodos = list.filter(todo => todo.priority === 1);
    const nonPriorityTodos = list.filter(todo => todo.priority !== 1);

    return (
        <>
            <div className="head">
                <div className="header-user">
                    <div className="main-user container-fluid">
                        <div className="text-main"><p className='text-dark'>MY TO DO LIST</p></div>

                        <div className='mt-5 todo-title '>
                            <form action="" onSubmit={addToDo}   >
                                <div className="boxform row ">
                                    <input className={'task'} type="text" id='todolist' placeholder='Enter Your Task' onChange={(e) => setTitle(e.target.value)} />
                                    <button type='submit' id='save'>Save</button>
                                    <button type='button' onClick={handleClick} id='Priority'>{change}</button>
                                </div>
                            </form>
                        </div>

                        <div className="counter d-flex mt-3">
                            <p className='mr-5'>Topic Done : {list.filter(todo => todo.status === 'true').length} </p>
                            <p className='ml-5'>Todo On Progress : {list.filter(todo => todo.status === 'false').length} </p>
                        </div>

                        <div className="list w-50">
                            <button onClick={handleToggle} className='btn btn-primary'>
                                {isCollapsed ? 'Show Priority Tasks' : 'Hide Priority Tasks'}
                            </button>
                            {!isCollapsed && (
                                <ul className="list-group mt-2 ">
                                    {priorityTodos.map((todo, index) => (
                                        <div key={index} className={`todo container-fluid mt-2 p-3 ${todo.status === 'true' ? 'grayed-out' : ''}`} style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}}>
                                            <li className={'col-lg-7 mt-1'} >
                                                {todo.todo}
                                            </li>
                                            <div className={`icon col-lg-4 ${todo.status === 'true' ? 'grayed-out' : ''}`} style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}}>
                                                <button onClick={() => deleteTodo(todo.todo_id)} className={`mt-1 mr-2`}style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className={`bi bi-trash ${todo.status === 'true' ? 'grayed-out' : ''}`} viewBox="0 0 16 16" style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}} >
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                    </svg>
                                                </button>
                                                <button onClick={() => markAsDone(todo.todo_id)} disabled={todo.status === 'true'} className='mt-1'style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={`bi bi-clipboard-check ${todo.status === 'true' ? 'grayed-out' : ''}`} viewBox="0 0 16 16" style={{backgroundColor: todo.status === "false" ? "rgb(206, 212, 218)" : "rgb(124, 255, 1)"}}>
                                                        <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                                        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                                        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </ul>
                            )}
                            <p style={{color: "black", marginTop:'30px'}}>Other Tasks:</p>
                            <ul className="list-group mt-2">
                                {nonPriorityTodos.map((todo, index) => (
                                    <div key={index} className={`todo container-fluid mt-2 p-3 ${todo.status === 'true' ? 'grayed-out' : ''}`} style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                        <li className={'col-lg-7 mt-1'}>
                                            {todo.todo}
                                        </li>
                                        <div className={`icon col-lg-4 ${todo.status === 'true' ? 'grayed-out' : ''}`}style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                            <button onClick={() => deleteTodo(todo.todo_id)} className={`mt-1 mr-2`}style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className={`bi bi-trash ${todo.status === 'true' ? 'grayed-out' : ''}`} viewBox="0 0 16 16" style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </button>
                                            <button onClick={() => markAsDone(todo.todo_id)} disabled={todo.status === 'true'} className='mt-1' style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="green" className={`bi bi-clipboard-check ${todo.status === 'true' ? 'grayed-out' : ''}`} viewBox="0 0 16 16" style={{backgroundColor: todo.status === "false" ? "white" : "rgb(124, 255, 1)"}}>
                                                    <path fillRule="evenodd" d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                                    <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                                    <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>

                        <button type="button" onClick={logOut} className='btn btn-danger logout mt-5'>LogOut</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Userpage;
