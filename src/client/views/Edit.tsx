import * as React from 'react';
import {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import { database_config } from '../../server/config';
import { Users, ChirpsJoined } from "../client_types";
import {useHistory} from 'react-router';


const Edit = ()=> {

        const [user, setUser] = useState<string>("");
        const [chirp, setChirp] = useState<ChirpsJoined>();


        const hist = useHistory();
        const {goBack} = useHistory();

        const {chirp_id} = useParams<{ chirp_id: string}>();  //this gets ID


        //User - selected ID state:
        const [selectedUserId, setSelectedUserId]= useState(0);
        
        
        //set Chirp State:
        const [chirp_content, setChirpContent]= useState("");
        const [chirp_location, setChirpLocation]= useState("");
        const [chirp_time, setChirpTime]= useState("");




        // const handleUpdate
        // note: users cannot change username once account is created


        const handleUpdate =(e: React.MouseEvent<HTMLButtonElement>)=> {
                e.preventDefault()

                if(!chirp_content) return alert('Fill out the god damn fields!')

                fetch(`/api/chirps/${chirp_id}`,{
                        method: 'PUT',
                        headers: {
                                "Content-Type": "application/json"
                        },
                        body: JSON.stringify({userid: selectedUserId, content: chirp_content, location:chirp_location })
                })
                .then(res => res.json())
                .then(data=>{
                        hist.push(`/chirps/${chirp_id}`)
                        console.log(data);
                })
                .catch(e=>console.log(e))
        }

        
// const handleDelete

const handleDelete = (e: React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault();

        if(confirm('Are you sure?')){
                console.log('delete chirp confirmed');
        }

                fetch(`/api/chirps/${chirp_id}`,{
                        method: "DELETE",
                })
                .then(res=>res.json())
                .then(()=>{
                        hist.push(`/`) 
                        
                })
                .catch(e=>console.log(e))

}

    
        useEffect(()=>{

                fetch(`/api/chirps/${chirp_id}`)
                .then(res=>res.json())
                .then((data: ChirpsJoined)=>{

                        setChirp(data)
                        setUser(data.name)
                        setSelectedUserId(data.user_id);
                        setChirpContent(data.content)
                        setChirpLocation(data.location)
                        setChirpTime(data._created)
                
                })
                .catch(e=>console.log(e))

        },[]);

        if(!chirp ){<h1>Loading...</h1>}


return(

<>

<h1 className="display-3 m-3">👋 Hey {user}! Here's your Chirp...</h1>

<div className="row mt-5 justify-content-center">

        <div className="form-group col-6">

        <label > Add your updates below: </label>    
                <div className="form-control input-group-text m-2"  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChirpContent(e.target.value)} >
                        <textarea className="form-control input-group-text" value={chirp_content} placeholder = {chirp_content}  ></textarea>
                </div>

        <label > From (Your Location): </label> 

                <input type="text" className="form-control m-2" placeholder = "Where are you writing from today?..." value={chirp_location} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setChirpLocation(e.target.value)}/>

        <label > Last Update: </label>
                        <p> {chirp_time}</p>

                {/* Buttons */}

                        <div className="m-2">
                                <div onClick={goBack} className="btn mx-2 btn-primary">Go Back?</div>
                                <button onClick={handleDelete} className="btn mx-2 btn-danger">Delete!</button>
                                <button onClick ={handleUpdate} className="btn btn-Success">Save Updates!</button>
                        </div>
                </div>

</div>

</>

);
}

export default Edit;
