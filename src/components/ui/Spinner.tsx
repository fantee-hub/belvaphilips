"use client";
export default function Spinner({
  size = "md",
}: {
  size?: "sm" | "md" | "lg";
}) {
  const sizeClass = {
    sm: "w-5 h-5",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  }[size];

  return (
    <div className="flex justify-center items-center ">
      <div
        className={`${sizeClass} rounded-full border-4 border-[#EAEAEA] border-t-[#1D1D1B]`}
        style={{
          animation: "spin 1s linear infinite",
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
