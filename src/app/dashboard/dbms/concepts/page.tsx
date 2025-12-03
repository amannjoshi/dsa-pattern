'use client'

import Link from 'next/link'
import { ArrowLeft, Database, BookOpen, CheckCircle2 } from 'lucide-react'

const dbmsConcepts = [
  {
    id: 1,
    title: 'What is DBMS?',
    color: 'blue',
    content: `A Database Management System (DBMS) is software that enables users to create, manage, and manipulate databases efficiently. It acts as an interface between the database and end users or application programs.

Key Components:
• Database Engine: Core service for storing and retrieving data
• Database Schema: Logical structure defining organization of data
• Query Processor: Interprets and executes database queries
• Transaction Manager: Ensures ACID properties
• Storage Manager: Manages physical storage of data

Types of DBMS:
• Hierarchical DBMS: Data organized in tree structure (parent-child)
• Network DBMS: More flexible, allows many-to-many relationships
• Relational DBMS (RDBMS): Data in tables with rows and columns (MySQL, PostgreSQL, Oracle)
• Object-oriented DBMS: Stores data as objects
• NoSQL DBMS: Non-relational, for unstructured data (MongoDB, Cassandra)`,
    example: `-- RDBMS Example: Creating a simple database structure
CREATE DATABASE CompanyDB;
USE CompanyDB;

CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,
    name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(10,2)
);`
  },
  {
    id: 2,
    title: 'DBMS vs File System',
    color: 'green',
    content: `File System stores data in files without any relationship management, while DBMS provides structured storage with powerful querying capabilities.

File System Limitations:
• Data Redundancy: Same data stored multiple times
• Data Inconsistency: Updates may not reflect everywhere
• Difficulty in Accessing Data: No query language
• Data Isolation: Data scattered in various files
• Integrity Problems: No constraint enforcement
• Atomicity Issues: No transaction support
• Concurrent Access Anomalies: No concurrency control
• Security Problems: Limited access control

DBMS Advantages:
• Reduced Redundancy: Normalization eliminates duplicate data
• Data Consistency: Single source of truth
• Easy Data Access: SQL queries for complex retrieval
• Data Integrity: Constraints ensure valid data
• Atomicity: Transactions are all-or-nothing
• Concurrent Access: Multiple users safely
• Security: Role-based access control
• Backup & Recovery: Built-in mechanisms`,
    example: `-- File System Problem:
-- students.txt: John, CS, john@email.com
-- grades.txt: John, CS, A+
-- If John changes email, must update multiple files!

-- DBMS Solution:
CREATE TABLE Students (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE Grades (
    student_id INT,
    course VARCHAR(50),
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- Email change only needs ONE update!
UPDATE Students SET email = 'new@email.com' WHERE student_id = 1;`
  },
  {
    id: 3,
    title: 'ACID Properties',
    color: 'purple',
    content: `ACID properties ensure reliable database transactions. Every transaction must satisfy these four properties:

Atomicity (All or Nothing):
• Transaction is treated as single unit
• Either all operations complete successfully, or none do
• If any operation fails, entire transaction is rolled back
• Example: Bank transfer - debit AND credit must both happen

Consistency (Valid State):
• Database must be in valid state before and after transaction
• All constraints, triggers, and rules must be satisfied
• Data integrity is maintained
• Example: Account balance cannot be negative

Isolation (Independent Execution):
• Concurrent transactions don't interfere with each other
• Each transaction appears to run in isolation
• Intermediate states are not visible to other transactions
• Prevents dirty reads, non-repeatable reads, phantom reads

Durability (Permanent Changes):
• Once transaction is committed, changes are permanent
• Survives system crashes, power failures
• Achieved through write-ahead logging (WAL)`,
    example: `-- Bank Transfer Example: $500 from Account A to B

-- Without ACID (dangerous):
UPDATE Accounts SET balance = balance - 500 WHERE account = 'A';
-- System crashes here! Money disappeared!
UPDATE Accounts SET balance = balance + 500 WHERE account = 'B';

-- With ACID (safe):
START TRANSACTION;

UPDATE Accounts SET balance = balance - 500 WHERE account = 'A';
UPDATE Accounts SET balance = balance + 500 WHERE account = 'B';

-- If both succeed:
COMMIT;  -- Changes are permanent (Durability)

-- If any fails:
ROLLBACK;  -- All changes undone (Atomicity)`
  },
  {
    id: 4,
    title: 'Keys in DBMS',
    color: 'cyan',
    content: `Keys are attributes used to uniquely identify records and establish relationships between tables.

Super Key:
• Any set of attributes that uniquely identifies a row
• May contain extra attributes not needed for uniqueness
• Example: {emp_id}, {emp_id, name}, {emp_id, name, dept}

Candidate Key:
• Minimal super key (no redundant attributes)
• A table can have multiple candidate keys
• Example: {emp_id}, {email}, {phone} - all unique

Primary Key:
• Chosen candidate key to uniquely identify records
• Cannot be NULL, must be unique
• Only ONE primary key per table
• Creates clustered index by default

Foreign Key:
• References primary key in another table
• Establishes relationships between tables
• Can be NULL (optional relationship)
• Maintains referential integrity

Alternate Key:
• Candidate keys not chosen as primary key

Composite Key:
• Primary key made of multiple columns
• Used when single column can't ensure uniqueness`,
    example: `CREATE TABLE Employees (
    emp_id INT PRIMARY KEY,           -- Primary Key
    email VARCHAR(100) UNIQUE,        -- Candidate/Alternate Key
    phone VARCHAR(15) UNIQUE,         -- Candidate/Alternate Key
    name VARCHAR(100),
    dept_id INT,
    FOREIGN KEY (dept_id) REFERENCES Departments(dept_id)
);

-- Composite Key Example
CREATE TABLE OrderItems (
    order_id INT,
    product_id INT,
    quantity INT,
    PRIMARY KEY (order_id, product_id)  -- Composite Key
);

-- Super Key examples for Employees:
-- {emp_id} ✓ Candidate Key (minimal)
-- {emp_id, name} ✓ Super Key (not minimal)
-- {email} ✓ Candidate Key
-- {name, dept_id} ✗ Not a key (not unique)`
  },
  {
    id: 5,
    title: 'Normalization',
    color: 'orange',
    content: `Normalization is the process of organizing data to reduce redundancy and improve data integrity.

First Normal Form (1NF):
• Each cell contains atomic (single) values
• No repeating groups or arrays
• Each record is unique

Second Normal Form (2NF):
• Must be in 1NF
• No partial dependencies
• All non-key attributes fully depend on entire primary key
• Relevant only for composite primary keys

Third Normal Form (3NF):
• Must be in 2NF
• No transitive dependencies
• Non-key attributes depend only on primary key, not on other non-key attributes

Boyce-Codd Normal Form (BCNF):
• Stronger version of 3NF
• Every determinant must be a candidate key

When to Denormalize:
• Read-heavy applications needing faster queries
• Reporting and analytics databases
• When joins become too expensive`,
    example: `-- UNNORMALIZED (violates 1NF):
-- Student | Courses
-- John    | Math, Science, English  ← Multiple values!

-- 1NF: Atomic values
CREATE TABLE StudentCourses (
    student_id INT,
    student_name VARCHAR(100),
    course VARCHAR(50),
    instructor VARCHAR(100),
    instructor_dept VARCHAR(50)
);

-- 2NF: Remove partial dependencies
CREATE TABLE Students (student_id INT PRIMARY KEY, name VARCHAR(100));
CREATE TABLE Courses (course_id INT PRIMARY KEY, course_name VARCHAR(50), 
                      instructor VARCHAR(100), instructor_dept VARCHAR(50));
CREATE TABLE Enrollments (student_id INT, course_id INT, 
                          PRIMARY KEY (student_id, course_id));

-- 3NF: Remove transitive dependencies
-- instructor_dept depends on instructor, not course_id
CREATE TABLE Instructors (instructor_id INT PRIMARY KEY, 
                          name VARCHAR(100), dept VARCHAR(50));
CREATE TABLE Courses_3NF (course_id INT PRIMARY KEY, 
                          course_name VARCHAR(50), instructor_id INT);`
  },
  {
    id: 6,
    title: 'ER Diagrams',
    color: 'red',
    content: `Entity-Relationship (ER) Diagrams visually represent database structure showing entities, attributes, and relationships.

Entities:
• Real-world objects represented in database
• Drawn as rectangles
• Strong Entity: Has its own primary key
• Weak Entity: Depends on another entity for identification

Attributes:
• Properties of entities - Drawn as ovals
• Types: Simple, Composite, Derived, Multi-valued, Key

Relationships:
• Associations between entities - Drawn as diamonds
• Types: One-to-One (1:1), One-to-Many (1:N), Many-to-Many (M:N)

Cardinality:
• 1:1 - One employee has one passport
• 1:N - One department has many employees
• M:N - Many students enroll in many courses

Participation:
• Total (mandatory): Every entity must participate
• Partial (optional): Entity may or may not participate`,
    example: `-- ER Diagram to Tables Conversion

-- Entity: Student (Rectangle)
CREATE TABLE Student (
    student_id INT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100)
);

-- Entity: Course (Rectangle)  
CREATE TABLE Course (
    course_id INT PRIMARY KEY,
    title VARCHAR(100),
    credits INT
);

-- Relationship: Enrolls (Diamond) - M:N creates junction table
CREATE TABLE Enrolls (
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    PRIMARY KEY (student_id, course_id),
    FOREIGN KEY (student_id) REFERENCES Student(student_id),
    FOREIGN KEY (course_id) REFERENCES Course(course_id)
);

-- Weak Entity: Dependent (depends on Employee)
CREATE TABLE Dependent (
    emp_id INT,
    dependent_name VARCHAR(100),
    PRIMARY KEY (emp_id, dependent_name),  -- Partial key + owner's key
    FOREIGN KEY (emp_id) REFERENCES Employee(emp_id)
);`
  },
  {
    id: 7,
    title: 'Transactions',
    color: 'yellow',
    content: `A transaction is a logical unit of work containing one or more database operations that must be executed as a whole.

Transaction States:
• Active: Transaction is being executed
• Partially Committed: Final statement executed, awaiting commit
• Committed: Successfully completed, changes permanent
• Failed: Error occurred, cannot proceed
• Aborted: Rolled back, database restored to previous state

Transaction Control Commands:
• BEGIN/START TRANSACTION: Start new transaction
• COMMIT: Save all changes permanently
• ROLLBACK: Undo all changes since last commit
• SAVEPOINT: Create checkpoint within transaction

Concurrency Problems:
• Dirty Read: Reading uncommitted data
• Non-Repeatable Read: Same query returns different results
• Phantom Read: New rows appear in repeated query
• Lost Update: Two transactions overwrite each other

Isolation Levels:
• READ UNCOMMITTED: Allows dirty reads
• READ COMMITTED: No dirty reads (default in many DBMS)
• REPEATABLE READ: No dirty or non-repeatable reads
• SERIALIZABLE: Highest isolation, no phantoms`,
    example: `-- Transaction with Savepoints
START TRANSACTION;

INSERT INTO Orders (order_id, customer_id, total) 
VALUES (1001, 5, 500.00);

SAVEPOINT order_created;

INSERT INTO OrderItems (order_id, product_id, qty) VALUES (1001, 101, 2);
INSERT INTO OrderItems (order_id, product_id, qty) VALUES (1001, 102, 1);

-- Product 102 out of stock!
ROLLBACK TO SAVEPOINT order_created;

-- Try different product
INSERT INTO OrderItems (order_id, product_id, qty) VALUES (1001, 103, 1);

COMMIT;  -- All changes saved

-- Isolation Level Example
SET TRANSACTION ISOLATION LEVEL REPEATABLE READ;
START TRANSACTION;
SELECT balance FROM accounts WHERE id = 1;  -- Returns 1000
-- Another transaction updates balance to 500
SELECT balance FROM accounts WHERE id = 1;  -- Still returns 1000!
COMMIT;`
  },
  {
    id: 8,
    title: 'Indexing',
    color: 'pink',
    content: `An index is a data structure that improves the speed of data retrieval operations on a database table.

Why Indexing?
• Without index: Full table scan O(n)
• With index: Quick lookup O(log n) for B-Tree
• Trade-off: Faster reads, slower writes

Types of Indexes:
• Primary Index: On primary key, automatically created
• Secondary Index: On non-primary key columns
• Clustered Index: Determines physical order (only one per table)
• Non-Clustered Index: Separate structure pointing to data
• Unique Index: Ensures no duplicate values
• Composite Index: On multiple columns

Index Data Structures:
• B-Tree: Balanced tree, good for range queries
• B+ Tree: All data in leaves, better for range scans
• Hash Index: O(1) for exact match, no range support
• Bitmap Index: For low-cardinality columns

When to Use Indexes:
✓ Frequently queried columns
✓ Columns in WHERE, JOIN, ORDER BY
✓ Foreign key columns
✗ Small tables
✗ Frequently updated columns
✗ Columns with many NULL values`,
    example: `CREATE TABLE Products (
    product_id INT PRIMARY KEY,  -- Primary index auto-created
    name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(10,2)
);

-- Single column index
CREATE INDEX idx_category ON Products(category);

-- Composite index (order matters!)
CREATE INDEX idx_cat_price ON Products(category, price);

-- Unique index
CREATE UNIQUE INDEX idx_name ON Products(name);

-- Query using index
SELECT * FROM Products WHERE category = 'Electronics';
-- Uses idx_category ✓

SELECT * FROM Products WHERE category = 'Electronics' AND price < 1000;
-- Uses idx_cat_price ✓

SELECT * FROM Products WHERE price < 1000;
-- Cannot use idx_cat_price efficiently ✗ (leftmost column not used)

-- Check execution plan
EXPLAIN SELECT * FROM Products WHERE category = 'Electronics';`
  },
  {
    id: 9,
    title: 'Views',
    color: 'teal',
    content: `A View is a virtual table based on the result of a SQL query. It doesn't store data physically but provides a way to simplify complex queries and add security.

Benefits of Views:
• Simplify Complex Queries: Hide joins and aggregations
• Security: Restrict access to specific columns/rows
• Data Independence: Applications don't need to know underlying structure
• Logical Data Independence: Can change base tables without affecting views

Types of Views:
• Simple View: Based on single table, can be updated
• Complex View: Based on multiple tables, joins, aggregations
• Materialized View: Physically stores data, needs refresh

View Limitations:
• Performance: Query runs each time view is accessed
• Update Restrictions: Can't update views with GROUP BY, DISTINCT, aggregates
• No Indexes: Cannot create index on view (except materialized)`,
    example: `-- Simple view
CREATE VIEW ActiveEmployees AS
SELECT emp_id, name, department, salary
FROM Employees
WHERE status = 'Active';

-- Query view like a table
SELECT * FROM ActiveEmployees WHERE department = 'IT';

-- Complex view with join
CREATE VIEW EmployeeDepartmentDetails AS
SELECT e.emp_id, e.name, d.dept_name, e.salary
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id;

-- Security view (hide salary)
CREATE VIEW PublicEmployeeInfo AS
SELECT emp_id, name, department, email
FROM Employees;

GRANT SELECT ON PublicEmployeeInfo TO hr_staff;

-- Materialized View (PostgreSQL)
CREATE MATERIALIZED VIEW MonthlySales AS
SELECT DATE_TRUNC('month', sale_date) as month, SUM(amount) as total
FROM Sales GROUP BY 1;

REFRESH MATERIALIZED VIEW MonthlySales;`
  },
  {
    id: 10,
    title: 'Stored Procedures & Triggers',
    color: 'indigo',
    content: `Stored Procedures are precompiled SQL code stored in the database. Triggers are special procedures that automatically execute in response to events.

Stored Procedures Benefits:
• Performance: Precompiled, cached execution plans
• Security: Can grant EXECUTE without table access
• Reusability: Write once, call from anywhere
• Reduced Network Traffic: Single call executes multiple statements

Triggers:
• Automatically fire on INSERT, UPDATE, DELETE
• BEFORE triggers: Validate/modify data before operation
• AFTER triggers: Audit, cascade operations after change
• INSTEAD OF triggers: Replace the original operation

Trigger Use Cases:
• Audit logging
• Enforcing complex business rules
• Maintaining derived data
• Replicating data to other tables`,
    example: `-- Stored Procedure
DELIMITER //
CREATE PROCEDURE TransferMoney(
    IN from_acc INT, IN to_acc INT, IN amount DECIMAL(10,2)
)
BEGIN
    DECLARE bal DECIMAL(10,2);
    SELECT balance INTO bal FROM Accounts WHERE account_id = from_acc;
    
    IF bal >= amount THEN
        START TRANSACTION;
        UPDATE Accounts SET balance = balance - amount WHERE account_id = from_acc;
        UPDATE Accounts SET balance = balance + amount WHERE account_id = to_acc;
        COMMIT;
        SELECT 'Success' as result;
    ELSE
        SELECT 'Insufficient funds' as result;
    END IF;
END //
DELIMITER ;

CALL TransferMoney(1001, 1002, 500.00);

-- Trigger for Audit Log
CREATE TRIGGER salary_audit
AFTER UPDATE ON Employees
FOR EACH ROW
BEGIN
    IF OLD.salary != NEW.salary THEN
        INSERT INTO EmployeeAudit (emp_id, old_salary, new_salary, changed_at)
        VALUES (NEW.emp_id, OLD.salary, NEW.salary, NOW());
    END IF;
END;`
  },
  {
    id: 11,
    title: 'Relational Algebra',
    color: 'lime',
    content: `Relational Algebra is a procedural query language that uses operators to manipulate relations (tables) and produce new relations.

Basic Operations:
• Selection (σ): Selects rows satisfying a condition
  σ(condition)(Relation) - Horizontal subset
• Projection (π): Selects specific columns
  π(col1, col2)(Relation) - Vertical subset
• Union (∪): Combines tuples from two relations (must be union-compatible)
• Set Difference (−): Tuples in R1 but not in R2
• Cartesian Product (×): All combinations of tuples from two relations

Derived Operations:
• Intersection (∩): Common tuples in both relations
• Join (⋈): Combines related tuples from two relations
  - Natural Join: On common attributes
  - Theta Join: On any condition
  - Equi Join: Theta join with equality condition
• Division (÷): Used for "for all" type queries

Rename Operation (ρ):
• ρ(new_name)(Relation): Renames a relation
• ρ(new_name(col1, col2))(Relation): Renames relation and columns`,
    example: `-- Relational Algebra to SQL Mapping

-- Selection (σ): σ(salary > 50000)(Employees)
SELECT * FROM Employees WHERE salary > 50000;

-- Projection (π): π(name, department)(Employees)
SELECT name, department FROM Employees;

-- Union (∪): R1 ∪ R2
SELECT * FROM Employees_2023
UNION
SELECT * FROM Employees_2024;

-- Set Difference (−): R1 − R2
SELECT * FROM AllCustomers
EXCEPT
SELECT * FROM PremiumCustomers;

-- Cartesian Product (×): R1 × R2
SELECT * FROM Employees CROSS JOIN Departments;

-- Natural Join (⋈): Employees ⋈ Departments
SELECT * FROM Employees
NATURAL JOIN Departments;

-- Theta Join: Employees ⋈(e.dept_id = d.dept_id) Departments
SELECT * FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id;

-- Division Example: Find employees who work on ALL projects
-- π(emp_id, project_id)(Works_On) ÷ π(project_id)(Projects)
SELECT DISTINCT emp_id FROM Works_On w1
WHERE NOT EXISTS (
    SELECT project_id FROM Projects
    EXCEPT
    SELECT project_id FROM Works_On w2 WHERE w2.emp_id = w1.emp_id
);`
  }
]

const colorClasses: Record<string, { bg: string; border: string; text: string }> = {
  blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  green: { bg: 'bg-green-500/10', border: 'border-green-500/30', text: 'text-green-400' },
  purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  orange: { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  red: { bg: 'bg-red-500/10', border: 'border-red-500/30', text: 'text-red-400' },
  yellow: { bg: 'bg-yellow-500/10', border: 'border-yellow-500/30', text: 'text-yellow-400' },
  pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/30', text: 'text-pink-400' },
  teal: { bg: 'bg-teal-500/10', border: 'border-teal-500/30', text: 'text-teal-400' },
  indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400' },
  lime: { bg: 'bg-lime-500/10', border: 'border-lime-500/30', text: 'text-lime-400' },
}

export default function DBMSConceptsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 p-6 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link 
            href="/dashboard/dbms"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to DBMS
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/20">
              <Database className="w-8 h-8 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">DBMS Concepts</h1>
              <p className="text-muted-foreground">Complete Database Management System Theory</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              Master all fundamental DBMS concepts from basics to advanced topics. Each section includes 
              detailed explanations with practical SQL examples.
            </p>
          </div>
        </div>

        {/* Concepts Sections */}
        <div className="space-y-6">
          {dbmsConcepts.map((concept) => {
            const colors = colorClasses[concept.color]
            return (
              <div 
                key={concept.id}
                className={`p-6 rounded-2xl ${colors.bg} border ${colors.border}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-8 h-8 rounded-lg bg-black/30 flex items-center justify-center ${colors.text} font-bold`}>
                    {concept.id}
                  </div>
                  <h2 className={`text-xl font-bold ${colors.text}`}>{concept.title}</h2>
                </div>
                
                <div className="prose prose-invert max-w-none mb-4">
                  <p className="text-gray-300 text-sm whitespace-pre-line leading-relaxed">{concept.content}</p>
                </div>

                <div className="p-4 rounded-xl bg-black/40 border border-white/5">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-400">SQL Example</span>
                  </div>
                  <pre className="text-xs text-green-400 overflow-x-auto">
                    <code>{concept.example}</code>
                  </pre>
                </div>
              </div>
            )
          })}
        </div>

        {/* Interview Tips */}
        <div className="mt-8 p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - DBMS Concepts</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Explain ACID properties with real-world examples (bank transfer is classic)</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Be able to normalize a table step by step from 1NF to 3NF</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know all types of keys and when to use composite keys</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Understand indexing trade-offs - faster reads vs slower writes</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know concurrency problems and how isolation levels prevent them</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
