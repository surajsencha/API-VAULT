import {NavBar} from "../components/NavBar"
import {CustomDiv} from "../components/CustomDiv"
export const Success =()=>{
    return (
        <div className="min-h-screen bg-[#07090d] text-amber-50">
            <NavBar/>
            <CustomDiv heading="Your Purchase is Done Successfully!" subheading="Go to Dashboard Page to get your Api Keys" point=""/>
        </div>
    )
}