import { useState } from "react";
import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/InputField";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
  const [apiname, setApiname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [endpoint, setEndpoint] = useState("");
  const [status, setStatus] = useState(false);
    const [loading,setLoading]=useState(false);

    const navigate = useNavigate();
  const publish = async () => {
    try { setLoading(true);
       const response = await axios.post(
  "https://apivault-api.senchasuraj96.workers.dev/api/v1/admin/Url/createUrl",
  {
    name: apiname,
    description,
    endpoint,
    price:parseInt(price, 10),
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }
);
     setLoading(false);

    if(response){
        setStatus(true);
        
    }
    } catch (error) {
        
        setStatus(false);
        setLoading(false);
        navigate("/error");
    }
   
  };
  if(loading){
    return (
        <div>
            Loading...
        </div>
    )
  }
  if(status){
    return (
        <div>
            Your Api is Published Successfully 
      
        </div>
    )
  }
  return (
    <div className="min-h-screen w-lvw bg-[#07090d] text-amber-50 flex items-center ">
      <div className="h-lvh w-180 gap-10 pt-30 rounded-2xl bg-[#0f141b] p-8 flex flex-col items-center">
        <InputField
          label="Api Name"
          placeholder="Api Name"
          onChange={(e) => {
            setApiname(e.target.value);
          }}
        />
        <InputField
          label="Description"
          placeholder="Description"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <InputField
          label="Price"
          placeholder="Price in Rs."
          onChange={(e) => {
            setPrice(e.target.value);
          }}
        />
        <InputField
          label="EndPoint"
          placeholder="Endpoint Url"
          onChange={(e) => {
            setEndpoint(e.target.value);
          }}
        />

        <CustomButton
          label="Publish"
          onClick={() => {
            publish();
          }}
        />
      </div>
    </div>
  );
};
