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

export interface ChirpsJoined {
    user_id: number;
    name: string;
    email: string;
    content?: string;
    id?: number;
    location?: string;
    _created?: string;   
}