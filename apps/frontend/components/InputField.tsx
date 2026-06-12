export const InputField = ({ label, placeholder, onChange }: { label: string, placeholder: string, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => {
    return (
        <div className="mb-4">
            <label className="block text-amber-50 text-sm font-bold mb-2">{label}</label>
            <input
                type="text"
                placeholder={placeholder}
                onChange={onChange}
                className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
        </div>
    )
}