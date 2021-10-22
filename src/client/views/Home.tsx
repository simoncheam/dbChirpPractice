import * as React from 'react';
import { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import { ChirpsJoined } from "../client_types";


const Home = () =>{

    const [chirps, setChirps] = useState<ChirpsJoined[]>([]);

        useEffect(()=>{
            fetch(`/api/chirps`)
                .then(res=>res.json())
                .then(data=>{
                    setChirps(data)
                })
                .catch(error => {
                    console.log(error);
                });

            
                

            },[])
            
            if(!chirps.length ){
                <h1>Loading...</h1>
            }

        return (

            <div className="row justify-content-center">

                <h1 className="display-3 m-3">👋 Chirp It Up, Full Stack Style!🐦 </h1>


            {/* // reverse(). */}

                {chirps.map(chirp=>(
                    
                    <div key={chirp.id} className="container">
                        <div className="card col-12 col-md-6 shadow-lg m-3">

                                {/* {users.map((user,chirp)=>( */}
                                {/* need to use Chirp's userid for user */}
                           
                                    <div  className="card-header">
                                        @{chirp.name}  
                                    </div>                                       
                                                                    
                                
                            <div className="card-body">
                                <h5 className="card-title">"{chirp.content}"</h5>
                            </div>
                            <div className="card-footer">
                                <p>
                                    Posted from: {chirp.location} 
                                </p>
                                <p>{chirp._created}</p>
                                
                                
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