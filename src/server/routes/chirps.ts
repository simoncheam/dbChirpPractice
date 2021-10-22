import chirpz from '../database/queries/chirps' //importing SQL query
import userz from '../database/queries/users' //importing SQL query
import * as express from 'express';
import { Chirps, Users } from '../types';
import users from '../database/queries/users';

const router = express.Router();


router.get('/', async (req,res) => {

    try {
        const all_chirps = await chirpz.get_all();
        
        res.status(200).json(all_chirps);
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//get one

router.get('/:id', async (req,res) => {
    const id = req.params.id;

    try {
        const [one_chirp] = await chirpz.get_one_by_id(Number(id));
        
        //error handling
        if(!one_chirp){
            res.status(404).json({message:"Chirp not found!"})

        } else{
            res.status(200).json(one_chirp);
        }


    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//create post-- need id and content

router.post('/', async (req,res) => {

    const {userid, content, location, password } =req.body;
    const [user] = await userz.get_one_by_id(userid)

    if(!userid || !content || !location){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {

        if(password === user.password){
            console.log('PW match!');
            
            const chirpResultz = await chirpz.create({ userid,content,location }); 
            res.status(201).json({message: "Created Chirp lol", id: chirpResultz.insertId}); 
        } 
        if(password !== user.password){
            alert("Wrong Password!")
            return res.status(400).json({message:"Wrong Password!"})
        }



        // this is where Mention logic
        /*
        const splits = content.split('@')
        */

        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
        console.log("Wrong Password!")
    }

} );


//PUT

router.put('/:id', async (req,res) => {
    const id = Number(req.params.id);
    const {userid, content, location }:Chirps =req.body;  //object = types of chirps

    if(!userid || !content || !location){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await chirpz.update({userid, content, location }, id);
        res.status(201).json({message: "Updated Chirp!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );

//DELETE

router.delete('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    try {
        await chirpz.destroy(id)
        res.status(200).json({message: "Deleted Chirp!"}); // need to use status 200 for hist.push to work
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})


export default router;