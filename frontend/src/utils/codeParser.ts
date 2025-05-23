import { extractLastFunctionNameFromCode } from "./extractFunctionName";

export interface Testcase {
  id: number;
  name: string;
  input: {
    name: string;
    value: string;
  }[];
  expected: string;
}

function parseCPP(code: string, testcases: Testcase[]): string {
  const functionName: string = extractLastFunctionNameFromCode(code, "cpp");
  if (!functionName) return code;

  let mainFn = `\nint main() {\n`;
  mainFn += `    Solution sol;\n`;

  testcases.forEach((testcase, index) => {
    const args = testcase.input.map((i) => i.value).join(", ");

    mainFn += `    std::cout << "===============================" << std::endl;\n`;
    mainFn += `    std::cout << "Running: ${testcase.name}" << std::endl;\n`;
    mainFn += `    std::cout << "Expected: ${testcase.expected}" << std::endl;\n`;
    mainFn += `    auto result${index} = sol.${functionName}(${args});\n`;
    mainFn += `    std::cout << "Received: " << result${index} << std::endl;\n`;
    mainFn += `    std::cout << std::endl;\n`;
  });

  mainFn += `    return 0;\n}`;

  const finalCode =
    `#include <bits/stdc++.h>\nusing namespace std;\n\n` +
    code.trim() +
    `\n` +
    mainFn;

  return finalCode;
}

function parsePython(code: string, testcases: Testcase[]): string {
  // to be implemented later
  return code;
}

export function checkLanguageAndParse(
  code: string,
  language: string,
  testcases: Testcase[]
): string {
  if (language === "cpp") {
    return parseCPP(code, testcases);
  } else if (language === "python") {
    return parsePython(code, testcases);
  } else {
    throw new Error("Unsupported language");
  }
}
