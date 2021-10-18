import * as React from 'react';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import {Link} from "react-router-dom";
import {Users } from "../client_types";


// Start with User Overview

const Overview = () =>{

    const [users, setUsers] =useState<Users[]>([]);

    useEffect(()=>{

        fetch('/api/users')
        .then(res=>res.json())
        .then(u=>setUsers(u))
        .catch(e=>console.log(e))
    },[]);

    return(

        <div>
            <h1 className="justify-content-center display-1 text-secondary"> All Users</h1>

        
            <ul className="justify-content-center list-group m-5">
                {users.map(user=>(
                    <Link to={`/overview/${user.id}`} className="list-group-item" key={`user-${user.id}`}>
                        {user.name},{user.email},{user.id}, {user._created}
                    </Link>
                ))}

            </ul>
        </div>
    )
};

export default Overview;