import { useNavigate } from "react-router-dom";
import { ProjectForm } from "../components/Projects/ProjectForm";
import { api } from "../api/axios";
import { useAlert } from "../helper/AlertContext/AlertContext";
import { BackButton } from "../components/MiniComponents/BackButton";

export default function CreateProject() {
  const navigate = useNavigate();
  const {showAlert} = useAlert()

  const handleCreate =  (data: any) => {
     api.post("/projects", data)
             .then(res=>{
              console.log(res)
              
              showAlert('info','New Project was created successfuly')
              setTimeout (()=>navigate("/projects"),1000)
             })
             .catch(err=>{
              console.log(err)
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

  return (
    <div className="p-4 ">
      <BackButton />
      <ProjectForm onSubmit={handleCreate} />
    </div>
  );
}
