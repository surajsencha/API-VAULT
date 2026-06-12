export const CustomButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 h-fit w-fit bg-indigo-900 rounded-2xl text-amber-50 hover:bg-indigo-800 transition"
    >
      {label}
    </button>
  );
};