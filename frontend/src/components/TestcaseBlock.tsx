import React from "react";
import { toast } from "react-toastify";
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
    const updated = [...testcases];
    updated[testcaseIndex].input[inputIndex].value = newValue;
    setTestcases(updated);
  };

  const handleExpectedChange = (testcaseIndex: number, newValue: string) => {
    const updated = [...testcases];
    updated[testcaseIndex].expected = newValue;
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

  return (
    <div className="space-y-6 p-4 w-full">
      {testcases.map((testcase, idx) => (
        <div
          key={testcase.id}
          className="border rounded-lg p-4 shadow-sm bg-white relative">
          <h3 className="text-lg font-semibold mb-4">{testcase.name}</h3>

          <button
            onClick={() => handleDelete(testcase.id)}
            className="absolute top-2 right-2 text-sm text-red-500 hover:text-red-700 transition">
            Delete
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

      <button
        onClick={handleAdd}
        className="ml-8 px-4 py-2 bg-orange-500 text-white font-medium rounded-md shadow hover:bg-orange-600 transition">
        Add Test Case
      </button>
    </div>
  );
};

export default TestcaseBlock;
