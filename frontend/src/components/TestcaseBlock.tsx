import React from "react";
import { toast } from "react-toastify";
import { FaWandMagicSparkles } from "react-icons/fa6";
import { FaTrashAlt } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

interface Testcase {
  id: number;
  name: string;
  input: {
    name: string;
    value: string;
  }[];
  expected: string;
}

interface TestcaseBlockProps {
  testcases: Testcase[];
  setTestcases: (testcases: Testcase[]) => void;
  code: string;
  language: "cpp" | "python";
}

const TestcaseBlock: React.FC<TestcaseBlockProps> = ({
  testcases,
  setTestcases,
  code,
  language,
}) => {
  const handleInputChange = (
    testcaseIndex: number,
    inputIndex: number,
    newValue: string
  ) => {
    console.log("Testcases: ", testcases);
    const updated = [...testcases];
    updated[testcaseIndex].input[inputIndex].value = newValue;

    setTestcases(updated);
  };

  const handleExpectedChange = (testcaseIndex: number, newValue: string) => {
    const updated = [...testcases];
    updated[testcaseIndex].expected = newValue;
    setTestcases(updated);
  };

  const handleNameChange = (testcaseIndex: number, newName: string) => {
    const updated = [...testcases];
    updated[testcaseIndex].name = newName;
    setTestcases(updated);
  };

  const handleDelete = (id: number) => {
    setTestcases(testcases.filter((tc) => tc.id !== id));
  };

  const extractInputsFromCode = (
    code: string,
    language: "cpp" | "python"
  ): string[] => {
    if (language === "cpp") {
      const classMatch = code.match(/class\s+Solution\s*{([\s\S]*?)^\s*};/m);
      if (!classMatch) return [];

      const classBody = classMatch[1];

      const publicMatch = classBody.match(/public:\s*([\s\S]*)/);
      if (!publicMatch) return [];

      const publicBody = publicMatch[1];

      const functionRegex =
        /[a-zA-Z_][\w<>]*\s+([a-zA-Z_]\w*)\s*\(([^()]*)\)\s*{/g;
      const matches = [...publicBody.matchAll(functionRegex)];
      if (matches.length === 0) return [];

      const lastFunction = matches[matches.length - 1];
      const params = lastFunction[2]
        .split(",")
        .map((p) => {
          const tokens = p.trim().split(" ");
          return tokens[tokens.length - 1];
        })
        .filter(Boolean);

      return params;
    }

    if (language === "python") {
      const classMatch = code.match(/class\s+Solution\s*:\s*([\s\S]*)/);
      if (!classMatch) return [];

      const classBody = classMatch[1];
      const defMatches = [
        ...classBody.matchAll(/def\s+[a-zA-Z_]\w*\(self(?:,\s*([^)]*))?\):/g),
      ];
      if (defMatches.length === 0) return [];

      const lastDefParams = defMatches[defMatches.length - 1][1];
      if (!lastDefParams) return [];

      return lastDefParams
        .split(",")
        .map((p) => p.trim().split("=")[0].trim())
        .filter(Boolean);
    }

    return [];
  };

  const handleAdd = () => {
    const paramNames = extractInputsFromCode(code, language);

    if (paramNames.length === 0) {
      toast.error("No valid function found. Cannot generate testcase.");
      return;
    }

    const newId =
      testcases.length > 0 ? Math.max(...testcases.map((t) => t.id)) + 1 : 1;

    const newInputs = paramNames.map((name) => ({
      name,
      value: "",
    }));

    const newTestcase: Testcase = {
      id: newId,
      name: `New Testcase`,
      input: newInputs,
      expected: "",
    };

    setTestcases([...testcases, newTestcase]);
  };

  const handleGenerate = () => {
    // Logic to generate test cases based on the code and language
    // This is a placeholder for the actual implementation
    toast.success("Test cases generated successfully!");
  };

  return (
    <div className="space-y-6 p-2 w-full flex flex-col items-center font-body">
      {testcases.map((testcase, idx) => (
        <div
          key={testcase.id}
          className="border rounded-lg px-4 py-2 shadow-sm bg-white relative w-9/10">
          <input
            type="text"
            value={testcase.name}
            onChange={(e) => handleNameChange(idx, e.target.value)}
            className="text-lg font-semibold mb-4 focus:outline-none focus:border-orange-500 bg-transparent"
          />

          <button
            onClick={() => handleDelete(testcase.id)}
            className="absolute top-2 right-2 text-sm text-white bg-red-600 hover:bg-red-800 transition w-8 h-8 rounded-full flex items-center justify-center shadow-md cursor-pointer">
            <FaTrashAlt />
          </button>

          <div className="space-y-3">
            {testcase.input.map((inp, inputIdx) => (
              <div key={inputIdx} className="flex flex-col">
                <label className="text-sm font-medium text-gray-700 mb-1">
                  {inp.name}:
                </label>
                <input
                  type="text"
                  value={inp.value}
                  onChange={(e) =>
                    handleInputChange(idx, inputIdx, e.target.value)
                  }
                  className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder={`Enter ${inp.name}`}
                />
              </div>
            ))}

            <div className="flex flex-col mt-3">
              <label className="text-sm font-medium text-gray-700 mb-1">
                Expected Output:
              </label>
              <input
                type="text"
                value={testcase.expected}
                onChange={(e) => handleExpectedChange(idx, e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                placeholder="Enter expected output"
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex justify-between items-center w-full mt-4">
        <button
          onClick={handleAdd}
          className="ml-8 px-4 py-2 bg-orange-500 text-white font-medium rounded-md shadow hover:bg-orange-600 transition cursor-pointer">
          Add Test Case
        </button>
        <button
          onClick={handleGenerate}
          className=" mr-10 px-4 py-2 bg-purple-500 text-white font-medium rounded-md shadow hover:bg-purple-600 transition cursor-pointer">
          <div className="flex items-center gap-2">
            <p>Generate</p>
            <FaWandMagicSparkles />
          </div>
        </button>
      </div>
    </div>
  );
};

export default TestcaseBlock;
