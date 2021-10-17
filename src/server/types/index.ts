export interface MySQL_Default_Response {
    insertId:number;  //Q: what is the rationale to use this?
    affectedRows: number;
}

export interface Users {
    id?: number;
    name: string;
    email?: string;
    password?: string;
    _created?: string 
}

export interface Chirps {
    id?: number;
    content?: string;
    location?: string;
    _created?: string;
    userid: Users["id"]   
}

// old Chirps prop= user_id: Users["id"] ,  userid: string;
