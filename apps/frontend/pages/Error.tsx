import { useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";

export const Error = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50 ">
      <Navbar/>
      {location.state?.error || "Unknown Error"}
    </div>
  );
};