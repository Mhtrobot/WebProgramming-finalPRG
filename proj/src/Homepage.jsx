import React, { useEffect } from 'react';
import "./Homepage.css"
import { Link, useNavigate } from 'react-router-dom';
import one from "./image/_2f892213-1ca6-4b95-bff1-1ac56eb41be4.png"
import two from "./image/_c968b9c4-3bd9-4b64-9827-dd4d4a1d53c6.png"
import tree from "./image/12 (Community).png"
import forr from "./image/To-do List Template _ The Conference Room (Community).png"
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';

function Homepage() {
    const navigate = useNavigate();

    useEffect(() => {
        async function tokenChecker() {
            const token = localStorage.getItem('access_token');
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/loged-user', {
                        method: 'GET', // Assuming GET is used based on the FastAPI endpoint
                        headers: {
                            'Content-Type': 'application/json',
                            'token': token
                        }
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        console.error('Error:', errorData.detail || 'An error occurred');
                    } else {
                        const result = await response.json();
                        navigate('/userpage', {state:{
                                userId: result.user_id,
                                name: result.name,
                                rank: result.account_rank,
                                password: result.password
                            }});
                    }
                } catch (error) {
                    console.error('An error occurred:', error);
                }
            }
        }

        tokenChecker();
    }, []);

    return (
        <>
            <div>
                <div className="header">
                    <div className="container-fluid d-flex justify-content-between ">
                        <div className="logo mt-4  ms-3">
                            <img src={tree} alt="" className='test1'/>
                            <span>Planning</span>
                        </div>
                        <div className="nvbr">
                        <Navbar  expand="lg">
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto" id='navmenu'>
              <Nav.Link as={Link} to="/" className='navlink' >Home</Nav.Link>
              <Nav.Link as={Link} to="/signup"  className='navlink'>Sign Up</Nav.Link>
              <Nav.Link   as={Link} to="/login"  className='navlink'>Login</Nav.Link>
             
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
                        </div>
                    </div>

                    <div className="container-fluid test6">
                        <div className="box d-lg-flex justify-lg-content-between p-lg-5 mt-5 mt-lg-0 ">
                            <div className="imgg d-lg-none d-md-block d-none">
                                <img src={forr} alt="" className='img-fluid test3'/>
                            </div>
                            <div className="fg">
                                <div className="text ms-md-4 text-center text-lg-start   ">
                                    <p>To-Do List</p>
                                    <p>Template</p>
                                    <p className="mt-1" id="s1">Enhance individual and team work operations by
                                        effectively organizing, prioritizing, and optimizing tasks using our To-Do List
                                        Template.</p>
                                </div>
                            </div>
                            <div className="imgg d-lg-block  d-none  ">
                                <img src={forr} alt="" className='img-fluid test3'/>
                            </div>
                        </div>
                    </div>
                </div>


                <div className=" container-fluid property1 mt-lg-1 p-lg-5 p-3">
                    <div className="row p-lg-5 p-3">
                        <div
                            className="col-lg-6 col-12  d-lg-flex justify-content-lg-start d-flex justify-content-center">
                            <img src={one} alt="" className='test4'/>
                        </div>
                        <div className="col-lg-6 col-12 d-flex align-items-center mt-lg-0 mt-5 ">
                            <p className=" text-center ">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Beatae provident incidunt harum odit nobis deleniti, fuga nostrum repudiandae?</p>
                        </div>
                    </div>
                </div>
                <div className=" container-fluid property1  p-lg-5 p-3">
                    <div className="row p-lg-5 p-3">
                        <div
                            className="col-lg-6 col-12  d-lg-flex justify-content-lg-start d-flex justify-content-center">
                            <img src={two} alt="" className='test2'/>
                        </div>
                        <div className="col-lg-6 col-12 d-flex align-items-center mt-lg-0 mt-5 ">
                            <p className=" text-center ">Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                                Beatae provident incidunt harum odit nobis deleniti, fuga nostrum repudiandae?</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Homepage;