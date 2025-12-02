import Link from 'next/link'
import { Code2, Coffee, FileCode, Braces, ArrowRight, BookOpen, CheckCircle2 } from 'lucide-react'

const languages = [
  {
    id: 'java',
    name: 'Java',
    icon: Coffee,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    description: 'Learn OOP with the most popular enterprise language',
    topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Abstraction'],
    level: 'Beginner Friendly'
  },
  {
    id: 'python',
    name: 'Python',
    icon: FileCode,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    description: 'Master OOP concepts with clean Python syntax',
    topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Encapsulation', 'Magic Methods'],
    level: 'Beginner Friendly'
  },
  {
    id: 'cpp',
    name: 'C++',
    icon: Braces,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    description: 'Deep dive into OOP with powerful C++ features',
    topics: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Virtual Functions', 'Templates'],
    level: 'Intermediate'
  }
]

const oopsConcepts = [
  { name: 'Classes & Objects', description: 'Blueprint and instances of real-world entities' },
  { name: 'Encapsulation', description: 'Bundling data and methods, hiding internal details' },
  { name: 'Inheritance', description: 'Creating new classes from existing ones' },
  { name: 'Polymorphism', description: 'Same interface, different implementations' },
  { name: 'Abstraction', description: 'Hiding complexity, showing only essentials' },
]

export default function OOPSPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Code2 className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            OOPS - Object Oriented Programming
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base max-w-2xl">
          Master the four pillars of Object-Oriented Programming. Choose your preferred language and learn OOP concepts with practical examples.
        </p>
      </div>

      {/* OOP Pillars Overview */}
      <div className="p-4 md:p-6 rounded-xl border border-purple-500/20 bg-purple-500/5">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-purple-500" />
          The Four Pillars of OOP
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {oopsConcepts.map((concept, index) => (
            <div 
              key={concept.name}
              className="p-3 rounded-lg bg-background/50 border border-border/40"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono text-purple-500">{index + 1}</span>
                <h3 className="text-sm font-medium">{concept.name}</h3>
              </div>
              <p className="text-xs text-muted-foreground">{concept.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Language Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Choose Your Language</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {languages.map((lang) => (
            <Link
              key={lang.id}
              href={`/dashboard/oops/${lang.id}`}
              className={`group p-6 rounded-xl border ${lang.borderColor} ${lang.bgColor} hover:scale-[1.02] transition-all duration-300`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-lg ${lang.bgColor}`}>
                  <lang.icon className={`w-6 h-6 ${lang.color}`} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{lang.name}</h3>
                  <span className={`text-xs ${lang.color}`}>{lang.level}</span>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">
                {lang.description}
              </p>

              <div className="space-y-2 mb-4">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Topics Covered:</p>
                <div className="flex flex-wrap gap-1.5">
                  {lang.topics.slice(0, 3).map((topic) => (
                    <span 
                      key={topic}
                      className="text-xs px-2 py-1 rounded-full bg-background/50 text-foreground/80"
                    >
                      {topic}
                    </span>
                  ))}
                  <span className="text-xs px-2 py-1 text-muted-foreground">
                    +{lang.topics.length - 3} more
                  </span>
                </div>
              </div>

              <div className={`flex items-center gap-2 text-sm font-medium ${lang.color} group-hover:gap-3 transition-all`}>
                Start Learning
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Why Learn OOP */}
      <div className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5">
        <h2 className="text-lg font-semibold mb-4">Why Learn OOP?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">Industry Standard</h4>
              <p className="text-sm text-muted-foreground">Used in most enterprise applications and frameworks</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">Code Reusability</h4>
              <p className="text-sm text-muted-foreground">Write once, use many times with inheritance</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">Better Organization</h4>
              <p className="text-sm text-muted-foreground">Structure code in logical, maintainable units</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium">Interview Essential</h4>
              <p className="text-sm text-muted-foreground">Required knowledge for tech interviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
