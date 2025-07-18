export default function Search({ ...props }) {
  return (
    <div className="flex  space-y-1">
      <input
        {...props}
        className={`w-full h-[40px] sm:h-[52px] rounded-3xl border border-gray-300 bg-white px-3 py-2 text-[14px] sm:text-[18px] text-[#1A1A1A] placeholder-[#7D7D9D]
          focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed`}
      />
    </div>
  );
}
