import { useEffect, useState } from "react";
import { api } from "../../api/axios";
import { useAlert } from "../../helper/AlertContext/AlertContext";

interface User {
  id: number;
  name: string;
  email: string;
}

interface Props {
  selectedIds: number[];
  onChange: (ids: number[]) => void;
}

export function MembersSelector({ selectedIds, onChange }: Props) {
  const [users, setUsers] = useState<User[]>([]);
  const {showAlert} = useAlert()

  useEffect(() => {
    api.get("/user").then(res => {
      setUsers(res.data);
    }).catch(err=>{
        if (err.message && Array.isArray(err.message)){
            showAlert('error',err.message)
        }
        else {
            showAlert('error',err.message || 'something bad happened')
        }
    })
  }, []);

  const toggleUser = (id: number) => {
    if (selectedIds.includes(id)) {
      onChange(selectedIds.filter(u => u !== id));
    } else {
      onChange([...selectedIds, id]);
    }
  };

  return (
    <div className="border rounded p-4 max-h-60 overflow-y-auto space-y-2">
      {users.map(user => (
        <label
          key={user.id}
          className="flex items-center gap-2 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selectedIds.includes(user.id)}
            onChange={() => toggleUser(user.id)}
          />
          <span className="text-sm">
            {user.name} ({user.email})
          </span>
        </label>
      ))}
    </div>
  );
}
