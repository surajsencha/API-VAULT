import { useState } from "react";
import { CustomHeading } from "../components/CustomHeading";
import { NavBar } from "../components/NavBar";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { CustomDiv } from "../components/CustomDiv";
import { InputField } from "../components/InputField";
export const UsageLog = () => {
  const [usagelog, setusagelog] = useState<any>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/Url/getApiCalls",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

   
        setusagelog(response.data.apiCalls);
      } catch (error) {
        navigate("/error", {
          state: {
            error: "Something went wrong",
          },
        });
      } finally {
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
    <div>
      <NavBar />
      <div className="min-h-screen bg-[#07090d] text-amber-50 ">
        <CustomHeading label={"Update Api details"} />
        <InputField label="Change Api Name" placeholder="New Name" onChange={()=>{}}/>
        <InputField label="Change Api Name" placeholder="New Name" onChange={()=>{}}/>

    
          <CustomHeading label={"Api Usage Log"} />
          <CustomDiv
            heading={"Total Api Calls till Now"}
            subheading={usagelog.length}
            point={""}
          />
          {usagelog.map((log: any) => {
            return (
              <CustomDiv
                heading={log.id}
                subheading={log.apiId}
                point={`apiKeyId : ${log.apiKeyId} route : ${log.endpoint} Status code : ${log.statusCode}`}
              />
            );
          })}
        </div>
      
    </div>
  );
};
