import {TalkToMySQL} from "../index";
import {Users} from "../../types"; 

// All functions that interact with SQL DB go here:

const get_all = () => TalkToMySQL<Users[]>("SELECT * FROM Users");

const get_one_by_id = (id:number) => TalkToMySQL<Users[]>("SELECT * FROM Users WHERE id=?",[id]);

const create = (new_user: Users) => TalkToMySQL('INSERT INTO Users SET ?', [new_user]);

const update = (user: Users, id: Users['id']) => TalkToMySQL("UPDATE Users SET ? WHERE id=?", [user, id]);

const destroy = (id: Users['id']) => TalkToMySQL("DELETE FROM Users WHERE id=?", [id]);




export default {
    get_all,
    get_one_by_id,
    create,
    update, 
    destroy

};