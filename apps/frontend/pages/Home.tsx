import { useNavigate } from "react-router-dom";
import { CustomButton } from "../components/CustomButtom";
import { Navbar } from "../components/Navbar";
import { CustomDiv } from "../components/CustomDiv";
import { useEffect,useState } from "react";
import axios from "axios";
export const Home = () => {
  const navigate = useNavigate();
 
  const [loading, setLoading] = useState(false);
  const [profile,setProfile] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://apivault-api.senchasuraj96.workers.dev/api/v1/user/getUserDetail",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );

       
        setProfile(response.data);

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
    <div className="min-h-screen bg-[#07090d] text-amber-50">
      <Navbar />
       {profile && (
  <CustomDiv
    heading={profile.name}
    subheading={profile.email}
    point={profile.role}
  />
)}
 
      <div className="w-full h-120 mt-10 bg-[#0a0d14] rounded-2xl flex flex-col items-center text-center p-8">
        
        <div className="text-6xl font-bold max-w-3xl">
          API Vault turns APIs into products with clean discovery and billing.
        </div>

        <div className="text-[#9ca8bb] max-w-2xl mt-6">
          A restrained, premium interface for publishing APIs, selling
          subscriptions, issuing keys, and tracking usage without visual noise.
        </div>

        <div className="mt-8 flex gap-4">
          <CustomButton
            label="Browse Marketplace"
            onClick={() => navigate("/marketplace")}
          />

        
        </div>
      </div>

      <div className="mt-16 ml-10">
        <div className="text-[#9ca8bb] ml-4 text-xl font-bold">
          FEATURES
        </div>

        <div className="text-6xl font-bold p-2 m-2 max-w-5xl">
          Everything needed to run a polished API business.
        </div>

        <div className="mx-auto flex max-w-7xl px-6 py-4 gap-6 flex-wrap">
          <CustomDiv
            heading="Marketplace discovery"
            subheading="Search, filter, and compare APIs with pricing, trust, and performance signals."
            point=""
          />

          <CustomDiv
            heading="Subscriptions"
            subheading="Clean plan states, renewals, invoices, and access controls for every customer."
            point=""
          />

          <CustomDiv
            heading="Usage analytics"
            subheading="Track calls, latency, churn, and revenue with soft charts and crisp hierarchy."
            point=""
          />

          <CustomDiv
            heading="Developer tooling"
            subheading="Create APIs, publish docs, manage keys, and monitor subscribers in one place."
            point=""
          />
        </div>
      </div>
    </div>
  );
};