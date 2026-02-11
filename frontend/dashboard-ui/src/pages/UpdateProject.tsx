import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/Projects/ProjectForm";
import { api } from "../api/axios";
import { useAlert } from "../helper/AlertContext/AlertContext";
import { BackButton } from "../components/MiniComponents/BackButton";

export default function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showAlert} = useAlert()
  const [project, setProject] = useState<any>(null);

  useEffect(() => {
    api.get(`/projects/${id}`)
    .then(res => {
      setProject(res.data);
      
    }).catch(err=>{
      if (err.message && Array.isArray(err.message)){
        err.message.map((ele:string)=>
          showAlert('error',ele)
        )
      }
    })
  }, [id]);

  const handleUpdate = async (data: any) => {
     api.patch(`/projects/${id}`, data)
             .then(res=>{
              if (res) {
                showAlert('info','Project was updated successfully')
                setTimeout (()=>navigate("/projects"),1000)
              }
             }).catch(err=>{
      if (err.message && Array.isArray(err.message)){
        err.message.map((ele:string)=>
          showAlert('error',ele)
        )
      }
       else {
      showAlert('error', err.message || 'Update failed');
    }
    })
             
   
  
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <BackButton />
      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
      />
    </div>
  );
}
