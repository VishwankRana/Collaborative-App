import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

import { renderTemplate } from "./templateEngine.js";
import {
  getFunctionNameForLanguage,
  getParameterNames,
} from "./problemMetadata.js";
import {
  formatValueForLanguage,
  inferValueKind,
} from "./valueFormatter.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const TEMPLATE_DIR = join(__dirname, "templates");

const TEMPLATE_FILES = {
  javascript: "javascript.template",
  python: "python.template",
  java: "java.template",
  cpp: "cpp.template",
};

function loadTemplate(language) {
  const fileName = TEMPLATE_FILES[language];

  if (!fileName) {
    throw new Error(`Unsupported language: ${language}`);
  }

  return readFileSync(join(TEMPLATE_DIR, fileName), "utf8");
}

function buildJavaDeclarations(problem, args, functionName) {
  const names = getParameterNames(problem, args);
  const declarations = args.map((value, index) => {
    const name = names[index];
    const formatted = formatValueForLanguage("java", value);
    const kind = inferValueKind(value);

    if (kind === "int[]") {
      return `int[] ${name} = ${formatted};`;
    }

    if (kind === "string[]") {
      return `String[] ${name} = ${formatted};`;
    }

    if (kind === "char[][]") {
      return `char[][] ${name} = ${formatted};`;
    }

    if (kind === "int[][]") {
      return `int[][] ${name} = ${formatted};`;
    }

    if (kind === "int" || kind === "number") {
      return `int ${name} = ${formatted};`;
    }

    if (kind === "boolean") {
      return `boolean ${name} = ${formatted};`;
    }

    if (kind === "string") {
      return `String ${name} = ${formatted};`;
    }

    return `Object ${name} = ${formatted};`;
  });

  const callArgs = names.join(", ");
  const returnType = problem.returnType?.java || "Object";
  const usesSolutionClass =
    problem.className === "Solution" || !problem.className;

  const resultDecl = `${returnType} __result = ${
    usesSolutionClass ? `solution.${functionName}(${callArgs})` : `${functionName}(${callArgs})`
  };`;

  return {
    ARG_DECLARATIONS: declarations.join("\n        "),
    RESULT_DECL: resultDecl,
  };
}

function buildCppDeclarations(problem, args, functionName) {
  const names = getParameterNames(problem, args);
  const declarations = args.map((value, index) => {
    const name = names[index];
    const formatted = formatValueForLanguage("cpp", value);
    const kind = inferValueKind(value);

    if (kind === "int[]") {
      return `vector<int> ${name} = ${formatted};`;
    }

    if (kind === "string[]") {
      return `vector<string> ${name} = ${formatted};`;
    }

    if (kind === "char[][]") {
      return `vector<vector<char>> ${name} = ${formatted};`;
    }

    if (kind === "int[][]") {
      return `vector<vector<int>> ${name} = ${formatted};`;
    }

    if (kind === "int" || kind === "number") {
      return `int ${name} = ${formatted};`;
    }

    if (kind === "boolean") {
      return `bool ${name} = ${formatted};`;
    }

    if (kind === "string") {
      return `string ${name} = ${formatted};`;
    }

    return `auto ${name} = ${formatted};`;
  });

  const callArgs = names.join(", ");
  const returnType = problem.returnType?.cpp || "auto";
  const resultDecl = `${returnType} __result = ${functionName}(${callArgs});`;

  return {
    ARG_DECLARATIONS: declarations.join("\n    "),
    RESULT_DECL: resultDecl,
  };
}

export function buildDriverProgram({ language, userCode, problem, args = [] }) {
  const template = loadTemplate(language);
  const functionName = getFunctionNameForLanguage(problem, language);
  const normalizedArgs = Array.isArray(args) ? args : [];

  if (language === "javascript" || language === "python") {
    return renderTemplate(template, {
      USER_CODE: userCode,
      FUNCTION_NAME: functionName,
      ARGS_JSON: JSON.stringify(normalizedArgs),
    });
  }

  if (language === "java") {
    const javaParts = buildJavaDeclarations(problem, normalizedArgs, functionName);

    return renderTemplate(template, {
      USER_CODE: userCode,
      ...javaParts,
    });
  }

  if (language === "cpp") {
    const cppParts = buildCppDeclarations(problem, normalizedArgs, functionName);

    return renderTemplate(template, {
      USER_CODE: userCode,
      ...cppParts,
    });
  }

  throw new Error(`Unsupported language: ${language}`);
}
