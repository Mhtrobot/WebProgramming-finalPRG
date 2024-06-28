import {Component, useEffect} from 'react';
import {BrowserRouter, Route, Routes, useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import "./Userpage.css"

function Userpage() {
    const location = useLocation();
    const {userId, name, rank, password} = location.state;
    let [title, setTitle] = useState("");
    let [list, setList] = useState([]);

    useEffect(() => {
        fetchToDos();
    }, []);

    async function fetchToDos(){
        try {
            const response = await fetch(`http://127.0.0.1:8000/list-of-todos/${userId}`, {method:'GET'});
            const data = await response.json();
            setList(data)
        }catch (error) {
            console.error('Error Fetching data: ',error)
        }
    }
    function add(e) {
        e.preventDefault();
        let text = {status: false, todo: title}
        setList([...list, text])
    }

    return (
        <>
            <div className="head">
                <div className="header-user ">
                    <div className="main-user container-fluid ">
                        <div className="text-main"><p className='text-dark'>MY TO DO LIST</p></div>

                        <div className='mt-5'>
                            <form action="" onSubmit={add}>
                                <div className="boxform">

                                    <input type="text" id='todolist' placeholder='Enter Your Todo List'
                                           onChange={(e) => setTitle(e.target.value)}/>
                                    <button type='submit'>Save</button>
                                </div>
                            </form>
                        </div>
                        <div className="counter d-flex mt-3">
                            <p className='mr-5'>Tope Done : {} </p>
                            <p className='ml-5'>Todo On Progress : {} </p>
                        </div>
                        <div className="list w-50 ">
                            <ul>
                                {list.map((todo, index)=>(
                                    <div key={index} className='todo contianer-fluid mt-2 p-3'>
                                        <li className={'col-lg-7 mt-1'}>
                                            {todo.todo}
                                        </li>
                                        <div className="icon col-lg-4">
                                            <button className="mt-1 mr-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25"
                                                     fill="red" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path
                                                        d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                                    <path
                                                        d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                                </svg>
                                            </button>
                                            <button className='mt-1'>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
                                                     fill="green" className="bi bi-clipboard-check" viewBox="0 0 16 16">
                                                    <path fillRule="evenodd"
                                                          d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0"/>
                                                    <path
                                                        d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1z"/>
                                                    <path
                                                        d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0z"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Userpage;