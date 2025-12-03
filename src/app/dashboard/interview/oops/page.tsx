import Link from 'next/link'
import { Boxes, ArrowLeft, Coffee, FileCode, Braces, CheckCircle2, BookmarkPlus } from 'lucide-react'

const oopsQuestions = [
  {
    id: 1,
    question: 'What are the 4 pillars of Object-Oriented Programming?',
    answer: `The four pillars of OOP are:

1. **Encapsulation**: Bundling data and methods that operate on that data within a single unit (class), and restricting direct access to some components.

2. **Abstraction**: Hiding complex implementation details and showing only the necessary features of an object.

3. **Inheritance**: A mechanism where a new class inherits properties and behaviors from an existing class.

4. **Polymorphism**: The ability of objects to take on many forms. Same method name can behave differently based on the object.`,
    difficulty: 'Easy',
    companies: ['Amazon', 'Google', 'Microsoft'],
    language: 'all',
    frequency: 95
  },
  {
    id: 2,
    question: 'What is the difference between Abstract Class and Interface?',
    answer: `**Abstract Class:**
- Can have both abstract and concrete methods
- Can have instance variables
- Supports constructors
- A class can extend only one abstract class
- Can have access modifiers (public, private, protected)

**Interface:**
- All methods are abstract by default (Java 8+ allows default methods)
- Can only have constants (static final variables)
- No constructors
- A class can implement multiple interfaces
- All methods are public by default

**When to use:**
- Abstract class: When classes share common behavior
- Interface: When you want to define a contract for unrelated classes`,
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    language: 'java',
    frequency: 90
  },
  {
    id: 3,
    question: 'Explain Method Overloading vs Method Overriding',
    answer: `**Method Overloading (Compile-time Polymorphism):**
- Same method name, different parameters
- Happens within the same class
- Return type can be different
- Also called static polymorphism

\`\`\`java
class Calculator {
    int add(int a, int b) { return a + b; }
    double add(double a, double b) { return a + b; }
    int add(int a, int b, int c) { return a + b + c; }
}
\`\`\`

**Method Overriding (Runtime Polymorphism):**
- Same method name and parameters
- Happens in parent-child relationship
- Return type must be same or covariant
- Also called dynamic polymorphism

\`\`\`java
class Animal {
    void sound() { System.out.println("Some sound"); }
}
class Dog extends Animal {
    @Override
    void sound() { System.out.println("Bark!"); }
}
\`\`\``,
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'Apple'],
    language: 'java',
    frequency: 88
  },
  {
    id: 4,
    question: 'What are SOLID principles? Explain each.',
    answer: `SOLID is an acronym for 5 design principles:

**S - Single Responsibility Principle**
A class should have only one reason to change (one job).

**O - Open/Closed Principle**
Classes should be open for extension but closed for modification.

**L - Liskov Substitution Principle**
Derived classes must be substitutable for their base classes.

**I - Interface Segregation Principle**
Many specific interfaces are better than one general interface.

**D - Dependency Inversion Principle**
Depend on abstractions, not concrete implementations.

These principles help create maintainable, scalable, and testable code.`,
    difficulty: 'Medium',
    companies: ['Google', 'Meta', 'Amazon'],
    language: 'all',
    frequency: 85
  },
  {
    id: 5,
    question: 'What is the difference between Composition and Inheritance?',
    answer: `**Inheritance (IS-A relationship):**
- Child class inherits from parent class
- Tight coupling between classes
- Changes in parent affect child
- Use when there's a true IS-A relationship

\`\`\`java
class Dog extends Animal { } // Dog IS-A Animal
\`\`\`

**Composition (HAS-A relationship):**
- Class contains objects of other classes
- Loose coupling, more flexible
- Can change behavior at runtime
- Preferred over inheritance

\`\`\`java
class Car {
    private Engine engine; // Car HAS-A Engine
    private Wheel[] wheels;
}
\`\`\`

**Rule of thumb:** "Favor composition over inheritance" - Gang of Four`,
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft'],
    language: 'all',
    frequency: 82
  },
  {
    id: 6,
    question: 'What is a Constructor? Types of constructors?',
    answer: `**Constructor:** A special method called when an object is created. Used to initialize object state.

**Types:**

1. **Default Constructor:**
\`\`\`java
class Car {
    Car() { } // No parameters
}
\`\`\`

2. **Parameterized Constructor:**
\`\`\`java
class Car {
    String brand;
    Car(String brand) {
        this.brand = brand;
    }
}
\`\`\`

3. **Copy Constructor:**
\`\`\`java
class Car {
    String brand;
    Car(Car other) {
        this.brand = other.brand;
    }
}
\`\`\`

**Key Points:**
- Same name as class
- No return type
- Called automatically on object creation
- Can be overloaded`,
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'TCS'],
    language: 'java',
    frequency: 80
  },
  {
    id: 7,
    question: 'Explain Access Modifiers in Java/C++',
    answer: `**Java Access Modifiers:**

| Modifier | Class | Package | Subclass | World |
|----------|-------|---------|----------|-------|
| public | ✅ | ✅ | ✅ | ✅ |
| protected | ✅ | ✅ | ✅ | ❌ |
| default | ✅ | ✅ | ❌ | ❌ |
| private | ✅ | ❌ | ❌ | ❌ |

**C++ Access Modifiers:**
- **public**: Accessible from anywhere
- **private**: Only within the class
- **protected**: Within class and derived classes

\`\`\`cpp
class Example {
public:
    int publicVar;
protected:
    int protectedVar;
private:
    int privateVar;
};
\`\`\``,
    difficulty: 'Easy',
    companies: ['Amazon', 'Microsoft', 'Infosys'],
    language: 'all',
    frequency: 78
  },
  {
    id: 8,
    question: 'What is Virtual Function? What is Pure Virtual Function?',
    answer: `**Virtual Function (C++):**
A function declared in base class with \`virtual\` keyword that can be overridden in derived class. Enables runtime polymorphism.

\`\`\`cpp
class Animal {
public:
    virtual void sound() {
        cout << "Some sound";
    }
};

class Dog : public Animal {
public:
    void sound() override {
        cout << "Bark!";
    }
};

Animal* a = new Dog();
a->sound(); // Output: Bark! (dynamic binding)
\`\`\`

**Pure Virtual Function:**
A virtual function with no implementation (= 0). Makes the class abstract.

\`\`\`cpp
class Shape {
public:
    virtual double area() = 0; // Pure virtual
};

class Circle : public Shape {
public:
    double area() override {
        return 3.14 * r * r;
    }
};
\`\`\`

**Key Points:**
- Virtual = can be overridden
- Pure virtual = must be overridden
- Class with pure virtual function = abstract class`,
    difficulty: 'Medium',
    companies: ['Google', 'Microsoft', 'Amazon'],
    language: 'cpp',
    frequency: 75
  },
  {
    id: 9,
    question: 'What is Diamond Problem in Multiple Inheritance?',
    answer: `**Diamond Problem:** An ambiguity that arises when a class inherits from two classes that have a common base class.

\`\`\`
       A
      / \\
     B   C
      \\ /
       D
\`\`\`

Class D inherits from both B and C, which both inherit from A. This creates ambiguity about which version of A's members D should use.

**Solutions:**

**C++ - Virtual Inheritance:**
\`\`\`cpp
class A { };
class B : virtual public A { };
class C : virtual public A { };
class D : public B, public C { }; // Only one copy of A
\`\`\`

**Java - No multiple inheritance of classes:**
Java avoids this by allowing only single class inheritance, but permits multiple interface implementation.

**Python - MRO (Method Resolution Order):**
\`\`\`python
class D(B, C):
    pass
# Uses C3 linearization algorithm
print(D.__mro__)
\`\`\``,
    difficulty: 'Hard',
    companies: ['Google', 'Amazon', 'Microsoft'],
    language: 'all',
    frequency: 70
  },
  {
    id: 10,
    question: 'What is the difference between this and super keyword?',
    answer: `**this keyword:**
- Refers to the current object
- Used to access current class members
- Can be used to call current class constructor

\`\`\`java
class Car {
    String brand;
    
    Car(String brand) {
        this.brand = brand; // this.brand = instance variable
    }
    
    void display() {
        System.out.println(this.brand);
    }
}
\`\`\`

**super keyword:**
- Refers to the parent class object
- Used to access parent class members
- Can be used to call parent class constructor

\`\`\`java
class Vehicle {
    String type = "Vehicle";
    void start() { System.out.println("Vehicle starting"); }
}

class Car extends Vehicle {
    String type = "Car";
    
    void display() {
        System.out.println(super.type); // "Vehicle"
        System.out.println(this.type);  // "Car"
        super.start(); // Calls parent method
    }
}
\`\`\``,
    difficulty: 'Easy',
    companies: ['TCS', 'Infosys', 'Wipro', 'Amazon'],
    language: 'java',
    frequency: 85
  },
  {
    id: 11,
    question: 'What is the difference between Shallow Copy and Deep Copy?',
    answer: `**Shallow Copy:**
- Creates a new object but copies references
- Changes to nested objects affect both copies
- Faster, uses less memory

\`\`\`python
import copy
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
shallow[0][0] = 99
print(original)  # [[99, 2], [3, 4]] - Changed!
\`\`\`

**Deep Copy:**
- Creates a new object and recursively copies all nested objects
- Completely independent copy
- Slower, uses more memory

\`\`\`python
import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0][0] = 99
print(original)  # [[1, 2], [3, 4]] - Unchanged!
\`\`\`

**Key Point:** Deep copy for complete independence, shallow copy for performance.`,
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Microsoft'],
    language: 'all',
    frequency: 78
  },
  {
    id: 12,
    question: 'What is the Singleton Design Pattern?',
    answer: `**Singleton:** Ensures a class has only one instance and provides global access to it.

**Use Cases:**
- Database connection pool
- Logger
- Configuration manager
- Thread pool

\`\`\`java
public class Singleton {
    private static Singleton instance;
    
    private Singleton() {} // Private constructor
    
    public static Singleton getInstance() {
        if (instance == null) {
            instance = new Singleton();
        }
        return instance;
    }
}
\`\`\`

**Thread-Safe Version:**
\`\`\`java
public class Singleton {
    private static volatile Singleton instance;
    
    public static Singleton getInstance() {
        if (instance == null) {
            synchronized (Singleton.class) {
                if (instance == null) {
                    instance = new Singleton();
                }
            }
        }
        return instance;
    }
}
\`\`\``,
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Google', 'Uber'],
    language: 'java',
    frequency: 82
  },
  {
    id: 13,
    question: 'What is the Factory Design Pattern?',
    answer: `**Factory Pattern:** Creates objects without specifying exact class. Delegates creation to subclasses.

**Benefits:**
- Loose coupling
- Easy to extend
- Encapsulates creation logic

\`\`\`java
// Product interface
interface Shape {
    void draw();
}

// Concrete products
class Circle implements Shape {
    public void draw() { System.out.println("Drawing Circle"); }
}
class Square implements Shape {
    public void draw() { System.out.println("Drawing Square"); }
}

// Factory
class ShapeFactory {
    public Shape createShape(String type) {
        if (type.equals("circle")) return new Circle();
        if (type.equals("square")) return new Square();
        return null;
    }
}

// Usage
ShapeFactory factory = new ShapeFactory();
Shape shape = factory.createShape("circle");
shape.draw();
\`\`\``,
    difficulty: 'Medium',
    companies: ['Amazon', 'Google', 'Meta', 'Microsoft'],
    language: 'java',
    frequency: 80
  },
  {
    id: 14,
    question: 'What is the difference between Static and Dynamic Binding?',
    answer: `**Static Binding (Early Binding):**
- Resolved at compile time
- Used for: static methods, final methods, private methods, overloaded methods
- Faster execution

**Dynamic Binding (Late Binding):**
- Resolved at runtime
- Used for: overridden methods (virtual methods)
- Enables polymorphism

\`\`\`java
class Animal {
    static void staticMethod() { System.out.println("Animal static"); }
    void instanceMethod() { System.out.println("Animal instance"); }
}

class Dog extends Animal {
    static void staticMethod() { System.out.println("Dog static"); }
    void instanceMethod() { System.out.println("Dog instance"); }
}

Animal a = new Dog();
a.staticMethod();    // "Animal static" - Static binding
a.instanceMethod();  // "Dog instance" - Dynamic binding
\`\`\``,
    difficulty: 'Medium',
    companies: ['Amazon', 'Microsoft', 'Oracle'],
    language: 'java',
    frequency: 72
  },
  {
    id: 15,
    question: 'What is Cohesion and Coupling?',
    answer: `**Cohesion:** How closely related the responsibilities of a module are.
- High Cohesion = GOOD (single responsibility)
- Low Cohesion = BAD (does too many things)

**Coupling:** How dependent modules are on each other.
- Low Coupling = GOOD (independent modules)
- High Coupling = BAD (changes cascade)

**Goal:** High Cohesion + Low Coupling

**Example of BAD design:**
\`\`\`java
class UserService {
    void registerUser() { }
    void sendEmail() { }     // Low cohesion
    void generateReport() { } // Not related!
}
\`\`\`

**Example of GOOD design:**
\`\`\`java
class UserService {
    void registerUser() { }
    void updateUser() { }
    void deleteUser() { }    // High cohesion
}

class EmailService {
    void sendEmail() { }     // Separate concern
}
\`\`\``,
    difficulty: 'Medium',
    companies: ['Google', 'Amazon', 'Microsoft'],
    language: 'all',
    frequency: 75
  }
]

const languageFilters = [
  { id: 'all', name: 'All Languages', icon: Boxes },
  { id: 'java', name: 'Java', icon: Coffee },
  { id: 'python', name: 'Python', icon: FileCode },
  { id: 'cpp', name: 'C++', icon: Braces },
]

export default function OOPSInterviewPage() {
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
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <Boxes className="w-6 h-6 text-purple-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            OOP Interview Questions
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Most frequently asked Object-Oriented Programming questions in tech interviews.
        </p>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-2">
        {languageFilters.map((lang) => (
          <button
            key={lang.id}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              lang.id === 'all' 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
            }`}
          >
            <lang.icon className="w-4 h-4" />
            {lang.name}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {oopsQuestions.map((q, index) => (
          <div
            key={q.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 font-bold shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{q.question}</h3>
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      q.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                      q.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Asked {q.frequency}% of interviews
                    </span>
                  </div>
                </div>
              </div>
              <button className="p-2 hover:bg-secondary rounded-lg transition-colors shrink-0">
                <BookmarkPlus className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Companies */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {q.companies.map((company) => (
                <span 
                  key={company}
                  className="text-xs px-2 py-1 rounded-full bg-background/50 border border-border/40"
                >
                  {company}
                </span>
              ))}
            </div>

            {/* Answer */}
            <div className="p-4 rounded-lg bg-background/50 border border-border/40">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span className="text-sm font-medium text-green-500">Answer</span>
              </div>
              <div 
                className="text-sm text-muted-foreground whitespace-pre-wrap prose prose-sm prose-invert max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: q.answer
                    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs my-2"><code>$2</code></pre>')
                    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                    .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1 rounded text-purple-400">$1</code>')
                    .replace(/\n/g, '<br/>')
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
