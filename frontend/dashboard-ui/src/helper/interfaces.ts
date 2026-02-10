

export type role = 'admin' | 'member'
export type status = 'on hold' | 'active' |'completed'
export interface User {
    name:string ,
    id:number ,
    email:string,
    role:role
}

export interface Project {

    name:string ,
    id:number , 
    budget:number , 
    deadline:string ,
    users:User[],
    status:status
}