import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import {Link} from "react-router-dom";
import {Users } from "../client_types";


// Start with User UserOverview

const UserOverview = () =>{

    const [users, setUsers] =useState<Users[]>([]);

    useEffect(()=>{

        fetch('/api/users')
        .then(res=>res.json())
        .then(u=>setUsers(u))
        .catch(e=>console.log(e))
    },[]);

    return(

        <div className="row mt-5 justify-content-center">

            <div className="col-md-8">

            <h1 className="justify-content-center display-1 text-secondary"> VIP Chirpr Members</h1>
            <div className="justify-content-center">

                <Link to ={`/createUser`} className=" text-center btn m-2 btn-success ">
                            Not a Chirpr Member? Join the fam today!
                </Link>
            </div>

        
            <ul className="justify-content-center list-group m-5">
                {users.map(user=>(
                    <Link to={`/users/${user.id}`} className="list-group-item" key={`user-${user.id}`}>

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

                                </div>
                        </div>

                    </Link>
                ))}

            </ul>

            <Link to ={`/createUser`} className="btn m-2 btn-success justify-content-center">
                        Not a Chirpr Member? Join the fam today!
            </Link>

            </div>
        </div>
    )
};

export default UserOverview;