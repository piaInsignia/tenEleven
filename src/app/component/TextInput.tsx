type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};
export default function TextInput({ label, error, ...props }: TextInputProps) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-900">{label}</label>
      <input
        {...props}
        className={`w-full h-[45px] rounded-md border border-gray-300 bg-[#F6F7FB] px-3 py-2 text-sm text-[#7D7D9D] placeholder-[#7D7D9D]
          focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
      {error && <p className="text-red-500 text-[12px]">{error}</p>}
    </div>
  );
}
