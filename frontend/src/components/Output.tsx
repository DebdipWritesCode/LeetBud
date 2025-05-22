import React from "react";

interface OutputProps {
  output: string;
  setOutput: (output: string) => void;
}

const Output: React.FC<OutputProps> = ({ output }) => {
  return (
    <div className="relative w-full flex justify-center mt-24 mb-[21px]">
      <pre className="w-9/10 h-[20rem] bg-[#1e1e1e] text-green-300 font-mono text-sm p-4 pr-14 rounded-lg border border-gray-700 overflow-auto scrollbar-thin scrollbar-thumb-orange-400 scrollbar-track-gray-800">
        {output || "// Output will appear here..."}
      </pre>
    </div>
  );
};

export default Output;
