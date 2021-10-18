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