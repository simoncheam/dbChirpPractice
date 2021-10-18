import * as React from 'react';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import {Chirps, Users } from "../client_types";


const Home = () =>{

    const [chirps, setChirps] = useState<Chirps[]>([]);
    const [users, setUsers] =useState<Users[]>([]);

        useEffect(()=>{
            fetch(`/api/chirps`)
                .then(res=>res.json())
                .then(data=>{
                    setChirps(data)

                    if(!chirps.length ||!users.length){
                        <h1>Loading...</h1>
                    }
                })
                .catch(error => {
                    console.log(error);
                });

            fetch('/api/users')
                .then(res=>res.json())
                .then(u=>setUsers(u))
                .catch(e=>console.log(e))




        },[])


        return (

            <div className="row justify-content-center">

                <h1 className="display-3 m-3">👋 Welcome To Chirp It Up, Full Stack Style!🐦 </h1>

                {chirps.map(chirp=>(

                    
                    <div key={chirp.id} className="container">
                        <div className="card col-12 col-md-6 shadow-lg m-3">

                                {/* {users.map((user,chirp)=>( */}
                                {/* need to use Chirp's userid for user */}
                            {users.filter((user, {chirp.userid}) =>(
                                    <div key = {user.id} className="card-header">
                                        @ {user.name} 
                                        
                                    </div>
                                        ))}
                                    
                                    

                                {/* ))} */}
                                
                            <div className="card-body">
                                <h5 className="card-title">"{chirp.content}</h5>
                            </div>
                            <div className="card-footer">
                            Posted from: {chirp.location} at {chirp._created}
                                {/* <div onClick={goBack} className="btn mx-2 btn-danger">
                                    Go Back?
                                </div> */}
                                
                                <Link to ={`/chirps/${chirp.id}/`} className="btn mx-2 btn-warning">
                                    Admin Options
                                </Link>


                            </div>

                        </div>

                    </div>




                ))}

            </div>

        );





}



export default Home;