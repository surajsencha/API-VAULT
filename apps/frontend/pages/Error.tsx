import { useLocation } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const Error = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50 ">
      <NavBar/>
      {location.state?.error || "Unknown Error"}
    </div>
  );
};