import { Link } from "react-router-dom";
export const BottomWarning = ({ label, buttonText, to }:{ label: string, buttonText: string, to: string }) => {
  return (
    <div className=" m-4">
      <b>{label}</b>
      <Link
        to={to}
        className="pointer underline pl-1 text-blue-500 hover:text-blue-700 "
      >
        {buttonText}
      </Link>
    </div>
  );
}

export default BottomWarning;
