import * as mysql from "mysql";
import {database_config} from "../config";
import {MySQL_Default_Response} from "../types";



const connection_to_db = mysql.createPool(database_config);

// we can pass in a Type to MySql function if we want, so we can specify Promise's return Type in the event we select data

// If we DON'T pass in a Type, the function willl still get a default value of our MySQL_Default_Response
export const TalkToMySQL = <TypeThatIMightProvide = MySQL_Default_Response>(sql_string: string, values?: unknown[]) => { 
    
    return new Promise<TypeThatIMightProvide>((resolve, reject)=>{

        const formatted_sql = mysql.format(sql_string, values);  
        
        // use this to debug and hone in on issue
        console.log({formatted_sql});

        connection_to_db.query(formatted_sql, (err, results)=>{
            if(err){
                reject(err);
            } else {
                resolve(results);
            }
        } )
    })
}
