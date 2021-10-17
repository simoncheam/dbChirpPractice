import chirpz from '../database/queries/chirps' //importing SQL query
import * as express from 'express';
import { Chirps } from '../types';

const router = express.Router();


router.get('/', async (req,res) => {

    try {
        const all_chirps = await chirpz.get_all();
        //res.status(200).json({message: `get all items lol`});
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

    const {userid, content, location}: Chirps =req.body;

    if(!userid || !content || !location){  // input validation
        return res.status(400).json({message:"Fill out everything!"})
    }

    try {
        const chirpResultz = await chirpz.create({ userid,content,location }); //Q: is this appropriate?

        res.status(201).json({message: "Created Chirp lol", id: chirpResultz.insertId}); /// Q: ??? I don't fully understand this (id: resultz.insertId)
        
    } catch (error) {
        res.status(500).json({message: "A server errors occurred", error: error.sqlMessage});
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
        res.status(204).json({message: "Deleted Chirp!"});
        
    } catch (error) {
        res.status(500).json({message: "A server error occurred", error: error.sqlMessage});
    }
})


export default router;