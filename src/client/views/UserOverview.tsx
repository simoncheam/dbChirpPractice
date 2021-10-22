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

        
            <ul className="justify-content-center list-group m-5">
                {users.map(user=>(
                    <Link to={`/users/${user.id}`} className="list-group-item" key={`user-${user.id}`}>
                        {user.name},{user.email},{user.id}, {user._created}
                    </Link>
                ))}

            </ul>

            <Link to ={`/createUser`} className="btn m-2 btn-warning">
                        Not a Chirpr Member? Join the fam today!
            </Link>

            </div>
        </div>
    )
};

export default UserOverview;