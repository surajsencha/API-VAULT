import { CustomHeading } from "../components/CustomHeading";
import { Api } from "../components/Api";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export const ManageApi = () => {
  const [loading, setLoading] = useState(false);
  const [apis, setApis] = useState<any>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://apivault-api.senchasuraj96.workers.dev/api/v1/admin/Url/getMyUrls",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
      
        
        setApis(response.data);
      } catch (error) {
        navigate("/error", {
          state: {
            error:  "Something went wrong",
          },
        });
      }finally{
        setLoading(false);
      }
    };
      fetchData();
  }, []);
 if (loading) {
  return (
    <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center">
      Loading...
    </div>
  );
}

  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50">
      <Navbar />
      <CustomHeading label={"Manage Your Api's Here!"} />
      {
        apis.map((api:any)=>{
           return  <Api heading={api.name} subheading={api.description} point={""} label ="View Details" onClick={()=>{navigate(`/usageLog/${api.id}`)}}/>
        })
      }
    </div>
  );
};
