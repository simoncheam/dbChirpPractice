import {TalkToMySQL} from "../index";
import {Chirps, ChirpsJoined} from "../../types"; 

// All functions that interact with SQL DB go here:

const get_all = () => TalkToMySQL<ChirpsJoined[]>(
    `SELECT u.id as user_id, u.name, u.email, c.content as content,c.id, c.location as location, c._created 
    FROM Users u JOIN Chirps c 
    ON u.id = c.userid ORDER BY c._created DESC`);

   
// original: const get_one_by_id = (id:number) => TalkToMySQL<Chirps[]>("SELECT * FROM Chirps WHERE id=?",[id]);

    const get_one_by_id = (id:number) => TalkToMySQL<ChirpsJoined[]>(
        `SELECT u.id as user_id, u.name, u.email, c.content as content,c.id, c.location as location, c._created 
    FROM Users u JOIN Chirps c 
    ON u.id = c.userid WHERE c.id=?`,[id]);

// return all chirps by specific user; (Where u.id =?), similar as above query


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