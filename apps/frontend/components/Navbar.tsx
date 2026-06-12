import { Link, useNavigate } from "react-router-dom";
import { CustomButton } from "./CustomButtom";
export const Navbar = () => {
  const navigate= useNavigate();
  return (
    <nav className="bg-[#07090d] text-white border-b border-zinc-800 w-lvw">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 gap-6">
        
        <h1 className="text-xl font-bold">
          API Vault
        </h1>
        
        <div className="flex items-center gap-8">
        <Link to="/" className="hover:text-zinc-400">Home</Link>
        <Link to="/marketplace" className="hover:text-zinc-400">Marketplace</Link>
        <Link to="/publish" className="hover:text-zinc-400">Publish-Api</Link>
        <Link to="/signup" className="hover:text-zinc-400">Signup</Link>
        <Link to="/signin" className="hover:text-zinc-400">Signin</Link>
        <Link to="/manageApi" className="hover:text-zinc-400">Manage-Api</Link>
        
        <CustomButton label="Logout" onClick={()=>{
          localStorage.removeItem("token");
          navigate("/signin")
          
        }}/>
        </div>
      </div>
    </nav>
  );
};