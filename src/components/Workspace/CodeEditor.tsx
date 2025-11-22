"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Loader2, Settings, RefreshCw } from "lucide-react";

interface CodeEditorProps {
  defaultCode: string;
  language?: string;
}

export default function CodeEditor({ defaultCode, language = "typescript" }: CodeEditorProps) {
  const [code, setCode] = useState(defaultCode);
  const [isEditorReady, setIsEditorReady] = useState(false);

  function handleEditorDidMount(editor: any, monaco: any) {
    setIsEditorReady(true);
  }

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e]">
      {/* Editor Toolbar */}
      <div className="border-b border-white/10 bg-white/5 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-gray-400 bg-black/20 px-3 py-1 rounded-md border border-white/5">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span className="capitalize">{language}</span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setCode(defaultCode)}
            className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors"
            title="Reset Code"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-white hover:bg-white/10 rounded-md transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1 relative">
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
          defaultLanguage={language}
          defaultValue={defaultCode}
          value={code}
          onChange={(value) => setCode(value || "")}
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
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            cursorBlinking: "smooth",
            smoothScrolling: true,
          }}
        />
      </div>
    </div>
  );
}
