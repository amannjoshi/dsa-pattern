
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Play, CheckCircle2 } from "lucide-react";
import CodeEditor from "@/components/Workspace/CodeEditor";
import { LeetCodeIcon } from "@/components/icons/LeetCodeIcon";

export default async function ProblemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: problem } = await supabase
    .from("problems")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!problem) {
    notFound();
  }

  const difficultyColor =
    problem.difficulty === "Easy"
      ? "text-green-400 bg-green-400/10 border-green-400/20"
      : problem.difficulty === "Medium"
      ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"
      : "text-red-400 bg-red-400/10 border-red-400/20";

  // Default starter code based on the problem slug
  const defaultCode = `// ${problem.title}
// Difficulty: ${problem.difficulty}

function solution(args) {
  // Write your code here
  
}`;

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 px-6 py-4 flex items-center justify-between backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/problems"
            className="p-2 hover:bg-white/10 rounded-lg transition-colors text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-white flex items-center gap-3">
              {problem.title}
              <span
                className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${difficultyColor}`}
              >
                {problem.difficulty}
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {problem.leetcode_link && (
            <a
              href={problem.leetcode_link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#FFA116]/10 text-[#FFA116] hover:bg-[#FFA116]/20 border border-[#FFA116]/20 transition-all text-sm font-medium"
            >
              <LeetCodeIcon className="w-4 h-4" />
              Solve on LeetCode
            </a>
          )}
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20 transition-all text-sm font-medium">
            <Play className="w-4 h-4" />
            Run Code
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all text-sm font-medium shadow-lg shadow-blue-500/20">
            <CheckCircle2 className="w-4 h-4" />
            Submit
          </button>
        </div>
      </header>

      {/* Main Content - Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Problem Description */}
        <div className="w-1/2 border-r border-white/10 overflow-y-auto p-6 bg-black/20">
          <div className="prose prose-invert max-w-none">
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
              <p className="text-gray-300 leading-relaxed text-base">
                {problem.description}
              </p>
            </div>

            {/* Companies & Pattern Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {problem.companies?.map((company: string) => (
                <span
                  key={company}
                  className="px-3 py-1 rounded-md bg-white/5 text-gray-400 text-xs border border-white/10"
                >
                  {company}
                </span>
              ))}
              <span className="px-3 py-1 rounded-md bg-purple-500/10 text-purple-400 text-xs border border-purple-500/20">
                {problem.category}
              </span>
            </div>

            {/* Examples Placeholder - In a real app, this would come from the DB */}
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                Example 1
              </h3>
              <div className="bg-black/40 rounded-lg p-4 border border-white/5 font-mono text-sm">
                <div className="mb-2">
                  <span className="text-gray-500">Input:</span>{" "}
                  <span className="text-white">nums = [2,7,11,15], target = 9</span>
                </div>
                <div>
                  <span className="text-gray-500">Output:</span>{" "}
                  <span className="text-white">[0,1]</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Code Editor */}
        <div className="w-1/2 flex flex-col bg-[#1e1e1e]">
          <CodeEditor defaultCode={defaultCode} language="javascript" />
        </div>
      </div>
    </div>
  );
}
