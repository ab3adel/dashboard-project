
import { useNavigate } from "react-router-dom";

export function BackButton (){
const navigate = useNavigate();

return(
<button
  onClick={() => navigate(-1)}
  className="text-sm text-gray-600 hover:underline my-2"
>
  ← Back
</button>
)
}
