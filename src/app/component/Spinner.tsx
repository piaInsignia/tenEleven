export default function Spinner() {
  return (
    <div className="h-screen w-full flex justify-center">
      <div className="flex justify-center items-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#F05125]" />
      </div>
    </div>
  );
}
