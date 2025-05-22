import { useState } from "react";
import About from "./components/About";
import Code from "./components/Code";
import TestcaseBlock from "./components/TestcaseBlock";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

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

  return (
    <div className="flex flex-col items-center h-full bg-gray-100">
      <h1 className="my-6 text-orange-400 font-semibold text-5xl font-heading">
        LeetBud
      </h1>
      <div className="w-full p-5 flex gap-10">
        <About />
        <div className="flex flex-col w-8/12 gap-10">
          <Code
            code={code}
            setCode={setCode}
            language={language}
            setLanguage={setLanguage}
          />
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
