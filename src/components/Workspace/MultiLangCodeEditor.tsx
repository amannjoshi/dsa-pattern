"use client";

import React, { useState, useCallback } from "react";
import Editor from "@monaco-editor/react";
import { 
  Loader2, 
  Settings, 
  RefreshCw, 
  Play, 
  ChevronDown,
  Terminal,
  X,
  Clock,
  CheckCircle2,
  XCircle
} from "lucide-react";

interface MultiLangCodeEditorProps {
  problemTitle: string;
  problemDifficulty: string;
}

type Language = "python" | "java" | "cpp" | "javascript";

interface LanguageConfig {
  id: Language;
  name: string;
  monacoLang: string;
  icon: string;
  extension: string;
  pistonLang: string;
  pistonVersion: string;
}

const LANGUAGES: LanguageConfig[] = [
  { id: "python", name: "Python", monacoLang: "python", icon: "🐍", extension: ".py", pistonLang: "python", pistonVersion: "3.10" },
  { id: "java", name: "Java", monacoLang: "java", icon: "☕", extension: ".java", pistonLang: "java", pistonVersion: "15.0.2" },
  { id: "cpp", name: "C++", monacoLang: "cpp", icon: "⚡", extension: ".cpp", pistonLang: "cpp", pistonVersion: "10.2.0" },
  { id: "javascript", name: "JavaScript", monacoLang: "javascript", icon: "🟨", extension: ".js", pistonLang: "javascript", pistonVersion: "18.15.0" },
];

const STARTER_CODE: Record<Language, (title: string) => string> = {
  python: (title) => `# ${title}
# Time Complexity: O(?)
# Space Complexity: O(?)

class Solution:
    def solve(self, nums):
        # Write your code here
        pass

# Test your solution
if __name__ == "__main__":
    sol = Solution()
    # Example: print(sol.solve([1, 2, 3]))
    print("Hello, World!")
`,
  java: (title) => `// ${title}
// Time Complexity: O(?)
// Space Complexity: O(?)

import java.util.*;

public class Solution {
    public int[] solve(int[] nums) {
        // Write your code here
        return new int[]{};
    }
    
    public static void main(String[] args) {
        Solution sol = new Solution();
        // Example: System.out.println(Arrays.toString(sol.solve(new int[]{1, 2, 3})));
        System.out.println("Hello, World!");
    }
}
`,
  cpp: (title) => `// ${title}
// Time Complexity: O(?)
// Space Complexity: O(?)

#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

class Solution {
public:
    vector<int> solve(vector<int>& nums) {
        // Write your code here
        return {};
    }
};

int main() {
    Solution sol;
    // Example: vector<int> nums = {1, 2, 3};
    cout << "Hello, World!" << endl;
    return 0;
}
`,
  javascript: (title) => `// ${title}
// Time Complexity: O(?)
// Space Complexity: O(?)

function solve(nums) {
    // Write your code here
    
}

// Test your solution
console.log("Hello, World!");
// Example: console.log(solve([1, 2, 3]));
`,
};

interface ExecutionResult {
  output: string;
  error: string;
  executionTime: number;
  status: "success" | "error" | "running" | "idle";
}

export default function MultiLangCodeEditor({ 
  problemTitle, 
  problemDifficulty 
}: MultiLangCodeEditorProps) {
  const [selectedLang, setSelectedLang] = useState<Language>("python");
  const [codes, setCodes] = useState<Record<Language, string>>(() => ({
    python: STARTER_CODE.python(problemTitle),
    java: STARTER_CODE.java(problemTitle),
    cpp: STARTER_CODE.cpp(problemTitle),
    javascript: STARTER_CODE.javascript(problemTitle),
  }));
  const [isEditorReady, setIsEditorReady] = useState(false);
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [showOutput, setShowOutput] = useState(false);
  const [result, setResult] = useState<ExecutionResult>({
    output: "",
    error: "",
    executionTime: 0,
    status: "idle",
  });

  const currentLangConfig = LANGUAGES.find(l => l.id === selectedLang)!;

  const handleEditorDidMount = useCallback(() => {
    setIsEditorReady(true);
  }, []);

  const handleCodeChange = useCallback((value: string | undefined) => {
    setCodes(prev => ({ ...prev, [selectedLang]: value || "" }));
  }, [selectedLang]);

  const handleLanguageChange = (lang: Language) => {
    setSelectedLang(lang);
    setShowLangDropdown(false);
  };

  const handleReset = () => {
    setCodes(prev => ({ 
      ...prev, 
      [selectedLang]: STARTER_CODE[selectedLang](problemTitle) 
    }));
  };

  const handleRunCode = async () => {
    console.log("Run button clicked!"); // Debug
    setShowOutput(true);
    setResult({ output: "", error: "", executionTime: 0, status: "running" });

    const startTime = Date.now();
    
    try {
      console.log("Sending code to API..."); // Debug
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          language: currentLangConfig.pistonLang,
          version: currentLangConfig.pistonVersion,
          code: codes[selectedLang],
        }),
      });

      console.log("API response status:", response.status); // Debug
      const data = await response.json();
      console.log("API response data:", data); // Debug
      const executionTime = Date.now() - startTime;

      if (data.error) {
        setResult({
          output: "",
          error: data.error,
          executionTime,
          status: "error",
        });
      } else {
        setResult({
          output: data.output || "",
          error: data.stderr || "",
          executionTime,
          status: data.stderr ? "error" : "success",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error); // Debug
      setResult({
        output: "",
        error: "Failed to execute code. Please try again.",
        executionTime: Date.now() - startTime,
        status: "error",
      });
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Editor Toolbar */}
      <div className="border-b border-white/10 bg-[#252526] px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLangDropdown(!showLangDropdown)}
              className="flex items-center gap-2 text-sm text-gray-300 bg-[#3c3c3c] hover:bg-[#4a4a4a] px-3 py-1.5 rounded-md border border-white/10 transition-colors"
            >
              <span>{currentLangConfig.icon}</span>
              <span>{currentLangConfig.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
            </button>

            {showLangDropdown && (
              <>
                <div 
                  className="fixed inset-0 z-10" 
                  onClick={() => setShowLangDropdown(false)} 
                />
                <div className="absolute top-full left-0 mt-1 bg-[#2d2d2d] border border-white/10 rounded-lg shadow-xl z-20 py-1 min-w-[140px]">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-white/10 transition-colors ${
                        selectedLang === lang.id ? "text-blue-400 bg-blue-500/10" : "text-gray-300"
                      }`}
                    >
                      <span>{lang.icon}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title="Reset Code"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
          </button>
          <div className="w-px h-5 bg-white/10 mx-1" />
          <button
            onClick={handleRunCode}
            disabled={result.status === "running"}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-500 text-white text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {result.status === "running" ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4" />
            )}
            Run
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="relative" style={{ height: showOutput ? 'calc(100% - 200px)' : '100%' }}>
        {!isEditorReady && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#1e1e1e] z-10">
            <div className="flex flex-col items-center gap-3 text-gray-500">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
              <span className="text-sm font-medium">Loading Editor...</span>
            </div>
          </div>
        )}
        <Editor
          height="100%"
          language={currentLangConfig.monacoLang}
          value={codes[selectedLang]}
          onChange={handleCodeChange}
          theme="vs-dark"
          onMount={handleEditorDidMount}
          options={{
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            roundedSelection: false,
            scrollBeyondLastLine: false,
            readOnly: false,
            automaticLayout: true,
            padding: { top: 16, bottom: 16 },
            fontFamily: "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            cursorBlinking: "smooth",
            smoothScrolling: true,
            tabSize: 4,
            wordWrap: "on",
          }}
        />
      </div>

      {/* Output Panel - Always 200px when visible */}
      {showOutput && (
        <div className="border-t border-white/10 bg-[#1e1e1e] flex flex-col" style={{ height: '200px', minHeight: '200px' }}>
          {/* Output Header */}
          <div className="flex items-center justify-between px-4 py-2 bg-[#252526] border-b border-white/10">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-300">Output</span>
              {result.status === "success" && (
                <span className="flex items-center gap-1 text-xs text-green-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Success
                </span>
              )}
              {result.status === "error" && (
                <span className="flex items-center gap-1 text-xs text-red-400">
                  <XCircle className="w-3.5 h-3.5" />
                  Error
                </span>
              )}
              {result.status === "running" && (
                <span className="flex items-center gap-1 text-xs text-blue-400">
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  Running...
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {result.executionTime > 0 && (
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {result.executionTime}ms
                </span>
              )}
              <button
                onClick={() => setShowOutput(false)}
                className="p-1 text-gray-400 hover:text-white hover:bg-white/10 rounded transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Output Content */}
          <div className="flex-1 overflow-auto p-4 font-mono text-sm">
            {result.status === "running" && (
              <div className="flex items-center gap-2 text-gray-400">
                <Loader2 className="w-4 h-4 animate-spin" />
                Executing your code...
              </div>
            )}
            {result.status === "idle" && (
              <div className="text-gray-500">
                Click "Run" to execute your code.
              </div>
            )}
            {(result.status === "success" || result.status === "error") && (
              <>
                {result.output && (
                  <pre className="text-green-400 whitespace-pre-wrap mb-2">{result.output}</pre>
                )}
                {result.error && (
                  <pre className="text-red-400 whitespace-pre-wrap">{result.error}</pre>
                )}
                {!result.output && !result.error && (
                  <div className="text-gray-500">No output. Make sure your code has print/console statements.</div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
