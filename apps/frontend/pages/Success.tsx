import {Navbar} from "../components/Navbar"
import {CustomDiv} from "../components/CustomDiv"
export const Success =()=>{
    return (
        <div className="min-h-screen bg-[#07090d] text-amber-50">
            <Navbar/>
            <CustomDiv heading="Your Purchase is Done Successfully!" subheading="Go to Dashboard Page to get your Api Keys" point=""/>
        </div>
    )
}