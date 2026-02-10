

export type role = 'admin' | 'member'
export interface User {
    name:string ,
    id:number ,
    email:string,
    role:role
}