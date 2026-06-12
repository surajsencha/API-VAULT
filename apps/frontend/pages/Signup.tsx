import { CustomButton } from "../components/CustomButtom"
import { InputField } from "../components/InputField"
import { BottomWarning } from "../components/BottomWarning"
import {useState} from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
export const Signup = () => {
  const [username, setUsername] = useState("John")
  const [email, setEmail] = useState("john@example.com")
  const [password, setPassword] = useState("password123")
  const navigate= useNavigate();
  return (
    <div className="min-h-screen bg-[#07090d] text-amber-50 flex items-center justify-center">
  <div className="w-full max-w-md rounded-2xl bg-[#0f141b] p-8 flex flex-col items-center">
    <h1 className="mb-6 text-center text-3xl font-bold">
      Signup
    </h1>

    <InputField
      label="Username"
      placeholder="Enter your username"
      onChange={(e) => setUsername(e.target.value)}
    />

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

    <CustomButton
      label="Signup"
      onClick={async () => {
     

        try {
           await axios.post(
            "https://apivault-api.senchasuraj96.workers.dev/api/v1/auth/signup",
            {
              name: username,
              email,
              password,
            }
          );

         navigate("/signin");
        } catch (error) {
          console.error(error);
        }
      }}
    />

    <BottomWarning 
      label="Already have an account?"
      buttonText="Signin"
      to="/signin"
    />
  </div>
</div>
  )
}