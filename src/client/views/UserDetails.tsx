import * as React from 'react';
import { useState, useEffect } from 'react';
import {Link, useHistory, useParams} from "react-router-dom";
import {Users } from "../client_types";

const UserDetails = () => {

    const {user_id}=useParams<{user_id: string}>();

    const [user, setUser] = useState<Users>(null);
    const {goBack} = useHistory();

    useEffect(()=>{

        fetch(`/api/users/${user_id}`)
        .then(res=>res.json())
        .then(u=>setUser(u))
        .catch(e=>console.log(e))
    },[]);

    return (

        <div className="row mt-5 justify-content-center">

            <div className="col-md-8">
            <h1 className="justify-content-center display-1 text-secondary"> User Details</h1>

                <div className="card shadow-lg">
                    
                    {/* HEADER */}
                    <div className="card-header">
                        Name: {user?.name}
                    </div>
                    {/* BODY */}
                    <div className="card-body">
                        <p> Email: <em>{user?.email}</em></p>
                        <p> Created at: <em>{user?._created}</em></p>
                        

                    </div>
                    <div className="card-footer">

                        <div onClick={goBack} className="btn mx-2 btn-danger">
                            Go Back?
                        </div>
                        
                        {/* <Link to ={`/overview/${user_id}/edit`} className="btn mx-2 btn-warning">
                            Edit User
                        </Link> */}


                    </div>
                </div>
            </div>
        </div>




    )






};

export default UserDetails;