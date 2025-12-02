import Link from 'next/link'
import { 
  MessageSquareQuote, 
  Code2, 
  Building2, 
  Boxes,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users
} from 'lucide-react'

const categories = [
  {
    id: 'oops',
    name: 'OOP Questions',
    icon: Boxes,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    description: 'Object-Oriented Programming interview questions',
    languages: ['Java', 'Python', 'C++'],
    questionCount: 50,
    difficulty: 'All Levels'
  },
  {
    id: 'dsa',
    name: 'DSA Questions',
    icon: Code2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Data Structures & Algorithms interview questions',
    languages: ['Arrays', 'Strings', 'Trees', 'Graphs', 'DP'],
    questionCount: 150,
    difficulty: 'All Levels'
  },
  {
    id: 'company',
    name: 'Company Wise',
    icon: Building2,
    color: 'text-green-500',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    description: 'Questions asked by top tech companies',
    languages: ['Amazon', 'Google', 'Meta', 'Microsoft', 'Apple'],
    questionCount: 200,
    difficulty: 'Medium to Hard'
  }
]

const topCompanies = [
  { name: 'Amazon', count: 45, color: 'text-orange-500' },
  { name: 'Google', count: 38, color: 'text-blue-500' },
  { name: 'Meta', count: 32, color: 'text-indigo-500' },
  { name: 'Microsoft', count: 28, color: 'text-cyan-500' },
  { name: 'Apple', count: 22, color: 'text-gray-400' },
]

const featuredQuestions = [
  { title: 'Explain the 4 pillars of OOP', category: 'OOPS', difficulty: 'Easy', company: 'Amazon' },
  { title: 'Difference between Abstract Class and Interface', category: 'OOPS', difficulty: 'Medium', company: 'Google' },
  { title: 'What is method overloading vs overriding?', category: 'OOPS', difficulty: 'Easy', company: 'Microsoft' },
  { title: 'Explain SOLID principles', category: 'OOPS', difficulty: 'Medium', company: 'Meta' },
]

export default function InterviewPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <MessageSquareQuote className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Interview Questions
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl">
          Prepare for your tech interviews with curated questions from MAANG companies. Practice OOP, DSA, and company-specific questions.
        </p>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
        <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <MessageSquareQuote className="w-4 h-4" />
            <span className="text-xs">Total Questions</span>
          </div>
          <p className="text-2xl font-bold">400+</p>
        </div>
        <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Building2 className="w-4 h-4" />
            <span className="text-xs">Companies</span>
          </div>
          <p className="text-2xl font-bold">50+</p>
        </div>
        <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <TrendingUp className="w-4 h-4" />
            <span className="text-xs">Success Rate</span>
          </div>
          <p className="text-2xl font-bold">89%</p>
        </div>
        <div className="p-4 rounded-xl border border-border/40 bg-secondary/5">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Users className="w-4 h-4" />
            <span className="text-xs">Users Practicing</span>
          </div>
          <p className="text-2xl font-bold">5K+</p>
        </div>
      </div>

      {/* Category Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Browse by Category</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/dashboard/interview/${category.id}`}
              className={`group p-6 rounded-xl border ${category.borderColor} ${category.bgColor} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${category.bgColor}`}>
                  <category.icon className={`w-6 h-6 ${category.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                  <span className="text-xs text-muted-foreground">{category.questionCount} questions</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {category.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {category.languages.slice(0, 4).map((lang) => (
                  <span 
                    key={lang}
                    className="text-xs px-2 py-1 rounded-full bg-background/50 text-foreground/80"
                  >
                    {lang}
                  </span>
                ))}
                {category.languages.length > 4 && (
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{category.languages.length - 4} more
                  </span>
                )}
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium ${category.color} group-hover:gap-3 transition-all`}>
                Start Practicing
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top Companies */}
      <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building2 className="w-5 h-5 text-primary" />
          Top Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {topCompanies.map((company) => (
            <Link
              key={company.name}
              href={`/dashboard/interview/company?filter=${company.name.toLowerCase()}`}
              className="p-4 rounded-lg bg-background/50 border border-border/40 hover:bg-secondary/30 transition-colors text-center"
            >
              <p className={`font-semibold ${company.color}`}>{company.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{company.count} questions</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Questions */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-500" />
            Most Asked Questions
          </h2>
          <Link href="/dashboard/interview/oops" className="text-sm text-primary hover:underline">
            View all →
          </Link>
        </div>
        <div className="space-y-3">
          {featuredQuestions.map((question, index) => (
            <div
              key={index}
              className="p-4 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {index + 1}
                </div>
                <div>
                  <p className="font-medium text-sm md:text-base">{question.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">{question.category}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{question.company}</span>
                  </div>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                question.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                question.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                'bg-red-500/10 text-red-500'
              }`}>
                {question.difficulty}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
