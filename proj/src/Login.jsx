import { Component } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import todolist from "./image/Done.png"
import "./signup.css"
import React, { useState } from 'react';
import Userpage from './Userpage';

const Login = () => {
    let [input1, setInput1] = useState("")
    let [input2, setInput2] = useState("")
    const navigate = useNavigate()
    const data = {
        email: input1,
        password: input2
    }
    async function login(e) {
        e.preventDefault();
        let pattern = /[A-Za-z]+(.)+@(.)+[.][a-z]+/g;
        let check = true;
        let check1 = true;
        if (!input1.match(pattern)) {
            document.getElementById("demo").textContent = "Your email is not valid"
            check = false;
        }
        if (input2.length < 8) {
            document.getElementById("demo").textContent = "Password must be more than 8 digits"
            check1 = false;
        }

        if (check && check1) {
            /*const fromData = new URLSearchParams();
            fromData.append('username', input1);
            fromData.append('password', input2);*/
            try {
                const response = await fetch('http://127.0.0.1:8000/login-token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    document.getElementById('demo').textContent = errorData.detail || 'An error occurred';
                } else {
                    const result = await response.json();
                    alert('Login Successful!');
                    localStorage.setItem('access_token', result.access_token);
                    localStorage.setItem('user_detail', JSON.stringify(result.user_detail));
                    navigate('/');
                }
            } catch (error) {
                console.error('An error occurred:', error);
                document.getElementById('demo').textContent = 'An unexpected error occurred';
            }
        }
    }

    return (
        <>
            <div className='kamran'>
                <div className="nvbr nvsign">
                    <nav className="navbar navbar-expand-lg  me-lg-4 me-2  ">
                        <button type="button" className="navbar-toggler bg-white bg-light" data-bs-toggle="collapse"
                            data-bs-target="#navmenu">
                            <span className="navbar-toggler-icon "></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navmenu">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item ">
                                    <Link to={"/"} className='nav-link text-dark'>Home</Link>
                                </li>

                                <li className="nav-item">
                                    <Link to={"/login"} className='nav-link text-dark'>Login</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/signup"} className='nav-link text-dark'>Sign Up</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to={"/managment"} className='nav-link text-dark'>Managment</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>

                <div className="box-img container-fluid ">
                    <div className="imag ">
                        <img src={todolist} alt="" className='img-fluid' />
                    </div>
                </div>
                <div className="text-sign">
                    <p className='text-center text-dark'>Welcome back </p>
                    <p className='text-center text-dark'>to</p>
                    <p className='text-center text-dark'> OUR REMINDER</p>
                </div>
                <div className="information">
                    <form action="" onSubmit={login}>
                        <input type="text" placeholder='Enter Your Email' name={input1} value={input1}
                            onChange={(e) => setInput1(e.target.value)}
                            className=' pt-2 pb-2 pr-4 pl-4' />
                        <br />
                        <input type="password" placeholder='Enter Your Password' name={input2} value={input2}
                            onChange={(e) => setInput2(e.target.value)}
                            className=' pt-2 pb-2 pr-4 pl-4' />
                        <p id='demo'></p>
                        <button type='submit' className='mt-4 button-75  '><span class="text">Login  </span></button>
                    </form>
                </div>
                <div className='forgot mt-3'><a href=""> <span>Forgot Password</span></a></div>
            </div>
        </>
    )
}

export default Login;
