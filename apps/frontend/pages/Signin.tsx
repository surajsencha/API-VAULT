import { CustomButton } from "../components/CustomButtom";
import { InputField } from "../components/InputField";
import { BottomWarning } from "../components/BottomWarning";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/signin",
        {
          email,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);

      navigate("/");
    } catch (error) {
   
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090d] flex items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-indigo-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50 flex items-center justify-center">
      <div className="w-full max-w-md rounded-2xl bg-[#0f141b] p-8 flex flex-col items-center">
        <h1 className="mb-6 text-center text-3xl font-bold">
          Signin
        </h1>

        <InputField
          label="Email"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputField
          label="Password"
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="mt-4">
          <CustomButton
            label="Signin"
            onClick={handleSignin}
          />
        </div>

        <BottomWarning
          label="Don't have an account?"
          buttonText="Signup"
          to="/signup"
        />
      </div>
    </div>
  );
};