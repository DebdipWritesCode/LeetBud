import CodeBlock from "./CodeBlock";

interface CodeProps {
  code: string;
  setCode: (code: string) => void;
  language: "cpp" | "python";
  setLanguage: (language: "cpp" | "python") => void;
}

const Code: React.FC<CodeProps> = ({ code, setCode, language, setLanguage }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-2 p-4">
      <div className="flex justify-center mb-6">
        <button
          onClick={() => setLanguage("python")}
          className={`px-6 py-2 text-lg sm:text-xl rounded-2xl font-semibold border-2 transition-all duration-300 cursor-pointer mx-2 ${
            language === "python"
              ? "bg-orange-400 text-white hover:bg-orange-500 border-orange-400"
              : "text-orange-400 bg-transparent hover:bg-orange-100 border-orange-400"
          }`}
        >
          Python
        </button>
        <button
          onClick={() => setLanguage("cpp")}
          className={`px-6 py-2 text-lg sm:text-xl rounded-2xl font-semibold border-2 transition-all duration-300 cursor-pointer mx-2 ${
            language === "cpp"
              ? "bg-orange-400 text-white hover:bg-orange-500 border-orange-400"
              : "text-orange-400 bg-transparent hover:bg-orange-100 border-orange-400"
          }`}
        >
          C++
        </button>
      </div>

      <CodeBlock language={language} code={code} setCode={setCode} />
    </div>
  );
};

export default Code;
