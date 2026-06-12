import { CustomDiv } from "../components/CustomDiv";
import { Navbar } from "../components/Navbar";
import { CustomHeading } from "../components/CustomHeading";
import { InputField } from "../components/InputField";
import { useState, useEffect } from "react";
import { CustomButton } from "../components/CustomButtom";
import axios from "axios";
import { Api } from "../components/Api";
import { useNavigate } from "react-router-dom";
export const Marketplace = () => {
  const [ApiName, setApiName] = useState("");
  const [ApiData, setApiData] = useState<any[]>([]);
  const [flag, Setflag] = useState(true);
  const [loading,setLoading]=useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/Url/getUrlByName",
          {
            params: {
              name: ApiName,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setApiData(response.data);
      } catch (error) {
        console.error(error);
        setApiData([]);
      }finally{
        setLoading(false);
      }
    };

    if (flag) {
      fetchData();
    }
  }, [flag]);
  const navigate = useNavigate();
if (loading) {
  return (
    <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center">
      Loading...
    </div>
  );
}
if (!ApiData) {
  return (
    <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center">
      No API Key Found
    </div>
  );
}
  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50">
      <Navbar />

      <CustomHeading label="Marketplace" />

      <CustomDiv
        heading="Discover APIs with restrained search and filters."
        subheading="Editorial layout, compact cards, and a calm hierarchy keep the marketplace readable."
        point=""
      />

      <div className="p-4 flex gap-4 items-center">
        <InputField
          label=""
          placeholder="Search for Api..."
          onChange={(e) => {
            setApiName(e.target.value);
          }}
        />

        <CustomButton
          label="Search"
          onClick={() => {
            Setflag(!flag);
          }}
        />
      </div>

      <div className="p-4 flex flex-col gap-4">
        {ApiData.map((api) => (
          <div className="flex ">
            <Api
              heading={api.name}
              subheading=""
              point=""
              label="View Details"
              onClick={ () => {navigate(`/apidetails/${api.name}`)}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
