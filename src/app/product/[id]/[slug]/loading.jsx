import Header from "@/app/components/Header";

export default function Loading() {
  
  return (
    <>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="flex justify-center items-center space-x-1 h-20">
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade " style={{ animationDelay: "0.4s" }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade [animation-delay:-0.15s]" style={{ animationDelay: "0.2s" }}></span>
          <span className="w-2 h-2 bg-gray-400 rounded-full animate-fade" style={{ animationDelay: "0s" }}></span>
        </div>
      </div>

    </>
  );
}