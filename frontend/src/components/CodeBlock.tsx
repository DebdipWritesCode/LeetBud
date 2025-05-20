import React, {useEffect, useCallback } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

interface CodeBlockProps {
  language: string;
  code: string;
  setCode: (code: string) => void;
}

const cppInitialCode = `class Solution {
public:
    // Your code here
};`;

const pythonInitialCode = `class Solution:
    # Your code here
    pass`;

const CodeBlock: React.FC<CodeBlockProps> = ({ language, code, setCode }) => {

  const runCode = useCallback(() => {
    console.log("Run Code:\n", code);
    // Connect this to your online compiler logic
  }, [code]);

  useEffect(() => {
    if (language === "cpp") {
      setCode(cppInitialCode);
    } else if (language === "python") {
      setCode(pythonInitialCode);
    }
  }, [language]);

  useEffect(() => {
    const handleShortcut = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === "'") {
        e.preventDefault();
        runCode();
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [runCode]);

  return (
    <div className="relative w-full">
      <textarea
        name="codearea"
        id="codearea"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full h-[20rem] bg-[#1e1e1e] text-green-300 font-mono text-sm p-4 pr-14 rounded-lg border border-gray-700 resize-none outline-none focus:ring-2 focus:ring-orange-400 transition-all duration-300 scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-800"
        spellCheck={false}
        placeholder={`Write your ${
          language === "cpp" ? "C++" : "Python"
        } code here...`}
      />

      <Tooltip.Provider>
        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              className="absolute bottom-4 right-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300 cursor-pointer"
              onClick={runCode}
            >
              Run
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content
            side="top"
            align="end"
            className="bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-md"
          >
            Ctrl + '
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default CodeBlock;
