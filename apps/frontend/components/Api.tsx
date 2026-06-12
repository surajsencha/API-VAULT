import { CustomButton } from "./CustomButtom";

export const Api =({
  heading,
  subheading,
  point,
  label,
  onClick
}: {
  heading: string;
  subheading: string;
  point: string |number;
  label:string;
  onClick:() => void;
})=>{
    return (
        <div className="flex-1 min-w-250px bg-[#0a0d14] rounded-2xl p-4">
      <div className="text-xl font-bold ">
        {heading}
      </div>

      <div className="mt-3 text-[#9ca8bb]">
        {subheading}
      </div>
        <div className="mt-3" >
          {point}
        </div>
        <CustomButton label={label} onClick={onClick}/>
    </div>
    )
}