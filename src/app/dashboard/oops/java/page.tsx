import Link from 'next/link'
import { Coffee, ArrowLeft, BookOpen, Code2, CheckCircle2, PlayCircle } from 'lucide-react'

const javaTopics = [
  {
    id: 1,
    title: 'Classes and Objects',
    description: 'Learn how to define classes and create objects in Java',
    content: `
## What is a Class?
A class is a blueprint or template for creating objects. It defines properties (fields) and behaviors (methods).

## What is an Object?
An object is an instance of a class - a concrete entity created from the class blueprint.

## Syntax
\`\`\`java
// Defining a class
public class Car {
    // Fields (properties)
    String brand;
    String color;
    int speed;
    
    // Constructor
    public Car(String brand, String color) {
        this.brand = brand;
        this.color = color;
        this.speed = 0;
    }
    
    // Methods (behaviors)
    public void accelerate() {
        speed += 10;
        System.out.println(brand + " is now going " + speed + " km/h");
    }
    
    public void brake() {
        speed = Math.max(0, speed - 10);
        System.out.println(brand + " slowed down to " + speed + " km/h");
    }
}

// Creating objects
public class Main {
    public static void main(String[] args) {
        Car myCar = new Car("Toyota", "Red");
        Car yourCar = new Car("Honda", "Blue");
        
        myCar.accelerate();  // Toyota is now going 10 km/h
        yourCar.accelerate(); // Honda is now going 10 km/h
    }
}
\`\`\`

## Key Points
- Use \`class\` keyword to define a class
- Use \`new\` keyword to create objects
- \`this\` refers to the current object
- Constructor has the same name as the class
    `,
    completed: false
  },
  {
    id: 2,
    title: 'Encapsulation',
    description: 'Hide internal data and provide controlled access through getters/setters',
    content: `
## What is Encapsulation?
Encapsulation is bundling data (fields) and methods that operate on that data within a class, and restricting direct access to some components.

## Access Modifiers
- \`private\`: Only accessible within the class
- \`protected\`: Accessible within package and subclasses
- \`public\`: Accessible from anywhere
- \`default\`: Accessible within the same package

## Syntax
\`\`\`java
public class BankAccount {
    // Private fields - hidden from outside
    private String accountNumber;
    private double balance;
    
    // Constructor
    public BankAccount(String accountNumber, double initialBalance) {
        this.accountNumber = accountNumber;
        this.balance = initialBalance;
    }
    
    // Getter - controlled read access
    public double getBalance() {
        return balance;
    }
    
    // No setter for accountNumber - it's read-only
    public String getAccountNumber() {
        return accountNumber;
    }
    
    // Controlled modification through methods
    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("Deposited: " + amount);
        }
    }
    
    public boolean withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            System.out.println("Withdrawn: " + amount);
            return true;
        }
        System.out.println("Insufficient funds!");
        return false;
    }
}
\`\`\`

## Benefits
- Data hiding and security
- Controlled access to data
- Flexibility to change implementation
- Validation before modification
    `,
    completed: false
  },
  {
    id: 3,
    title: 'Inheritance',
    description: 'Create new classes that inherit properties and methods from existing classes',
    content: `
## What is Inheritance?
Inheritance allows a class (child/subclass) to inherit properties and methods from another class (parent/superclass).

## Types of Inheritance in Java
- Single Inheritance: One parent, one child
- Multilevel Inheritance: Chain of inheritance
- Hierarchical Inheritance: One parent, multiple children
- Note: Java doesn't support multiple inheritance with classes (use interfaces)

## Syntax
\`\`\`java
// Parent class (Superclass)
public class Animal {
    protected String name;
    protected int age;
    
    public Animal(String name, int age) {
        this.name = name;
        this.age = age;
    }
    
    public void eat() {
        System.out.println(name + " is eating");
    }
    
    public void sleep() {
        System.out.println(name + " is sleeping");
    }
}

// Child class (Subclass)
public class Dog extends Animal {
    private String breed;
    
    public Dog(String name, int age, String breed) {
        super(name, age);  // Call parent constructor
        this.breed = breed;
    }
    
    // New method specific to Dog
    public void bark() {
        System.out.println(name + " says: Woof! Woof!");
    }
    
    // Override parent method
    @Override
    public void eat() {
        System.out.println(name + " the " + breed + " is eating dog food");
    }
}

// Usage
public class Main {
    public static void main(String[] args) {
        Dog myDog = new Dog("Buddy", 3, "Golden Retriever");
        myDog.eat();    // Overridden method
        myDog.sleep();  // Inherited method
        myDog.bark();   // Dog's own method
    }
}
\`\`\`

## Key Points
- Use \`extends\` keyword for inheritance
- \`super\` refers to the parent class
- \`@Override\` annotation for method overriding
- Child class inherits all non-private members
    `,
    completed: false
  },
  {
    id: 4,
    title: 'Polymorphism',
    description: 'Same method name, different implementations based on context',
    content: `
## What is Polymorphism?
Polymorphism means "many forms". It allows objects to be treated as instances of their parent class while behaving according to their actual class.

## Types of Polymorphism
1. **Compile-time (Static)**: Method Overloading
2. **Runtime (Dynamic)**: Method Overriding

## Method Overloading
\`\`\`java
public class Calculator {
    // Same method name, different parameters
    public int add(int a, int b) {
        return a + b;
    }
    
    public double add(double a, double b) {
        return a + b;
    }
    
    public int add(int a, int b, int c) {
        return a + b + c;
    }
}
\`\`\`

## Method Overriding (Runtime Polymorphism)
\`\`\`java
public class Shape {
    public void draw() {
        System.out.println("Drawing a shape");
    }
    
    public double area() {
        return 0;
    }
}

public class Circle extends Shape {
    private double radius;
    
    public Circle(double radius) {
        this.radius = radius;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a circle with radius " + radius);
    }
    
    @Override
    public double area() {
        return Math.PI * radius * radius;
    }
}

public class Rectangle extends Shape {
    private double width, height;
    
    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }
    
    @Override
    public void draw() {
        System.out.println("Drawing a rectangle " + width + "x" + height);
    }
    
    @Override
    public double area() {
        return width * height;
    }
}

// Usage - Polymorphism in action
public class Main {
    public static void main(String[] args) {
        Shape[] shapes = {
            new Circle(5),
            new Rectangle(4, 6),
            new Circle(3)
        };
        
        for (Shape shape : shapes) {
            shape.draw();  // Calls the appropriate method
            System.out.println("Area: " + shape.area());
        }
    }
}
\`\`\`
    `,
    completed: false
  },
  {
    id: 5,
    title: 'Abstraction',
    description: 'Hide complex implementation details and show only essential features',
    content: `
## What is Abstraction?
Abstraction is hiding complex implementation details and showing only the necessary features of an object.

## Abstract Classes
\`\`\`java
// Abstract class - cannot be instantiated
public abstract class Vehicle {
    protected String brand;
    
    public Vehicle(String brand) {
        this.brand = brand;
    }
    
    // Abstract method - must be implemented by subclasses
    public abstract void start();
    public abstract void stop();
    
    // Concrete method - can be used as-is
    public void displayBrand() {
        System.out.println("Brand: " + brand);
    }
}

public class Car extends Vehicle {
    public Car(String brand) {
        super(brand);
    }
    
    @Override
    public void start() {
        System.out.println(brand + " car engine started with key");
    }
    
    @Override
    public void stop() {
        System.out.println(brand + " car engine stopped");
    }
}

public class ElectricCar extends Vehicle {
    public ElectricCar(String brand) {
        super(brand);
    }
    
    @Override
    public void start() {
        System.out.println(brand + " electric car started silently");
    }
    
    @Override
    public void stop() {
        System.out.println(brand + " electric car powered down");
    }
}
\`\`\`

## Interfaces (100% Abstraction)
\`\`\`java
public interface Flyable {
    void fly();
    void land();
}

public interface Swimmable {
    void swim();
}

// A class can implement multiple interfaces
public class Duck implements Flyable, Swimmable {
    @Override
    public void fly() {
        System.out.println("Duck is flying");
    }
    
    @Override
    public void land() {
        System.out.println("Duck has landed");
    }
    
    @Override
    public void swim() {
        System.out.println("Duck is swimming");
    }
}
\`\`\`

## Abstract Class vs Interface
| Feature | Abstract Class | Interface |
|---------|---------------|-----------|
| Methods | Can have both abstract and concrete | All abstract (Java 8+ can have default) |
| Variables | Can have instance variables | Only constants (public static final) |
| Inheritance | Single inheritance | Multiple interfaces |
| Constructor | Can have constructor | Cannot have constructor |
    `,
    completed: false
  }
]

export default function JavaOOPSPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 md:space-y-8">
      {/* Header */}
      <div>
        <Link 
          href="/dashboard/oops" 
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to OOPS
        </Link>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-500/10 rounded-lg">
            <Coffee className="w-6 h-6 text-orange-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Java OOP Fundamentals
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Master Object-Oriented Programming with Java - the most popular enterprise language.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="p-4 rounded-xl border border-orange-500/20 bg-orange-500/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Your Progress</span>
          <span className="text-sm text-muted-foreground">0 / {javaTopics.length} completed</span>
        </div>
        <div className="h-2 bg-orange-500/20 rounded-full overflow-hidden">
          <div className="h-full bg-orange-500 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topics</h2>
        
        {javaTopics.map((topic, index) => (
          <div 
            key={topic.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-orange-500/10 text-orange-500 font-bold shrink-0">
                {index + 1}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-semibold">{topic.title}</h3>
                  {topic.completed && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground mb-4">{topic.description}</p>
                
                {/* Content Preview */}
                <div className="p-4 rounded-lg bg-background/50 border border-border/40 mb-4">
                  <div className="prose prose-sm prose-invert max-w-none">
                    <div 
                      className="text-sm text-muted-foreground whitespace-pre-wrap font-mono"
                      dangerouslySetInnerHTML={{ 
                        __html: topic.content
                          .replace(/```java\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/```\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/## (.*)/g, '<h3 class="text-foreground font-semibold mt-4 mb-2">$1</h3>')
                          .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1 rounded text-orange-400">$1</code>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      }}
                    />
                  </div>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors">
                  <PlayCircle className="w-4 h-4" />
                  Practice This Topic
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
