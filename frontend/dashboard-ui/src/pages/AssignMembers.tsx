import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { MembersSelector } from "../components/MiniComponents/MultiSelector";
import { api } from "../api/axios";
import { useAlert } from "../helper/AlertContext/AlertContext";
import { BackButton } from "../components/MiniComponents/BackButton";

export default function AssignMembers() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {showAlert} = useAlert()
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const handleAssign = async () => {
    try {
      setLoading(true);

       api.patch(`/projects/assign-member`, {
        project_id:id,
        users_ids: selectedIds,
      }).then(res=>{
        setTimeout(()=>
      navigate(`/projects/${id}`),1000)
        showAlert('info',"Memebers Assigned Successfully!!")

      })
      .catch(err=>{
                    if (err.message && Array.isArray(err.message)){
              err.message.map((ele:string)=>showAlert('error',ele))
            }
            else {
              showAlert('error',err.message||'something bad happend')
            }
      })

      

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow space-y-4">
      <BackButton />
      <h2 className="text-lg font-semibold">Assign Members</h2>

      <MembersSelector
        selectedIds={selectedIds}
        onChange={setSelectedIds}
      />

      <button
        onClick={handleAssign}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save Assignment"}
      </button>
    </div>
  );
}
