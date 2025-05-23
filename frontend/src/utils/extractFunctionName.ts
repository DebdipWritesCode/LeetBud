export interface FunctionDetails {
  name: string;
  params: string[];
}

export const extractLastFunctionNameFromCode = (
  code: string,
  language: "cpp" | "python"
): string => {
  if (language === "cpp") {
    const classMatch = code.match(/class\s+Solution\s*{([\s\S]*?)^\s*};/m);
    if (!classMatch) return "";

    const classBody = classMatch[1];
    const publicMatch = classBody.match(/public:\s*([\s\S]*)/);
    if (!publicMatch) return "";

    const publicBody = publicMatch[1];

    const functionRegex =
      /[a-zA-Z_][\w<>]*\s+([a-zA-Z_]\w*)\s*\(([^()]*)\)\s*{/g;
    const matches = [...publicBody.matchAll(functionRegex)];
    if (matches.length === 0) return "";

    const lastFunction = matches[matches.length - 1];
    const functionName = lastFunction[1];
    const paramList = lastFunction[2]
      .split(",")
      .map((p) => {
        const tokens = p.trim().split(" ");
        return tokens[tokens.length - 1]; // extract variable name
      })
      .filter(Boolean);

    return functionName;
  }

  if (language === "python") {
    const classMatch = code.match(/class\s+Solution\s*:\s*([\s\S]*)/);
    if (!classMatch) return "";

    const classBody = classMatch[1];
    const defMatches = [
      ...classBody.matchAll(/def\s+([a-zA-Z_]\w*)\(self(?:,\s*([^)]*))?\):/g),
    ];
    if (defMatches.length === 0) return "";

    const lastDef = defMatches[defMatches.length - 1];
    const functionName = lastDef[1];
    const paramList = lastDef[2]
      ?.split(",")
      .map((p) => p.trim().split("=")[0].trim())
      .filter(Boolean) ?? [];

    return functionName;
  }

  return "";
};
