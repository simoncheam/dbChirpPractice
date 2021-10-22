import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router';
import {useHistory} from 'react-router';
import { Users, ChirpsJoined } from "../client_types";
import {Link} from "react-router-dom";


const Create = ()=> {


   const {goBack} = useHistory();
   const hist = useHistory();

   
   //set Chirp State:
   const [chirps, setChirps] = useState<ChirpsJoined[]>([]);
   
   const [chirp_content, setChirpContent]= useState("");
   const [chirp_location, setChirpLocation]= useState("");
   
   
   //set User State: (name, email, password)
   const [users, setUsers] =useState<Users[]>([]);
   const [selectedUserId, setSelectedUserId]= useState(0);

   const [user_name, setUser_name]= useState("");
   const [user_password, setUser_password]= useState("");



// useEffect
useEffect(()=>{
        fetch(`/api/chirps`)
            .then(res=>res.json())
            .then(data=>{
                setChirps(data)

            })
            .catch(error => {
                console.log(error);
            });

            fetch('/api/users')
                .then(res=>res.json())
                .then((u)=> {
                    setUsers(u)  
                   
                })
                .catch(e=>console.log(e))

        
},[]);

        const handleUsernameSelectUpdate = (e:React.ChangeEvent<HTMLSelectElement>) =>{
                console.log(e.target);
                setSelectedUserId(Number(e.target.value))
            };


        if(!chirps.length ){
                <h1>Loading...</h1>
            }


            const handleSubmitButton = (newChirp: React.MouseEvent<HTMLButtonElement>)=>{
                newChirp.preventDefault();

                if(!chirp_content|| !selectedUserId || !chirp_location) return alert('Fill out the god damn fields!')

               
                fetch("/api/chirps", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({userid: selectedUserId, content: chirp_content, location:chirp_location, password: user_password }) 
                })
                    .then(res=>res.json()) 
                    .then(data=> {
                    hist.push(`/`)
                    console.log(data);

                })
                .catch(these_hands => console.log(these_hands))
            };




return(

<>

<h1 className="display-3 m-3 text-center">👋 Create Your Chirp!🐦 </h1>

        <div className="row mt-5 justify-content-center">
                <div className="form-group col-6">

                       

                        {/* SELECT USERNAME from dropdown */}
                        <label > Username: </label>
                        <select onChange={handleUsernameSelectUpdate} className="form-control m-2">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="basic-addon1">@</span>
                        </div>
                                <option value={0}> Select Your Name</option>

                                {users.map(u=>(
                                        <option key={`user-option-${u.id}`} value={u.id}>
                                                {u.name}
                                        </option>
                                ))}
                        </select>

                        

                        <input type="password" className="form-control m-2" placeholder = "enter your secret password..." value={user_password} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setUser_password(e.target.value)}/>

                        <div className="form-control input-group-text m-2"  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChirpContent(e.target.value)} >
                            
                            <textarea className="form-control input-group-text" value={chirp_content} placeholder = "Write your Chirp here..."  ></textarea>
                        </div>


                        <input type="text" className="form-control m-2" placeholder = "Where are you writing from today? (your city, your toilet etc.)..." value={chirp_location} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChirpLocation(e.target.value)}/>





                    <div onClick={goBack} className="btn m-2 btn-primary">
                            Go Back?
                    </div>
                    <button onClick={handleSubmitButton} className="btn btn-primary m-2 shadow ">Click to Chirp!</button>

                    <Link to ={`/createUser`} className="btn mx-2 btn-warning">
                        Not a Chirpr Member? Join the fam today!
                    </Link>

                </div>

        </div>







</>

);
}

export default Create;
