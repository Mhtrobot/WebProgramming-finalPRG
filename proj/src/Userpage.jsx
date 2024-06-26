import {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import "./Userpage.css"

function Userpage() {
let [title,setTitle]=useState("");
let [list,setList]=useState([]);
function add(e){
    e.preventDefault();
    let text={status:false,text:title}
    setList([...list,text])

}
    return (
        <>
            <div className="header-user">
                <div className="main-user container-fluid">
                    <div className="text-main"><p className='text-dark'>MY TO DO LIST</p></div>

                    <div className='mt-5'>
                        <form action="" onSubmit={add}>
                            <div className="boxform">        
                
                      <input type="text" id='todolist' placeholder='Enter Your Todo List' onChange={(e)=>setTitle(e.target.value)}/>
            <button type='submit'>Save</button>
            </div>
                        </form >
                    </div>
                    <div className="counter d-flex mt-3">
                    <p className='mr-5'>Tope Done   : {} </p>  
                    <p className='ml-5' >Todo On Progress : {} </p> 
                    </div>
                    <div className="list">
                        <ul>    
                  
                    {
                        
            list.map((value,index)=>(
                <div className='d-flex '>
       <li key={index} >{
        value.text
       }
                   </li>
                </div>
                ))
                     }
                        </ul>
                    </div>
                </div>
            </div>
        </>


    )

}


export default Userpage;