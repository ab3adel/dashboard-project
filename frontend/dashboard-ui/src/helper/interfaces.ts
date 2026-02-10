

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

export type AlertType = 'success' | 'error' | 'info' | 'warning';

export type Alert = {
  id: string;
  type: AlertType;
  message: string;
};