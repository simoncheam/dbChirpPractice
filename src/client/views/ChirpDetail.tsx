import * as React from 'react';
import { useState, useEffect } from "react";
import {useParams, useHistory, Link} from "react-router-dom";

import { ChirpsJoined } from "../client_types";


const ChirpDetail = () =>{

    const {chirp_id} = useParams<{chirp_id: string}>();
    const [chirp, setChirp] = useState<ChirpsJoined>();
    
    const {goBack} = useHistory();

   
        useEffect(()=>{
            fetch(`/api/chirps/${chirp_id}`)
                .then(res=>res.json())
                .then((data: ChirpsJoined)=>{
                    
                    setChirp(data);
                    
                })
                .catch(error => {
                    console.log(error);
                });
                
            },[])
                
            if(!chirp ){ return <h1>Loading...</h1>}
            
            
            return (

            <div className="row justify-content-center">
                <h1 className="display-3 m-3">👋 Chirp Detail Page!🐦 </h1>

                    <div className="container">
                        <div className="card col-12 col-md-6 shadow-lg m-3">
                   
                                    <div  className="card-header">
                                        @{chirp.name}   
                                    </div>                                       
                                                                
                            <div className="card-body">
                                <h5 className="card-title">"{chirp.content}"</h5>
                            </div>

                            <div className="card-footer">
                            Posted from: {chirp.location} 
                            <p>
                            {chirp._created}
                            </p>

                                
                                <div>

                                    <div onClick={goBack} className="btn mx-2 btn-primary">
                                    Go Back?
                                    </div>
                                    <Link to ={`/chirps/${chirp.id}/edit`} className="btn mx-2 btn-warning">
                                        Edit?
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        );
}



export default ChirpDetail;