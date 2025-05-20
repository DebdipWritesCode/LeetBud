import { useState } from "react";

const Code = () => {
  const [language, setLanguage] = useState<"cpp" | "python">("python");

  return (
    <div className="w-[400px] flex justify-center mt-20">
      <div className="font-body flex space-x-4 h-[50px]">
        <button
          onClick={() => setLanguage("python")}
          className={`px-9 py-2 text-xl rounded-2xl font-semibold border-2 transition-all duration-300 cursor-pointer ${
            language === "python"
              ? "bg-orange-400 text-slate-100 hover:bg-orange-600 border-orange-400"
              : "text-orange-400 bg-transparent hover:bg-slate-200"
          }`}>
          Python
        </button>
        <button
          onClick={() => setLanguage("cpp")}
          className={`px-9 py-2 text-xl rounded-2xl font-semibold border-2 transition-all duration-300 cursor-pointer ${
            language === "cpp"
              ? "bg-orange-400 text-slate-100 hover:bg-orange-600 border-orange-400"
              : "text-orange-400 bg-transparent hover:bg-slate-200"
          }`}>
          C++
        </button>
      </div>
    </div>
  );
};

export default Code;
