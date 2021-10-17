import userz from '../database/queries/users' //importing SQL query
import * as express from 'express';
import { Users } from '../types';

const router = express.Router();


router.get('/', async (req,res) => {

    try {
        const all_users = await userz.get_all();
        //res.status(200).json({message: `get all items lol`});
        res.status(200).json(all_users);
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//get one

router.get('/:id', async (req,res) => {
    const id = req.params.id;

    try {
        const [one_user] = await userz.get_one_by_id(Number(id));
        
        //error handling
        if(!one_user){
            res.status(404).json({message:"User not found!"})

        } else{
            res.status(200).json(one_user);
        }


    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//create post-- need id and email

router.post('/', async (req,res) => {

    const {id ,name, email}: Users =req.body;

    if(!name || !email){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const chirpResultz = await userz.create({id,name,email}); //Q: is this appropriate?

        res.status(201).json({message: "Created Chirp lol", id: chirpResultz.insertId}); /// Q: ??? I don't fully understand this (id: resultz.insertId)
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }

} );


//PUT

router.put('/:id', async (req,res) => {
    const id = Number(req.params.id);
    const {name, email }:Users =req.body;  //object = types of chirps

    if(!name || !email){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const resultz = await userz.update({id ,name, email}, id);
        res.status(201).json({message: "Updated User!"});
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
    }
} );

//DELETE

router.delete('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    try {
        await userz.destroy(id)
        res.status(200).json({message: "Deleted User!"});
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})


export default router;