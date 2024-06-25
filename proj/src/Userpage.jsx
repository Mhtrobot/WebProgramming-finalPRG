import {Component} from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import "./Userpage.css"

function Userpage() {


    return (
        <>
            <div className="header-user">
                <div className="main-user container-fluid">
                    <div className="text-main"><p className='text-dark'>MY TO DO LIST</p></div>

                    <div className='mt-5'>
                        <form action="">
                            <input type="text"/>
                        </form>
                    </div>
                </div>
            </div>
        </>


    )

}


export default Userpage;