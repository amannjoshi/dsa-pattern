import Link from 'next/link'
import { ArrowLeft, Building2, Code2, Boxes, Clock, TrendingUp, ExternalLink, Star, CheckCircle2 } from 'lucide-react'

const companies = [
  {
    id: 'amazon',
    name: 'Amazon',
    logo: '🔶',
    color: 'orange',
    totalQuestions: 150,
    focusAreas: ['Arrays', 'Trees', 'System Design', 'Leadership Principles'],
    hiringBar: 'High',
    interviewRounds: 5,
    topQuestions: [
      { title: 'Two Sum', difficulty: 'Easy', topic: 'Arrays' },
      { title: 'LRU Cache', difficulty: 'Medium', topic: 'Design' },
      { title: 'Number of Islands', difficulty: 'Medium', topic: 'Graphs' },
      { title: 'Merge K Sorted Lists', difficulty: 'Hard', topic: 'Heap' },
      { title: 'Word Ladder', difficulty: 'Hard', topic: 'BFS' },
    ],
    tips: [
      'Focus on Leadership Principles - they matter as much as coding',
      'Practice Amazon OA patterns',
      'Be ready to discuss trade-offs in system design',
      'Use STAR method for behavioral questions'
    ]
  },
  {
    id: 'google',
    name: 'Google',
    logo: '🔵',
    color: 'blue',
    totalQuestions: 180,
    focusAreas: ['Dynamic Programming', 'Graphs', 'Trees', 'Math'],
    hiringBar: 'Very High',
    interviewRounds: 5,
    topQuestions: [
      { title: 'Median of Two Sorted Arrays', difficulty: 'Hard', topic: 'Binary Search' },
      { title: 'Regular Expression Matching', difficulty: 'Hard', topic: 'DP' },
      { title: 'Word Break', difficulty: 'Medium', topic: 'DP' },
      { title: 'Course Schedule', difficulty: 'Medium', topic: 'Graphs' },
      { title: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', topic: 'Trees' },
    ],
    tips: [
      'Master Dynamic Programming - Google loves it',
      'Practice explaining your thought process clearly',
      'Focus on optimal solutions, not just working ones',
      'Prepare for Googleyness interviews'
    ]
  },
  {
    id: 'meta',
    name: 'Meta',
    logo: '🔷',
    color: 'indigo',
    totalQuestions: 120,
    focusAreas: ['Trees', 'Graphs', 'Arrays', 'Recursion'],
    hiringBar: 'High',
    interviewRounds: 4,
    topQuestions: [
      { title: 'Valid Palindrome II', difficulty: 'Easy', topic: 'Strings' },
      { title: 'Binary Tree Vertical Order Traversal', difficulty: 'Medium', topic: 'Trees' },
      { title: 'K Closest Points to Origin', difficulty: 'Medium', topic: 'Heap' },
      { title: 'Minimum Remove to Make Valid Parentheses', difficulty: 'Medium', topic: 'Stack' },
      { title: 'Random Pick with Weight', difficulty: 'Medium', topic: 'Binary Search' },
    ],
    tips: [
      'Meta asks more medium-level questions than hard',
      'Speed matters - practice solving under 25 mins',
      'Know your data structures inside out',
      'Be ready to code in a shared doc environment'
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logo: '🟦',
    color: 'cyan',
    totalQuestions: 130,
    focusAreas: ['Arrays', 'Strings', 'Trees', 'Design'],
    hiringBar: 'High',
    interviewRounds: 4,
    topQuestions: [
      { title: 'Add Two Numbers', difficulty: 'Medium', topic: 'Linked List' },
      { title: 'Spiral Matrix', difficulty: 'Medium', topic: 'Arrays' },
      { title: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', topic: 'Binary Search' },
      { title: 'Word Search', difficulty: 'Medium', topic: 'Backtracking' },
      { title: 'Longest Palindromic Substring', difficulty: 'Medium', topic: 'DP' },
    ],
    tips: [
      'Microsoft values good code quality and testing',
      'Ask clarifying questions before diving in',
      'Show awareness of edge cases',
      'Be ready to extend your solution'
    ]
  },
  {
    id: 'apple',
    name: 'Apple',
    logo: '🍎',
    color: 'gray',
    totalQuestions: 90,
    focusAreas: ['Arrays', 'Strings', 'Design', 'iOS Knowledge'],
    hiringBar: 'Very High',
    interviewRounds: 5,
    topQuestions: [
      { title: '3Sum', difficulty: 'Medium', topic: 'Arrays' },
      { title: 'Group Anagrams', difficulty: 'Medium', topic: 'Hash Table' },
      { title: 'Product of Array Except Self', difficulty: 'Medium', topic: 'Arrays' },
      { title: 'Merge Intervals', difficulty: 'Medium', topic: 'Intervals' },
      { title: 'Top K Frequent Elements', difficulty: 'Medium', topic: 'Heap' },
    ],
    tips: [
      'Apple is secretive - focus on fundamentals',
      'Product sense is important for many roles',
      'Know your specific domain deeply',
      'Prepare for design discussions'
    ]
  },
  {
    id: 'netflix',
    name: 'Netflix',
    logo: '🔴',
    color: 'red',
    totalQuestions: 60,
    focusAreas: ['System Design', 'Distributed Systems', 'Concurrency'],
    hiringBar: 'Very High',
    interviewRounds: 4,
    topQuestions: [
      { title: 'LRU Cache', difficulty: 'Medium', topic: 'Design' },
      { title: 'Design Netflix', difficulty: 'Hard', topic: 'System Design' },
      { title: 'Concurrent HashMap', difficulty: 'Hard', topic: 'Concurrency' },
      { title: 'Rate Limiter', difficulty: 'Medium', topic: 'Design' },
      { title: 'URL Shortener', difficulty: 'Medium', topic: 'System Design' },
    ],
    tips: [
      'Netflix focuses heavily on senior roles',
      'Culture fit is as important as skills',
      'Be ready for deep system design discussions',
      'Show independent thinking and decision making'
    ]
  }
]

const colorClasses: Record<string, { bg: string, text: string, border: string }> = {
  orange: { bg: 'bg-orange-500/10', text: 'text-orange-500', border: 'border-orange-500/30' },
  blue: { bg: 'bg-blue-500/10', text: 'text-blue-500', border: 'border-blue-500/30' },
  indigo: { bg: 'bg-indigo-500/10', text: 'text-indigo-500', border: 'border-indigo-500/30' },
  cyan: { bg: 'bg-cyan-500/10', text: 'text-cyan-500', border: 'border-cyan-500/30' },
  gray: { bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/30' },
  red: { bg: 'bg-red-500/10', text: 'text-red-500', border: 'border-red-500/30' },
}

export default function CompanyInterviewPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/interview" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Interview Questions
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-green-500/10 rounded-lg">
            <Building2 className="w-6 h-6 text-green-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Company-Wise Interview Prep
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Targeted preparation guides for top tech companies. Learn their patterns and ace your interviews.
        </p>
      </div>

      {/* Company Quick Stats */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {companies.map((company) => (
          <a
            key={company.id}
            href={`#${company.id}`}
            className={`p-3 rounded-xl border ${colorClasses[company.color].border} ${colorClasses[company.color].bg} hover:scale-105 transition-transform text-center`}
          >
            <span className="text-2xl">{company.logo}</span>
            <p className={`text-xs font-medium mt-1 ${colorClasses[company.color].text}`}>{company.name}</p>
            <p className="text-xs text-muted-foreground">{company.totalQuestions}+ Qs</p>
          </a>
        ))}
      </div>

      {/* Company Cards */}
      <div className="space-y-8">
        {companies.map((company) => (
          <div
            key={company.id}
            id={company.id}
            className={`p-4 md:p-6 rounded-xl border ${colorClasses[company.color].border} ${colorClasses[company.color].bg}`}
          >
            {/* Company Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-background/50 flex items-center justify-center text-3xl">
                  {company.logo}
                </div>
                <div>
                  <h2 className="text-xl font-bold">{company.name}</h2>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Code2 className="w-4 h-4" />
                      {company.totalQuestions}+ Questions
                    </span>
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {company.interviewRounds} Rounds
                    </span>
                    <span className={`text-sm px-2 py-0.5 rounded-full ${
                      company.hiringBar === 'Very High' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-500'
                    }`}>
                      {company.hiringBar} Bar
                    </span>
                  </div>
                </div>
              </div>
              <button className={`px-4 py-2 rounded-lg text-sm font-medium ${colorClasses[company.color].bg} ${colorClasses[company.color].text} border ${colorClasses[company.color].border}`}>
                Start Prep
              </button>
            </div>

            {/* Focus Areas */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                Focus Areas
              </h3>
              <div className="flex flex-wrap gap-2">
                {company.focusAreas.map((area) => (
                  <span 
                    key={area}
                    className="px-3 py-1 rounded-full bg-background/50 border border-border/40 text-sm"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Top Questions */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500" />
                  Most Asked Questions
                </h3>
                <div className="space-y-2">
                  {company.topQuestions.map((q, idx) => (
                    <div 
                      key={idx}
                      className="flex items-center justify-between p-2 rounded-lg hover:bg-secondary/50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground w-5">{idx + 1}.</span>
                        <span className="text-sm">{q.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                          q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                          'bg-red-500/10 text-red-500'
                        }`}>
                          {q.difficulty}
                        </span>
                        <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interview Tips */}
              <div className="p-4 rounded-lg bg-background/50 border border-border/40">
                <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Interview Tips
                </h3>
                <ul className="space-y-2">
                  {company.tips.map((tip, idx) => (
                    <li 
                      key={idx}
                      className="flex items-start gap-3 text-sm text-muted-foreground"
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${colorClasses[company.color].bg} ${colorClasses[company.color].text} mt-2 shrink-0`} />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
