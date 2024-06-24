import React, { useState } from 'react';
import    "./Homepage.css"
import { Link,useNavigate } from 'react-router-dom';
import one from "./image/_2f892213-1ca6-4b95-bff1-1ac56eb41be4.png"
import two from "./image/_c968b9c4-3bd9-4b64-9827-dd4d4a1d53c6.png"
import tree from "./image/12 (Community).png"
import forr from "./image/To-do List Template _ The Conference Room (Community).png"


function Homepage() {
  return (
        <>
        <div >
<div className="header">
  <div className="container-fluid d-flex justify-content-between ">
    <div className="logo mt-4  ms-3">
<img src={tree} alt=""  className='test1'/>
<span>Planning</span>
</div>
<div className="nvbr">  
<nav className="navbar navbar-expand-lg mt-4 me-lg-4 me-2 ">
  <button type="button"  className="navbar-toggler bg-white bg-light"   data-bs-toggle="collapse"       data-bs-target="#navmenu"  >
      <span className="navbar-toggler-icon "></span>
    </button>
    <div className="collapse navbar-collapse" id="navmenu">  
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link to={"/"} className='nav-link'>Home</Link>
        </li>
       
        <li className="nav-item">
        <Link to={"/login"} className='nav-link'>Login</Link>
        </li>
        <li className="nav-item">
        <Link to={"/signup"} className='nav-link'>Sign Up</Link>
        </li>
        <li className="nav-item">
        <Link to={"/userpage"} className='nav-link'>Managment</Link>
        </li>       
      </ul>
    </div>
  </nav>
</div>
</div>

<div className="container-fluid test6" >
  <div className="box d-lg-flex justify-lg-content-between p-lg-5 mt-5 mt-lg-0 ">
    <div className="imgg d-lg-none d-md-block d-none">
<img src={forr} alt="" className='img-fluid test3' />
    </div>
    <div className="fg" >
    <div className="text ms-md-4 text-center text-lg-start   " >
      <p>To-Do List</p>
      <p>Template</p>
      <p className="mt-1" id="s1">Enhance individual and team work operations by effectively organizing, prioritizing, and optimizing tasks using our To-Do List Template.</p>
    </div>
    </div>
    <div className="imgg d-lg-block  d-none  ">
<img src={forr} alt="" className='img-fluid test3' />
    </div>
  </div>
  </div>
</div>


  <div className=  " container-fluid property1 mt-lg-1 p-lg-5 p-3">
    <div className="row p-lg-5 p-3">
      <div className="col-lg-6 col-12  d-lg-flex justify-content-lg-start d-flex justify-content-center" >
<img src={one} alt=""  className='test4'/>
      </div>
      <div className="col-lg-6 col-12 d-flex align-items-center mt-lg-0 mt-5 " >
        <p className=" text-center ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae provident incidunt harum odit nobis deleniti, fuga nostrum repudiandae?</p>
      </div>
    </div>
  </div>
  <div className=  " container-fluid property1  p-lg-5 p-3">
  <div className="row p-lg-5 p-3">
    <div className="col-lg-6 col-12  d-lg-flex justify-content-lg-start d-flex justify-content-center" >
<img src={two} alt="" className='test2' />
    </div>
    <div className="col-lg-6 col-12 d-flex align-items-center mt-lg-0 mt-5 " >
      <p className=" text-center ">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae provident incidunt harum odit nobis deleniti, fuga nostrum repudiandae?</p>
    </div>
  </div>
</div>
</div>
        </>
)
}
export default Homepage;