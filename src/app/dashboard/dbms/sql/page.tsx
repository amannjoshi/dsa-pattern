'use client'

import Link from 'next/link'
import { ArrowLeft, Code2, BookOpen, CheckCircle2 } from 'lucide-react'

const sqlConcepts = [
  {
    id: 1,
    title: 'SELECT - Retrieving Data',
    color: 'blue',
    content: `SELECT is the most fundamental SQL command used to retrieve data from one or more tables.

Syntax: SELECT column1, column2 FROM table_name WHERE condition;

Key Clauses:
• SELECT: Specifies which columns to retrieve
• FROM: Specifies the table(s) to query
• WHERE: Filters rows based on conditions
• DISTINCT: Removes duplicate rows
• AS: Creates column aliases
• LIMIT/TOP: Restricts number of rows returned`,
    example: `-- Select all columns
SELECT * FROM Employees;

-- Select specific columns
SELECT name, salary FROM Employees;

-- With WHERE clause
SELECT name, department FROM Employees WHERE salary > 50000;

-- Using DISTINCT
SELECT DISTINCT department FROM Employees;

-- Using aliases
SELECT name AS employee_name, salary * 12 AS annual_salary FROM Employees;

-- Multiple conditions
SELECT * FROM Employees 
WHERE department = 'IT' AND salary > 60000;

-- BETWEEN and IN
SELECT * FROM Products WHERE price BETWEEN 100 AND 500;
SELECT * FROM Employees WHERE department IN ('IT', 'HR', 'Sales');

-- LIKE for pattern matching
SELECT * FROM Employees WHERE name LIKE 'J%';     -- Starts with J
SELECT * FROM Employees WHERE email LIKE '%@gmail.com';  -- Ends with
SELECT * FROM Employees WHERE name LIKE '_ohn';   -- Second char onwards is 'ohn'

-- ORDER BY
SELECT * FROM Employees ORDER BY salary DESC;
SELECT * FROM Employees ORDER BY department ASC, salary DESC;

-- LIMIT (MySQL) / TOP (SQL Server)
SELECT * FROM Employees ORDER BY salary DESC LIMIT 10;
-- SQL Server: SELECT TOP 10 * FROM Employees ORDER BY salary DESC;`
  },
  {
    id: 2,
    title: 'INSERT - Adding Data',
    color: 'green',
    content: `INSERT statement adds new rows to a table.

Syntax: INSERT INTO table_name (columns) VALUES (values);

Key Points:
• Can insert single or multiple rows
• Column order must match value order
• Can omit column names if providing all values
• Can insert from another table using SELECT
• Auto-increment columns can be omitted`,
    example: `-- Insert single row (all columns)
INSERT INTO Employees VALUES (1, 'John Doe', 'IT', 75000, '2024-01-15');

-- Insert with specified columns
INSERT INTO Employees (name, department, salary) 
VALUES ('Jane Smith', 'HR', 65000);

-- Insert multiple rows
INSERT INTO Employees (name, department, salary) VALUES
('Alice Brown', 'IT', 80000),
('Bob Wilson', 'Sales', 55000),
('Carol Davis', 'HR', 60000);

-- Insert from another table
INSERT INTO EmployeeBackup (name, department, salary)
SELECT name, department, salary FROM Employees WHERE department = 'IT';

-- Insert with DEFAULT values
INSERT INTO Products (name, price, stock) 
VALUES ('Laptop', 999.99, DEFAULT);

-- Insert and get the auto-generated ID (MySQL)
INSERT INTO Orders (customer_id, total) VALUES (5, 150.00);
SELECT LAST_INSERT_ID();

-- PostgreSQL: INSERT ... RETURNING
INSERT INTO Orders (customer_id, total) VALUES (5, 150.00) RETURNING order_id;`
  },
  {
    id: 3,
    title: 'UPDATE - Modifying Data',
    color: 'purple',
    content: `UPDATE statement modifies existing rows in a table.

Syntax: UPDATE table_name SET column1 = value1 WHERE condition;

Key Points:
• Always use WHERE clause (unless updating all rows intentionally)
• Can update multiple columns in one statement
• Can use subqueries for values
• Be careful: Without WHERE, ALL rows are updated!`,
    example: `-- Update single column
UPDATE Employees SET salary = 80000 WHERE emp_id = 101;

-- Update multiple columns
UPDATE Employees 
SET salary = 85000, department = 'Senior IT' 
WHERE emp_id = 101;

-- Update with calculation
UPDATE Products SET price = price * 1.10;  -- 10% price increase

-- Update using CASE
UPDATE Employees SET salary = 
    CASE 
        WHEN department = 'IT' THEN salary * 1.15
        WHEN department = 'HR' THEN salary * 1.10
        ELSE salary * 1.05
    END;

-- Update with subquery
UPDATE Employees 
SET salary = (SELECT AVG(salary) FROM Employees WHERE department = 'IT')
WHERE emp_id = 102;

-- Update with JOIN (MySQL)
UPDATE Employees e
JOIN Departments d ON e.dept_id = d.dept_id
SET e.salary = e.salary * 1.10
WHERE d.dept_name = 'Engineering';

-- Safe update: Check rows first
SELECT * FROM Employees WHERE department = 'IT';  -- Preview
UPDATE Employees SET status = 'Active' WHERE department = 'IT';`
  },
  {
    id: 4,
    title: 'DELETE - Removing Data',
    color: 'red',
    content: `DELETE statement removes rows from a table.

Syntax: DELETE FROM table_name WHERE condition;

Key Points:
• Always use WHERE clause (unless deleting all rows)
• DELETE removes rows, TRUNCATE removes all rows faster
• Can use subqueries in WHERE clause
• Triggers fire on DELETE but not on TRUNCATE
• DELETE can be rolled back, TRUNCATE often cannot`,
    example: `-- Delete specific rows
DELETE FROM Employees WHERE emp_id = 101;

-- Delete with multiple conditions
DELETE FROM Orders 
WHERE status = 'Cancelled' AND order_date < '2024-01-01';

-- Delete using subquery
DELETE FROM Employees 
WHERE dept_id IN (SELECT dept_id FROM Departments WHERE status = 'Closed');

-- Delete with JOIN (MySQL)
DELETE e FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_name = 'Obsolete';

-- Delete all rows (slower, logged, can rollback)
DELETE FROM TempTable;

-- TRUNCATE all rows (faster, minimal logging)
TRUNCATE TABLE TempTable;

-- Safe delete: Check rows first
SELECT COUNT(*) FROM Logs WHERE log_date < '2023-01-01';  -- Check count
DELETE FROM Logs WHERE log_date < '2023-01-01';

-- DELETE vs TRUNCATE vs DROP
-- DELETE: Removes rows, keeps structure, can rollback
-- TRUNCATE: Removes all rows, resets auto-increment, faster
-- DROP: Removes entire table including structure`
  },
  {
    id: 5,
    title: 'JOINs - Combining Tables',
    color: 'cyan',
    content: `JOIN combines rows from two or more tables based on related columns.

Types of JOINs:
• INNER JOIN: Returns only matching rows from both tables
• LEFT JOIN: All rows from left + matching from right (NULL if no match)
• RIGHT JOIN: All rows from right + matching from left (NULL if no match)
• FULL OUTER JOIN: All rows from both tables
• CROSS JOIN: Cartesian product (every row with every row)
• SELF JOIN: Table joined with itself`,
    example: `-- Sample Tables:
-- Employees: emp_id, name, dept_id
-- Departments: dept_id, dept_name

-- INNER JOIN (only matching rows)
SELECT e.name, d.dept_name
FROM Employees e
INNER JOIN Departments d ON e.dept_id = d.dept_id;

-- LEFT JOIN (all employees, even without department)
SELECT e.name, d.dept_name
FROM Employees e
LEFT JOIN Departments d ON e.dept_id = d.dept_id;

-- RIGHT JOIN (all departments, even without employees)
SELECT e.name, d.dept_name
FROM Employees e
RIGHT JOIN Departments d ON e.dept_id = d.dept_id;

-- FULL OUTER JOIN (all from both)
SELECT e.name, d.dept_name
FROM Employees e
FULL OUTER JOIN Departments d ON e.dept_id = d.dept_id;

-- CROSS JOIN (Cartesian product)
SELECT e.name, p.project_name
FROM Employees e
CROSS JOIN Projects p;

-- SELF JOIN (find employees and their managers)
SELECT e.name AS employee, m.name AS manager
FROM Employees e
LEFT JOIN Employees m ON e.manager_id = m.emp_id;

-- Multiple JOINs
SELECT e.name, d.dept_name, p.project_name
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
JOIN Projects p ON e.project_id = p.project_id;

-- JOIN with WHERE
SELECT e.name, d.dept_name
FROM Employees e
JOIN Departments d ON e.dept_id = d.dept_id
WHERE d.dept_name = 'IT' AND e.salary > 50000;`
  },
  {
    id: 6,
    title: 'Aggregation Functions',
    color: 'orange',
    content: `Aggregate functions perform calculations on a set of values and return a single value.

Common Functions:
• COUNT(): Number of rows
• SUM(): Total of numeric column
• AVG(): Average value
• MIN(): Smallest value
• MAX(): Largest value
• GROUP_CONCAT() / STRING_AGG(): Concatenate values

GROUP BY: Groups rows with same values
HAVING: Filters groups (like WHERE for aggregates)`,
    example: `-- Basic aggregations
SELECT COUNT(*) AS total_employees FROM Employees;
SELECT SUM(salary) AS total_salary FROM Employees;
SELECT AVG(salary) AS avg_salary FROM Employees;
SELECT MIN(salary) AS min_sal, MAX(salary) AS max_sal FROM Employees;

-- COUNT variations
SELECT COUNT(*) FROM Employees;           -- All rows including NULL
SELECT COUNT(email) FROM Employees;       -- Non-NULL values only
SELECT COUNT(DISTINCT department) FROM Employees;  -- Unique values

-- GROUP BY
SELECT department, COUNT(*) AS emp_count, AVG(salary) AS avg_salary
FROM Employees
GROUP BY department;

-- GROUP BY multiple columns
SELECT department, job_title, AVG(salary)
FROM Employees
GROUP BY department, job_title;

-- HAVING (filter after grouping)
SELECT department, AVG(salary) AS avg_sal
FROM Employees
GROUP BY department
HAVING AVG(salary) > 60000;

-- WHERE vs HAVING
SELECT department, AVG(salary)
FROM Employees
WHERE status = 'Active'      -- Filters rows BEFORE grouping
GROUP BY department
HAVING AVG(salary) > 50000;  -- Filters groups AFTER grouping

-- Concatenate values (MySQL)
SELECT department, GROUP_CONCAT(name ORDER BY name SEPARATOR ', ')
FROM Employees
GROUP BY department;

-- PostgreSQL: STRING_AGG
SELECT department, STRING_AGG(name, ', ' ORDER BY name)
FROM Employees
GROUP BY department;`
  },
  {
    id: 7,
    title: 'Subqueries',
    color: 'yellow',
    content: `A subquery is a query nested inside another query. Can be used in SELECT, FROM, WHERE, or HAVING.

Types:
• Scalar Subquery: Returns single value
• Row Subquery: Returns single row
• Table Subquery: Returns table (used in FROM)
• Correlated Subquery: References outer query (runs for each outer row)

Key Operators: IN, NOT IN, EXISTS, NOT EXISTS, ANY, ALL`,
    example: `-- Scalar subquery in SELECT
SELECT name, salary,
    (SELECT AVG(salary) FROM Employees) AS company_avg
FROM Employees;

-- Subquery in WHERE with IN
SELECT * FROM Employees
WHERE dept_id IN (SELECT dept_id FROM Departments WHERE location = 'NYC');

-- Subquery with comparison
SELECT * FROM Employees
WHERE salary > (SELECT AVG(salary) FROM Employees);

-- EXISTS (check if subquery returns any rows)
SELECT * FROM Departments d
WHERE EXISTS (SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id);

-- NOT EXISTS (departments with no employees)
SELECT * FROM Departments d
WHERE NOT EXISTS (SELECT 1 FROM Employees e WHERE e.dept_id = d.dept_id);

-- Correlated subquery (runs for each row)
SELECT e.name, e.salary
FROM Employees e
WHERE e.salary > (
    SELECT AVG(salary) FROM Employees WHERE dept_id = e.dept_id
);

-- ANY and ALL
SELECT * FROM Employees
WHERE salary > ANY (SELECT salary FROM Employees WHERE department = 'IT');

SELECT * FROM Employees
WHERE salary > ALL (SELECT salary FROM Employees WHERE department = 'HR');

-- Subquery in FROM (derived table)
SELECT dept_summary.department, dept_summary.avg_sal
FROM (
    SELECT department, AVG(salary) AS avg_sal
    FROM Employees
    GROUP BY department
) AS dept_summary
WHERE dept_summary.avg_sal > 60000;`
  },
  {
    id: 8,
    title: 'Window Functions',
    color: 'pink',
    content: `Window functions perform calculations across a set of rows related to the current row, without collapsing rows like GROUP BY.

Components:
• OVER(): Defines the window
• PARTITION BY: Divides rows into groups
• ORDER BY: Defines order within partition
• ROWS/RANGE: Defines frame boundaries

Common Functions:
• ROW_NUMBER(): Sequential number
• RANK(): Rank with gaps
• DENSE_RANK(): Rank without gaps
• LEAD()/LAG(): Access next/previous rows
• FIRST_VALUE()/LAST_VALUE(): First/last in window
• SUM()/AVG()/COUNT() OVER(): Running calculations`,
    example: `-- ROW_NUMBER: Unique sequential number
SELECT name, department, salary,
    ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num
FROM Employees;

-- ROW_NUMBER with PARTITION (restart numbering per department)
SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS dept_rank
FROM Employees;

-- RANK vs DENSE_RANK
SELECT name, salary,
    RANK() OVER (ORDER BY salary DESC) AS rank,        -- 1,2,2,4 (gaps)
    DENSE_RANK() OVER (ORDER BY salary DESC) AS d_rank -- 1,2,2,3 (no gaps)
FROM Employees;

-- Top N per group (get top 3 earners per department)
SELECT * FROM (
    SELECT name, department, salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) AS rn
    FROM Employees
) ranked WHERE rn <= 3;

-- LAG and LEAD (access adjacent rows)
SELECT name, salary,
    LAG(salary, 1) OVER (ORDER BY emp_id) AS prev_salary,
    LEAD(salary, 1) OVER (ORDER BY emp_id) AS next_salary
FROM Employees;

-- Running total
SELECT name, salary,
    SUM(salary) OVER (ORDER BY emp_id) AS running_total
FROM Employees;

-- Running average
SELECT name, salary,
    AVG(salary) OVER (ORDER BY emp_id ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS moving_avg
FROM Employees;

-- Percentage of total
SELECT name, department, salary,
    salary * 100.0 / SUM(salary) OVER () AS pct_of_total,
    salary * 100.0 / SUM(salary) OVER (PARTITION BY department) AS pct_of_dept
FROM Employees;`
  },
  {
    id: 9,
    title: 'DDL - Data Definition Language',
    color: 'teal',
    content: `DDL commands define and modify database structure.

Commands:
• CREATE: Create new objects (database, table, index, view)
• ALTER: Modify existing objects
• DROP: Delete objects
• TRUNCATE: Remove all data from table

Constraints:
• PRIMARY KEY: Unique identifier
• FOREIGN KEY: Referential integrity
• UNIQUE: No duplicates
• NOT NULL: Cannot be empty
• CHECK: Custom validation
• DEFAULT: Default value`,
    example: `-- CREATE DATABASE
CREATE DATABASE CompanyDB;
USE CompanyDB;

-- CREATE TABLE with constraints
CREATE TABLE Employees (
    emp_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE,
    department VARCHAR(50) DEFAULT 'General',
    salary DECIMAL(10,2) CHECK (salary > 0),
    hire_date DATE DEFAULT CURRENT_DATE,
    manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES Employees(emp_id)
);

-- ALTER TABLE - Add column
ALTER TABLE Employees ADD phone VARCHAR(15);

-- ALTER TABLE - Modify column
ALTER TABLE Employees MODIFY COLUMN phone VARCHAR(20);

-- ALTER TABLE - Drop column
ALTER TABLE Employees DROP COLUMN phone;

-- ALTER TABLE - Add constraint
ALTER TABLE Employees ADD CONSTRAINT chk_salary CHECK (salary >= 0);

-- ALTER TABLE - Rename column (MySQL 8+)
ALTER TABLE Employees RENAME COLUMN name TO full_name;

-- CREATE INDEX
CREATE INDEX idx_department ON Employees(department);
CREATE UNIQUE INDEX idx_email ON Employees(email);

-- DROP INDEX
DROP INDEX idx_department ON Employees;

-- DROP TABLE
DROP TABLE IF EXISTS TempTable;

-- TRUNCATE (faster than DELETE, resets auto-increment)
TRUNCATE TABLE Logs;

-- DROP vs TRUNCATE vs DELETE
-- DROP: Removes table + data + structure
-- TRUNCATE: Removes all data, keeps structure
-- DELETE: Removes specific rows, can use WHERE`
  },
  {
    id: 10,
    title: 'CTEs and Advanced SQL',
    color: 'indigo',
    content: `Common Table Expressions (CTEs) create temporary named result sets that simplify complex queries.

CTE Benefits:
• Improve readability
• Enable recursive queries
• Can be referenced multiple times
• Better than subqueries for complex logic

Other Advanced Features:
• CASE WHEN: Conditional logic
• COALESCE/NULLIF: NULL handling
• UNION/INTERSECT/EXCEPT: Set operations`,
    example: `-- Simple CTE
WITH DeptSalary AS (
    SELECT department, AVG(salary) AS avg_salary
    FROM Employees
    GROUP BY department
)
SELECT e.name, e.salary, ds.avg_salary
FROM Employees e
JOIN DeptSalary ds ON e.department = ds.department
WHERE e.salary > ds.avg_salary;

-- Multiple CTEs
WITH 
HighEarners AS (
    SELECT * FROM Employees WHERE salary > 80000
),
ITDept AS (
    SELECT * FROM Employees WHERE department = 'IT'
)
SELECT * FROM HighEarners WHERE emp_id IN (SELECT emp_id FROM ITDept);

-- Recursive CTE (employee hierarchy)
WITH RECURSIVE EmpHierarchy AS (
    -- Base case: top-level managers
    SELECT emp_id, name, manager_id, 1 AS level
    FROM Employees WHERE manager_id IS NULL
    
    UNION ALL
    
    -- Recursive case: employees under managers
    SELECT e.emp_id, e.name, e.manager_id, eh.level + 1
    FROM Employees e
    JOIN EmpHierarchy eh ON e.manager_id = eh.emp_id
)
SELECT * FROM EmpHierarchy ORDER BY level, name;

-- CASE WHEN
SELECT name, salary,
    CASE 
        WHEN salary >= 100000 THEN 'Senior'
        WHEN salary >= 60000 THEN 'Mid-level'
        ELSE 'Junior'
    END AS level
FROM Employees;

-- COALESCE (first non-NULL value)
SELECT name, COALESCE(phone, email, 'No contact') AS contact
FROM Employees;

-- UNION (combine results, remove duplicates)
SELECT name, 'Employee' AS type FROM Employees
UNION
SELECT name, 'Customer' AS type FROM Customers;

-- UNION ALL (keep duplicates, faster)
SELECT department FROM Employees
UNION ALL
SELECT department FROM Contractors;

-- EXCEPT (in first but not in second)
SELECT email FROM AllUsers
EXCEPT
SELECT email FROM UnsubscribedUsers;`
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
}

export default function SQLConceptsPage() {
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
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/20">
              <Code2 className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">SQL Commands</h1>
              <p className="text-muted-foreground">Complete SQL Reference with Examples</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/20 mt-4">
            <p className="text-gray-300 text-sm">
              Master SQL from basic queries to advanced window functions and CTEs. Each command includes 
              detailed syntax and practical examples.
            </p>
          </div>

          {/* Query Execution Order */}
          <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 mt-4">
            <h3 className="font-semibold text-yellow-400 text-sm mb-2">📋 Query Execution Order</h3>
            <p className="text-gray-300 text-xs font-mono">
              FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → DISTINCT → ORDER BY → LIMIT
            </p>
          </div>
        </div>

        {/* SQL Concepts Sections */}
        <div className="space-y-6">
          {sqlConcepts.map((concept) => {
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
                    <span className="text-sm font-medium text-gray-400">SQL Examples</span>
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
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips - SQL</h2>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know the query execution order: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Master JOINs - draw Venn diagrams to visualize INNER, LEFT, RIGHT, FULL</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">WHERE filters rows BEFORE grouping, HAVING filters AFTER grouping</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Window functions (ROW_NUMBER, RANK, LEAD/LAG) are asked in senior interviews</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Practice writing queries without IDE - interviewers often use whiteboard</p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
              <p className="text-gray-300 text-sm">Know when to use EXISTS vs IN, and correlated vs non-correlated subqueries</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
