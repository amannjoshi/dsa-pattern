import Link from 'next/link'
import { FileCode, ArrowLeft, PlayCircle, CheckCircle2 } from 'lucide-react'

const pythonTopics = [
  {
    id: 1,
    title: 'Classes and Objects',
    description: 'Learn how to define classes and create objects in Python',
    content: `
## What is a Class?
A class is a blueprint for creating objects. It defines attributes and methods.

## What is an Object?
An object is an instance of a class with actual values.

## Syntax
\`\`\`python
# Defining a class
class Car:
    # Constructor (initializer)
    def __init__(self, brand, color):
        self.brand = brand    # Instance attribute
        self.color = color
        self.speed = 0
    
    # Instance method
    def accelerate(self):
        self.speed += 10
        print(f"{self.brand} is now going {self.speed} km/h")
    
    def brake(self):
        self.speed = max(0, self.speed - 10)
        print(f"{self.brand} slowed down to {self.speed} km/h")

# Creating objects
my_car = Car("Toyota", "Red")
your_car = Car("Honda", "Blue")

my_car.accelerate()   # Toyota is now going 10 km/h
your_car.accelerate() # Honda is now going 10 km/h
\`\`\`

## Key Points
- Use \`class\` keyword to define a class
- \`__init__\` is the constructor method
- \`self\` refers to the current instance
- No \`new\` keyword needed to create objects
    `,
    completed: false
  },
  {
    id: 2,
    title: 'Encapsulation',
    description: 'Control access to class attributes using naming conventions',
    content: `
## What is Encapsulation?
Encapsulation is bundling data and methods together, restricting direct access to some components.

## Python Naming Conventions
- \`public\`: No underscore (accessible anywhere)
- \`_protected\`: Single underscore (convention, still accessible)
- \`__private\`: Double underscore (name mangling, harder to access)

## Syntax
\`\`\`python
class BankAccount:
    def __init__(self, account_number, initial_balance):
        self.__account_number = account_number  # Private
        self.__balance = initial_balance        # Private
    
    # Getter using property decorator
    @property
    def balance(self):
        return self.__balance
    
    @property
    def account_number(self):
        return self.__account_number
    
    # Methods for controlled modification
    def deposit(self, amount):
        if amount > 0:
            self.__balance += amount
            print(f"Deposited: {amount}")
    
    def withdraw(self, amount):
        if 0 < amount <= self.__balance:
            self.__balance -= amount
            print(f"Withdrawn: {amount}")
            return True
        print("Insufficient funds!")
        return False

# Usage
account = BankAccount("1234567890", 1000)
print(account.balance)      # 1000 (using getter)
account.deposit(500)        # Deposited: 500
# account.__balance = 0     # This creates a new attribute, doesn't modify private one
\`\`\`

## Property Decorator
\`\`\`python
class Circle:
    def __init__(self, radius):
        self._radius = radius
    
    @property
    def radius(self):
        return self._radius
    
    @radius.setter
    def radius(self, value):
        if value > 0:
            self._radius = value
        else:
            raise ValueError("Radius must be positive")
    
    @property
    def area(self):
        return 3.14159 * self._radius ** 2

circle = Circle(5)
print(circle.area)    # 78.53975
circle.radius = 10    # Using setter
\`\`\`
    `,
    completed: false
  },
  {
    id: 3,
    title: 'Inheritance',
    description: 'Create new classes that inherit from existing classes',
    content: `
## What is Inheritance?
Inheritance allows a class to inherit attributes and methods from another class.

## Types of Inheritance
- Single: One parent, one child
- Multiple: Multiple parents, one child (Python supports this!)
- Multilevel: Chain of inheritance
- Hierarchical: One parent, multiple children

## Syntax
\`\`\`python
# Parent class
class Animal:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def eat(self):
        print(f"{self.name} is eating")
    
    def sleep(self):
        print(f"{self.name} is sleeping")

# Child class
class Dog(Animal):
    def __init__(self, name, age, breed):
        super().__init__(name, age)  # Call parent constructor
        self.breed = breed
    
    def bark(self):
        print(f"{self.name} says: Woof! Woof!")
    
    # Override parent method
    def eat(self):
        print(f"{self.name} the {self.breed} is eating dog food")

# Usage
my_dog = Dog("Buddy", 3, "Golden Retriever")
my_dog.eat()    # Overridden method
my_dog.sleep()  # Inherited method
my_dog.bark()   # Dog's own method
\`\`\`

## Multiple Inheritance
\`\`\`python
class Flyable:
    def fly(self):
        print("Flying!")

class Swimmable:
    def swim(self):
        print("Swimming!")

class Duck(Flyable, Swimmable):
    def quack(self):
        print("Quack!")

duck = Duck()
duck.fly()    # From Flyable
duck.swim()   # From Swimmable
duck.quack()  # Duck's own
\`\`\`

## Method Resolution Order (MRO)
\`\`\`python
print(Duck.__mro__)  # Shows the order Python looks for methods
\`\`\`
    `,
    completed: false
  },
  {
    id: 4,
    title: 'Polymorphism',
    description: 'Same interface, different implementations',
    content: `
## What is Polymorphism?
Polymorphism allows objects of different classes to be treated as objects of a common base class.

## Duck Typing
Python uses "duck typing" - if it walks like a duck and quacks like a duck, it's a duck!

\`\`\`python
class Dog:
    def speak(self):
        return "Woof!"

class Cat:
    def speak(self):
        return "Meow!"

class Duck:
    def speak(self):
        return "Quack!"

# Polymorphism in action
def animal_sound(animal):
    print(animal.speak())

# Works with any object that has a speak() method
animal_sound(Dog())   # Woof!
animal_sound(Cat())   # Meow!
animal_sound(Duck())  # Quack!
\`\`\`

## Method Overriding
\`\`\`python
class Shape:
    def area(self):
        return 0
    
    def draw(self):
        print("Drawing a shape")

class Circle(Shape):
    def __init__(self, radius):
        self.radius = radius
    
    def area(self):
        return 3.14159 * self.radius ** 2
    
    def draw(self):
        print(f"Drawing a circle with radius {self.radius}")

class Rectangle(Shape):
    def __init__(self, width, height):
        self.width = width
        self.height = height
    
    def area(self):
        return self.width * self.height
    
    def draw(self):
        print(f"Drawing a rectangle {self.width}x{self.height}")

# Polymorphism with a list
shapes = [Circle(5), Rectangle(4, 6), Circle(3)]

for shape in shapes:
    shape.draw()
    print(f"Area: {shape.area()}")
\`\`\`

## Operator Overloading
\`\`\`python
class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y
    
    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)
    
    def __str__(self):
        return f"Vector({self.x}, {self.y})"

v1 = Vector(2, 3)
v2 = Vector(4, 5)
v3 = v1 + v2  # Uses __add__
print(v3)     # Vector(6, 8)
\`\`\`
    `,
    completed: false
  },
  {
    id: 5,
    title: 'Abstraction & Magic Methods',
    description: 'Abstract classes, interfaces, and Python special methods',
    content: `
## Abstract Base Classes (ABC)
\`\`\`python
from abc import ABC, abstractmethod

class Vehicle(ABC):
    def __init__(self, brand):
        self.brand = brand
    
    @abstractmethod
    def start(self):
        pass
    
    @abstractmethod
    def stop(self):
        pass
    
    # Concrete method
    def display_brand(self):
        print(f"Brand: {self.brand}")

class Car(Vehicle):
    def start(self):
        print(f"{self.brand} car engine started")
    
    def stop(self):
        print(f"{self.brand} car engine stopped")

class ElectricCar(Vehicle):
    def start(self):
        print(f"{self.brand} electric car started silently")
    
    def stop(self):
        print(f"{self.brand} electric car powered down")

# vehicle = Vehicle("Generic")  # Error! Can't instantiate abstract class
car = Car("Toyota")
car.start()  # Toyota car engine started
\`\`\`

## Magic Methods (Dunder Methods)
\`\`\`python
class Book:
    def __init__(self, title, author, pages):
        self.title = title
        self.author = author
        self.pages = pages
    
    # String representation
    def __str__(self):
        return f"{self.title} by {self.author}"
    
    def __repr__(self):
        return f"Book('{self.title}', '{self.author}', {self.pages})"
    
    # Comparison
    def __eq__(self, other):
        return self.title == other.title and self.author == other.author
    
    def __lt__(self, other):
        return self.pages < other.pages
    
    # Length
    def __len__(self):
        return self.pages
    
    # Make it callable
    def __call__(self):
        return f"Reading {self.title}..."

book1 = Book("Python 101", "John", 300)
book2 = Book("Java Basics", "Jane", 400)

print(str(book1))      # Python 101 by John
print(len(book1))      # 300
print(book1 < book2)   # True (300 < 400)
print(book1())         # Reading Python 101...
\`\`\`

## Common Magic Methods
| Method | Purpose |
|--------|---------|
| \`__init__\` | Constructor |
| \`__str__\` | String for users |
| \`__repr__\` | String for developers |
| \`__eq__\` | Equality (==) |
| \`__lt__\`, \`__gt__\` | Less/Greater than |
| \`__add__\`, \`__sub__\` | +, - operators |
| \`__len__\` | len() function |
| \`__getitem__\` | [] indexing |
| \`__iter__\` | Make iterable |
    `,
    completed: false
  }
]

export default function PythonOOPSPage() {
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
          <div className="p-2 bg-yellow-500/10 rounded-lg">
            <FileCode className="w-6 h-6 text-yellow-500" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Python OOP Fundamentals
          </h1>
        </div>
        <p className="text-muted-foreground mt-2 text-sm md:text-base">
          Master Object-Oriented Programming with Python&apos;s clean and elegant syntax.
        </p>
      </div>

      {/* Progress Overview */}
      <div className="p-4 rounded-xl border border-yellow-500/20 bg-yellow-500/5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium">Your Progress</span>
          <span className="text-sm text-muted-foreground">0 / {pythonTopics.length} completed</span>
        </div>
        <div className="h-2 bg-yellow-500/20 rounded-full overflow-hidden">
          <div className="h-full bg-yellow-500 rounded-full" style={{ width: '0%' }} />
        </div>
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Topics</h2>
        
        {pythonTopics.map((topic, index) => (
          <div 
            key={topic.id}
            className="p-4 md:p-6 rounded-xl border border-border/40 bg-secondary/5 hover:bg-secondary/10 transition-colors"
          >
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-yellow-500/10 text-yellow-500 font-bold shrink-0">
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
                          .replace(/```python\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/```\n([\s\S]*?)```/g, '<pre class="bg-zinc-900 p-3 rounded-lg overflow-x-auto text-xs"><code>$1</code></pre>')
                          .replace(/## (.*)/g, '<h3 class="text-foreground font-semibold mt-4 mb-2">$1</h3>')
                          .replace(/`([^`]+)`/g, '<code class="bg-zinc-800 px-1 rounded text-yellow-400">$1</code>')
                          .replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>')
                      }}
                    />
                  </div>
                </div>
                
                <button className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-500 text-black rounded-lg text-sm font-medium hover:bg-yellow-400 transition-colors">
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
