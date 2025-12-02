import Link from 'next/link'
import { Braces, ArrowLeft, PlayCircle, CheckCircle2 } from 'lucide-react'

const cppTopics = [
  {
    id: 1,
    title: 'Classes and Objects',
    description: 'Learn how to define classes and create objects in C++',
    content: `
## What is a Class?
A class is a user-defined data type that contains data members and member functions.

## What is an Object?
An object is an instance of a class.

## Syntax
\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

// Class definition
class Car {
private:
    string brand;
    string color;
    int speed;

public:
    // Constructor
    Car(string b, string c) {
        brand = b;
        color = c;
        speed = 0;
    }
    
    // Member functions
    void accelerate() {
        speed += 10;
        cout << brand << " is now going " << speed << " km/h" << endl;
    }
    
    void brake() {
        speed = max(0, speed - 10);
        cout << brand << " slowed down to " << speed << " km/h" << endl;
    }
    
    // Getter
    int getSpeed() {
        return speed;
    }
};

int main() {
    // Creating objects
    Car myCar("Toyota", "Red");
    Car yourCar("Honda", "Blue");
    
    myCar.accelerate();   // Toyota is now going 10 km/h
    yourCar.accelerate(); // Honda is now going 10 km/h
    
    return 0;
}
\`\`\`

## Key Points
- Use \`class\` keyword to define a class
- Access specifiers: \`public\`, \`private\`, \`protected\`
- Constructor has same name as class
- Use dot operator (.) to access members
    `,
    completed: false
  },
  {
    id: 2,
    title: 'Encapsulation',
    description: 'Data hiding using access specifiers and getters/setters',
    content: `
## What is Encapsulation?
Encapsulation bundles data and methods together while restricting direct access to internal data.

## Access Specifiers
- \`private\`: Only accessible within the class
- \`protected\`: Accessible in class and derived classes
- \`public\`: Accessible from anywhere

## Syntax
\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

class BankAccount {
private:
    string accountNumber;
    double balance;

public:
    // Constructor
    BankAccount(string accNum, double initialBalance) {
        accountNumber = accNum;
        balance = initialBalance;
    }
    
    // Getter for balance
    double getBalance() const {
        return balance;
    }
    
    // Getter for account number
    string getAccountNumber() const {
        return accountNumber;
    }
    
    // Controlled deposit
    void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            cout << "Deposited: " << amount << endl;
        }
    }
    
    // Controlled withdrawal
    bool withdraw(double amount) {
        if (amount > 0 && amount <= balance) {
            balance -= amount;
            cout << "Withdrawn: " << amount << endl;
            return true;
        }
        cout << "Insufficient funds!" << endl;
        return false;
    }
};

int main() {
    BankAccount account("1234567890", 1000);
    
    cout << "Balance: " << account.getBalance() << endl;
    account.deposit(500);
    account.withdraw(200);
    
    // account.balance = 0;  // Error! balance is private
    
    return 0;
}
\`\`\`

## Const Member Functions
Use \`const\` after function declaration to indicate it doesn't modify the object.
\`\`\`cpp
double getBalance() const {  // Won't modify any member
    return balance;
}
\`\`\`
    `,
    completed: false
  },
  {
    id: 3,
    title: 'Inheritance',
    description: 'Create derived classes that inherit from base classes',
    content: `
## What is Inheritance?
Inheritance allows a class to inherit properties and methods from another class.

## Types of Inheritance
- Single, Multiple, Multilevel, Hierarchical, Hybrid
- C++ supports **multiple inheritance**!

## Syntax
\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

// Base class
class Animal {
protected:
    string name;
    int age;

public:
    Animal(string n, int a) : name(n), age(a) {}
    
    void eat() {
        cout << name << " is eating" << endl;
    }
    
    void sleep() {
        cout << name << " is sleeping" << endl;
    }
};

// Derived class
class Dog : public Animal {
private:
    string breed;

public:
    Dog(string n, int a, string b) : Animal(n, a), breed(b) {}
    
    void bark() {
        cout << name << " says: Woof! Woof!" << endl;
    }
    
    // Override eat method
    void eat() {
        cout << name << " the " << breed << " is eating dog food" << endl;
    }
};

int main() {
    Dog myDog("Buddy", 3, "Golden Retriever");
    myDog.eat();    // Overridden
    myDog.sleep();  // Inherited
    myDog.bark();   // Dog's own
    
    return 0;
}
\`\`\`

## Multiple Inheritance
\`\`\`cpp
class Flyable {
public:
    void fly() { cout << "Flying!" << endl; }
};

class Swimmable {
public:
    void swim() { cout << "Swimming!" << endl; }
};

class Duck : public Flyable, public Swimmable {
public:
    void quack() { cout << "Quack!" << endl; }
};
\`\`\`

## Inheritance Access
| Base Member | public inheritance | protected | private |
|-------------|-------------------|-----------|---------|
| public | public | protected | private |
| protected | protected | protected | private |
| private | Not accessible | Not accessible | Not accessible |
    `,
    completed: false
  },
  {
    id: 4,
    title: 'Polymorphism & Virtual Functions',
    description: 'Runtime polymorphism with virtual functions and function overloading',
    content: `
## Compile-time Polymorphism (Overloading)
\`\`\`cpp
class Calculator {
public:
    int add(int a, int b) {
        return a + b;
    }
    
    double add(double a, double b) {
        return a + b;
    }
    
    int add(int a, int b, int c) {
        return a + b + c;
    }
};
\`\`\`

## Runtime Polymorphism (Virtual Functions)
\`\`\`cpp
#include <iostream>
using namespace std;

class Shape {
public:
    // Virtual function - can be overridden
    virtual void draw() {
        cout << "Drawing a shape" << endl;
    }
    
    virtual double area() {
        return 0;
    }
    
    // Virtual destructor (important for polymorphism!)
    virtual ~Shape() {}
};

class Circle : public Shape {
private:
    double radius;

public:
    Circle(double r) : radius(r) {}
    
    void draw() override {
        cout << "Drawing a circle with radius " << radius << endl;
    }
    
    double area() override {
        return 3.14159 * radius * radius;
    }
};

class Rectangle : public Shape {
private:
    double width, height;

public:
    Rectangle(double w, double h) : width(w), height(h) {}
    
    void draw() override {
        cout << "Drawing a rectangle " << width << "x" << height << endl;
    }
    
    double area() override {
        return width * height;
    }
};

int main() {
    // Polymorphism with pointers
    Shape* shapes[3];
    shapes[0] = new Circle(5);
    shapes[1] = new Rectangle(4, 6);
    shapes[2] = new Circle(3);
    
    for (int i = 0; i < 3; i++) {
        shapes[i]->draw();  // Calls correct override
        cout << "Area: " << shapes[i]->area() << endl;
        delete shapes[i];
    }
    
    return 0;
}
\`\`\`

## Key Points
- Use \`virtual\` keyword in base class
- Use \`override\` keyword in derived class (C++11)
- Virtual destructor is essential for proper cleanup
- Without \`virtual\`, base class method is called
    `,
    completed: false
  },
  {
    id: 5,
    title: 'Abstraction & Pure Virtual Functions',
    description: 'Abstract classes, pure virtual functions, and interfaces',
    content: `
## Abstract Classes
A class with at least one pure virtual function.

\`\`\`cpp
#include <iostream>
#include <string>
using namespace std;

// Abstract class
class Vehicle {
protected:
    string brand;

public:
    Vehicle(string b) : brand(b) {}
    
    // Pure virtual functions (= 0)
    virtual void start() = 0;
    virtual void stop() = 0;
    
    // Concrete method
    void displayBrand() {
        cout << "Brand: " << brand << endl;
    }
    
    virtual ~Vehicle() {}
};

class Car : public Vehicle {
public:
    Car(string b) : Vehicle(b) {}
    
    void start() override {
        cout << brand << " car engine started with key" << endl;
    }
    
    void stop() override {
        cout << brand << " car engine stopped" << endl;
    }
};

class ElectricCar : public Vehicle {
public:
    ElectricCar(string b) : Vehicle(b) {}
    
    void start() override {
        cout << brand << " electric car started silently" << endl;
    }
    
    void stop() override {
        cout << brand << " electric car powered down" << endl;
    }
};

int main() {
    // Vehicle v("Generic");  // Error! Can't instantiate abstract class
    
    Vehicle* car1 = new Car("Toyota");
    Vehicle* car2 = new ElectricCar("Tesla");
    
    car1->start();
    car2->start();
    
    delete car1;
    delete car2;
    
    return 0;
}
\`\`\`

## Interface (Pure Abstract Class)
\`\`\`cpp
// Interface - all pure virtual functions
class Printable {
public:
    virtual void print() = 0;
    virtual ~Printable() {}
};

class Saveable {
public:
    virtual void save() = 0;
    virtual ~Saveable() {}
};

// Implementing multiple interfaces
class Document : public Printable, public Saveable {
private:
    string content;

public:
    Document(string c) : content(c) {}
    
    void print() override {
        cout << "Printing: " << content << endl;
    }
    
    void save() override {
        cout << "Saving document..." << endl;
    }
};
\`\`\`

## Abstract vs Interface
| Feature | Abstract Class | Interface (Pure Abstract) |
|---------|---------------|---------------------------|
| Methods | Can have concrete methods | All pure virtual |
| Data members | Can have data members | Usually no data |
| Constructor | Can have constructor | No constructor |
| Purpose | Partial implementation | Define contract |
    `,
    completed: false
  },
  {
    id: 6,
    title: 'Templates (Generic Programming)',
    description: 'Write generic code that works with any data type',
    content: `
## Function Templates
\`\`\`cpp
#include <iostream>
using namespace std;

// Function template
template <typename T>
T maximum(T a, T b) {
    return (a > b) ? a : b;
}

int main() {
    cout << maximum(10, 20) << endl;        // int
    cout << maximum(3.14, 2.71) << endl;    // double
    cout << maximum('a', 'z') << endl;      // char
    
    return 0;
}
\`\`\`

## Class Templates
\`\`\`cpp
template <typename T>
class Stack {
private:
    T* arr;
    int top;
    int capacity;

public:
    Stack(int size = 100) {
        arr = new T[size];
        capacity = size;
        top = -1;
    }
    
    ~Stack() {
        delete[] arr;
    }
    
    void push(T value) {
        if (top < capacity - 1) {
            arr[++top] = value;
        }
    }
    
    T pop() {
        if (top >= 0) {
            return arr[top--];
        }
        throw runtime_error("Stack is empty");
    }
    
    bool isEmpty() {
        return top == -1;
    }
};

int main() {
    Stack<int> intStack(10);
    intStack.push(1);
    intStack.push(2);
    cout << intStack.pop() << endl;  // 2
    
    Stack<string> strStack(10);
    strStack.push("Hello");
    strStack.push("World");
    cout << strStack.pop() << endl;  // World
    
    return 0;
}
\`\`\`

## Multiple Template Parameters
\`\`\`cpp
template <typename K, typename V>
class Pair {
private:
    K key;
    V value;

public:
    Pair(K k, V v) : key(k), value(v) {}
    
    K getKey() { return key; }
    V getValue() { return value; }
};

Pair<string, int> age("Alice", 25);
Pair<int, double> score(1, 95.5);
\`\`\`
    `,
    completed: false
  }
]

export default function CppOOPSPage() {
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
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <Braces className="w-6 h-6 text-blue-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            C++ OOP Fundamentals
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Master Object-Oriented Programming with C++ - powerful features like templates and multiple inheritance.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Your Progress</span>
          <span className="text-sm text-muted-foreground">0 / {cppTopics.length} completed</span>
        </div>
        <div className="h-2 bg-blue-500/20 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topics</h2>
        
        {cppTopics.map((topic, index) => (
          <div 
            key={topic.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 font-bold shrink-0">
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
                <div className="p-4 rounded-lg bg-background/50 border border-border/40 mb-4 overflow-x-auto">
                  <div className="prose prose-sm prose-invert max-w-none">
                    <div 
                      className="text-sm text-muted-foreground whitespace-pre-wrap font-mono"
                      dangerouslySetInnerHTML={{ 
                        __html: topic.content
                          .replace(/```cpp\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/```\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/## (.*)/g, '<h3 class="text-foreground font-semibold mt-4 mb-2">$1</h3>')
                          .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1 rounded text-blue-400">$1</code>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      }}
                    />
                  </div>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
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
