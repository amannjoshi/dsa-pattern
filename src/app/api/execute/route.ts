import { NextRequest, NextResponse } from "next/server";

// Piston API - Free code execution engine (no API key required)
const PISTON_API = "https://emkc.org/api/v2/piston/execute";

interface ExecuteRequest {
  language: string;
  version: string;
  code: string;
  stdin?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ExecuteRequest = await request.json();
    const { language, version, code, stdin } = body;

    if (!language || !code) {
      return NextResponse.json(
        { error: "Language and code are required" },
        { status: 400 }
      );
    }

    // Call Piston API
    const response = await fetch(PISTON_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        language,
        version,
        files: [
          {
            name: getFileName(language),
            content: code,
          },
        ],
        stdin: stdin || "",
        compile_timeout: 10000,
        run_timeout: 5000,
        compile_memory_limit: -1,
        run_memory_limit: -1,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Piston API error:", errorText);
      return NextResponse.json(
        { error: "Code execution failed. The server might be busy. Please try again." },
        { status: 500 }
      );
    }

    const result = await response.json();
    
    // Check for timeout (TLE)
    if (result.run?.signal === "SIGKILL" || result.run?.code === 137) {
      return NextResponse.json({
        output: "",
        stderr: "⏱️ Time Limit Exceeded (TLE) - Your code took too long to execute.",
        exitCode: result.run?.code || 1,
        tle: true,
      });
    }

    // Check for memory issues
    if (result.run?.signal === "SIGSEGV" || result.run?.code === 139) {
      return NextResponse.json({
        output: "",
        stderr: "💾 Memory Limit Exceeded (MLE) or Segmentation Fault - Check for infinite loops or large memory usage.",
        exitCode: result.run?.code || 1,
        mle: true,
      });
    }

    // Handle compilation errors (for compiled languages like Java, C++)
    if (result.compile && result.compile.stderr) {
      return NextResponse.json({
        output: result.compile.output || "",
        stderr: "🔴 Compilation Error:\n" + result.compile.stderr,
        exitCode: result.compile.code,
      });
    }

    // Handle runtime errors
    if (result.run?.stderr && result.run.code !== 0) {
      return NextResponse.json({
        output: result.run?.stdout || "",
        stderr: "🔴 Runtime Error:\n" + result.run.stderr,
        exitCode: result.run?.code || 1,
      });
    }

    // Handle successful execution
    return NextResponse.json({
      output: result.run?.stdout || "",
      stderr: result.run?.stderr || "",
      exitCode: result.run?.code || 0,
    });
  } catch (error) {
    console.error("Execute API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please check your internet connection and try again." },
      { status: 500 }
    );
  }
}

function getFileName(language: string): string {
  const fileNames: Record<string, string> = {
    python: "main.py",
    java: "Solution.java",
    cpp: "main.cpp",
    c: "main.c",
    javascript: "main.js",
    typescript: "main.ts",
    go: "main.go",
    rust: "main.rs",
  };
  return fileNames[language] || "main.txt";
}
