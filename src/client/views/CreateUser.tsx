import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router';
import { Users, ChirpsJoined } from "../client_types";


const CreateUser = () => {

    const {goBack} = useHistory();
    const hist = useHistory();

   const [users, setUsers] =useState<Users[]>([]);

   //set User State: (name, email, password)
   const [user_name, setUser_name]= useState("");
   const [user_email, setUser_email]= useState("");
   const [user_password, setUser_password]= useState("");


/*

new user input needed:
    
    name: string;
    email?: string;
    password?: string;
*/

    const handleSubmitButton = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        if(!user_name|| !user_email || !user_password) return alert('Fill out the god damn fields!')


        fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: user_name, email: user_email, password: user_password  }) // ----------------- need to add values
        })
            .then(res=>res.json()) // returning parsed metadata
            .then(data=> {
            hist.push(`/overview`)
            

        })
        .catch(these_hands => {
            
            console.log(these_hands)
            console.log('Input not valid, please check your creditials and try again!');
            //hist.push(`/createUser`)
            alert('Input not valid, please check your creditials and try again!')
            
        })

    };


return(
    <>
        <div className="row m-5 justify-content-center">

    
        <h1 className="display-3 m-3 text-center">👋 Welcome to the Nest! 🐦 </h1>
        <p className="display-6 m-3 text-center">Create Your Chirper Account Below...</p>

        {/* remove for, change to htmlfor */}
        <div className="row mt-5 justify-content-center ">

            <div className="form-group col-6">
                <input type="text" className="form-control" placeholder = "Username" value={user_name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser_name(e.target.value)}/>

                
                
                <input type="text" className="form-control" placeholder = "email" value={user_email} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser_email(e.target.value)}/>

                
                <input type="password" className="form-control" placeholder = "password" value={user_password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser_password(e.target.value)}/>

                <p> We promise to keep your information safe(kinda)😜</p>


            {/* <div onClick={goBack} className="btn m-2 btn-primary">
                Go Back?
            </div> */}

            <button onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Create Account!</button>
            </div>


            </div>

       
                

       </div>

</>
);

}

export default CreateUser;
