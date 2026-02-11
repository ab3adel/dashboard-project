 import type { User } from "../../helper/interfaces";
import { RoleBadge } from "./RoleBadge";


export function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="text-sm text-gray-500">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}

export function UsersInfo ({
  info
}:{info:User[]}){

  return (
    <div>
       <div className="text-sm text-gray-500">Users</div>
       <div className="grid grid-cols-2 gab-1">
        {
          info.map((ele,index)=> 
            <div key={index}>
            <div className="font-medium">{ele.name}</div>
            <RoleBadge role={ele.role}/>
            </div>
            
          )
        }
       </div>
     
    </div>
  )
}