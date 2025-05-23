import { useState } from "react";
import About from "./components/About";
import Code from "./components/Code";
import TestcaseBlock from "./components/TestcaseBlock";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Output from "./components/Output";

interface Testcase {
  id: number;
  name: string;
  input: {
    name: string;
    value: string;
  }[];
  expected: string;
}

const App = () => {
  const [code, setCode] = useState("");
  const [testcases, setTestcases] = useState<Testcase[]>([]);
  const [language, setLanguage] = useState<"cpp" | "python">("python");
  const [output, setOutput] = useState<string>("");
  const [currentBlock, setCurrentBlock] = useState<"code" | "output">("code");
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="my-6 text-orange-400 font-semibold text-5xl font-heading">
        LeetBud
      </h1>

      <button
        onClick={() =>
          setCurrentBlock(currentBlock === "code" ? "output" : "code")
        }
        disabled={loading}
        className={`absolute top-5 right-10 text-white px-4 py-2 rounded-md transition-all duration-300 z-50 cursor-pointer ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}>
        {currentBlock === "code" ? "See Output" : "See Code"}
      </button>

      <div className="w-full px-5 flex gap-10">
        <div className="relative w-[500px] h-[600px]">
          <div className="sticky top-10">
            <About />
          </div>
        </div>

        <div className="flex flex-col w-8/12 overflow-y-auto max-h-[80vh] pr-2">
          {currentBlock === "code" ? (
            <Code
              code={code}
              setCode={setCode}
              language={language}
              setLanguage={setLanguage}
              setOutput={setOutput}
              setCurrentBlock={setCurrentBlock}
              setLoading={setLoading}
              loading={loading}
              testcases={testcases}
            />
          ) : (
            <Output output={output} setOutput={setOutput} />
          )}
          <TestcaseBlock
            testcases={testcases}
            setTestcases={setTestcases}
            code={code}
            language={language}
          />
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default App;
