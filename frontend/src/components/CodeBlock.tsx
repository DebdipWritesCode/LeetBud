import React, { useEffect, useCallback } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";
import axios from "axios";
import { getBackendUrl } from "../utils/envGetter";
import { toast } from "react-toastify";

interface CodeBlockProps {
  language: string;
  code: string;
  setCode: (code: string) => void;
  setOutput: (output: string) => void;
  setCurrentBlock: (block: "code" | "output") => void;
  setLoading: (loading: boolean) => void;
  loading: boolean;
}

const cppInitialCode = `class Solution {
public:
    // Your code here
};`;

const pythonInitialCode = `class Solution:
    # Your code here
    pass`;

const CodeBlock: React.FC<CodeBlockProps> = ({
  language,
  code,
  setCode,
  setOutput,
  setCurrentBlock,
  setLoading,
  loading,
}) => {
  const runCode = useCallback(async () => {
    setLoading(true);

    const backendUrl = getBackendUrl();

    const languageMap: Record<string, string> = {
      cpp: "cpp17",
      python: "python3",
    };

    const versionIndexMap: Record<string, string> = {
      cpp: "0",
      python: "3",
    };

    const requestData = {
      script: code,
      stdin: "",
      language: languageMap[language],
      versionIndex: versionIndexMap[language],
    };

    try {
      const response = await axios.post(`${backendUrl}/run`, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Backend response:", response.data);
      setOutput(response.data.output);
      toast.success("Code executed successfully!");
      setCurrentBlock("output");
    } catch (error) {
      console.error("Error executing code:", error);
      setOutput("Error executing code.");
      toast.error("Failed to execute code.");
    } finally {
      setLoading(false);
    }
  }, [code, language, setOutput, setCurrentBlock, setLoading]);

  useEffect(() => {
    const looksLikeCpp = /\bclass\s+\w+\s*\{[\s\S]*\};/.test(code);
    const looksLikePython = /\bclass\s+\w+:\s*\n\s*/.test(code);

    const shouldReplace =
      (language === "cpp" && looksLikePython) ||
      (language === "python" && looksLikeCpp) ||
      code.trim() === "";

    if (!shouldReplace) return;

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
        disabled={loading}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Tab") {
            e.preventDefault();
            const textarea = e.currentTarget;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const newCode =
              code.substring(0, start) + "    " + code.substring(end);
            setCode(newCode);

            setTimeout(() => {
              textarea.selectionStart = textarea.selectionEnd = start + 4;
            }, 0);
          }
        }}
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
              disabled={loading}
              className={`absolute bottom-4 right-4 text-white font-semibold px-4 py-2 rounded-md shadow-md transition duration-300 cursor-pointer ${
                loading
                  ? "bg-gray-500 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600"
              }`}
              onClick={runCode}>
              {loading ? "Running..." : "Run"}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Content
            side="top"
            align="end"
            className="bg-gray-800 text-white text-sm rounded px-2 py-1 shadow-md">
            Ctrl + '
            <Tooltip.Arrow className="fill-gray-800" />
          </Tooltip.Content>
        </Tooltip.Root>
      </Tooltip.Provider>
    </div>
  );
};

export default CodeBlock;
