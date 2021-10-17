import {TalkToMySQL} from "../index";
import {Chirps} from "../../types"; 

// All functions that interact with SQL DB go here:

const get_all = () => TalkToMySQL<Chirps[]>("SELECT * FROM Chirps");

const get_one_by_id = (id:number) => TalkToMySQL<Chirps[]>("SELECT * FROM Chirps WHERE id=?",[id]);

const create = (new_chirp: Chirps) => TalkToMySQL('INSERT INTO Chirps SET ?', [new_chirp]);

const update = (chirp: Chirps, id: Chirps['id']) => TalkToMySQL("UPDATE Chirps SET ? WHERE id=?", [chirp, id]);

const destroy = (id: Chirps['id']) => TalkToMySQL("DELETE FROM Chirps WHERE id=?", [id]);




export default {
    get_all,
    get_one_by_id,
    create,
    update, 
    destroy

};