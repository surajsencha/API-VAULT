export const CustomDiv = ({
  heading,
  subheading,
  point,
}: {
  heading: string;
  subheading: string;
  point: string |number;
}) => {
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
  
    </div>
  );
};