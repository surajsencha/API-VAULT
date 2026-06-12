import { NavBar } from "../components/NavBar";
import { Api } from "../components/Api";
import { CustomButton } from "../components/CustomButtom";

import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Apidetials = () => {
  const { apiName } = useParams();

  const [loading, setLoading] = useState(false);

  const [apiDetails, setApiDetails] = useState<any>(null);

  const [existingSubscription, setExistingSubscription] = useState<any>(null);

  const [apiKey, setApiKey] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchApiDetails = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          "http://localhost:3000/api/v1/user/Url/getUrlByName",
          {
            params: {
              name: apiName,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

        setApiDetails(response.data[0]);
      } catch (error) {
      
        setApiDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchApiDetails();
  }, [apiName]);

  const handleBuyApi = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/Api/buyApiAccess",
        {},
        {
          params: {
            apiId: apiDetails.id,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      window.location.href = response.data.checkoutUrl;
    } catch (error: any) {
     
        if(error.response.data.error==="You already own this API"){
        setExistingSubscription(error.response?.data?.existingSubscription);

        }

  
    
          else{
               navigate("/error", {
        state: {
          error:
            error.response?.data?.error ||
            error.message ||
            "Something went wrong",
        },
      });
          }
             
    

    }
  };

  const handleGetApiKey = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "http://localhost:3000/api/v1/user/Api/getPurchasedApiKey",
        {
          params: {
            apiId: existingSubscription.apiId,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setApiKey(response.data.ApiKey);
    } catch (error:any) {
    
      navigate("/error", {
        state: {
          error:
            error.response?.data?.error ||
            error.message ||
            "Something went wrong",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090d] text-white flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  if (existingSubscription) {
    return (
      <div className="min-h-screen bg-[#07090d] text-amber-50">
        <NavBar />

        <div className="max-w-4xl mx-auto mt-10 p-8 bg-[#0f141b] rounded-2xl">
          <h1 className="text-3xl font-bold mb-6">You already own this API</h1>

          <p className="mb-2">Status: {existingSubscription.status}</p>

          <p className="mb-6">
            Expires At:{" "}
            {new Date(existingSubscription.expiresAt).toLocaleDateString()}
          </p>

          <CustomButton label="Get API Key" onClick={handleGetApiKey} />

          {apiKey && (
            <div className="mt-6">
              <p className="font-bold mb-2">Your API Key</p>

              <div className="bg-black p-4 rounded-xl break-all">{apiKey}</div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50">
      <NavBar />

      {apiDetails && (
        <Api
          heading={apiDetails.name}
          subheading={apiDetails.description}
          point={`₹${apiDetails.price}`}
          label="Buy"
          onClick={handleBuyApi}
        />
      )}
    </div>
  );
};
