import { Component } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom';
import todolist from "./image/Done.png"
import  "./signup.css"
import React, {useState} from 'react';
const Signup=()=>{
let [input1,setInput1]=useState("")
let [input2,setInput2]=useState("")

  function security(e){
  let pattern=/[A-Za-z]+(.)+@(.)+[.][a-z]+/g;
     let check=true;
     let check1=true;
    if(!input1.match(pattern)){
document.getElementById("demo").textContent="Your email is not valid"
      check=false;
    }
   if(input2.length<8){
    document.getElementById("demo").textContent="Password must be more than 8 digits"
  check1=false; 
  }
  if(check && check1){
    alert("Submit")
  }
  e.preventDefault()
};  
    
      


return(
<>
<div className='kamran'>
<div className="nvbr nvsign">  
<nav className="navbar navbar-expand-lg  me-lg-4 me-2  ">
  <button type="button"  className="navbar-toggler bg-white bg-light"   data-bs-toggle="collapse"       data-bs-target="#navmenu"  >
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
  <p className='text-center text-dark'>Gets things done </p>
  <p className='text-center text-dark'>with TODO</p>
  <p className='text-center text-dark'> Lets help you meet up your tasks</p>
</div>

<div className="information">
<form action="" onSubmit={security} >
<input type="text"  placeholder='Enter Your Email'onChange={(e)=>setInput1(e.target.value)} className=' pt-2 pb-2 pr-4 pl-4' />
<br />
<input type="text" placeholder='Enter Your Password' onChange={(e)=>setInput2(e.target.value)}  className=' pt-2 pb-2 pr-4 pl-4' />
<p id='demo' ></p>
<button type='submit' className='mt-5 button-75  '> <span class="text">Sign Up</span> </button>

</form>
</div>

</div>



</>



)

}


export default Signup;


