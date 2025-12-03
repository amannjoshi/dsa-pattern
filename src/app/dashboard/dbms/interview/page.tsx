'use client'

import Link from 'next/link'
import { ArrowLeft, Database, Code2, CheckCircle2, Building2 } from 'lucide-react'
import { useState } from 'react'

const dbmsQuestions = [
  {
    id: 1,
    question: 'What is the difference between DBMS and RDBMS?',
    answer: `DBMS (Database Management System):
• Stores data as files
• No relationship between data
• Normalization not present
• Does not support distributed database
• Examples: File systems, XML

RDBMS (Relational DBMS):
• Stores data in tabular form (rows and columns)
• Data is related through foreign keys
• Normalization is present
• Supports distributed database
• Follows ACID properties
• Examples: MySQL, PostgreSQL, Oracle, SQL Server`,
    companies: ['Amazon', 'Microsoft', 'Google', 'TCS', 'Infosys'],
    difficulty: 'Easy'
  },
  {
    id: 2,
    question: 'Explain ACID properties with examples.',
    answer: `ACID ensures reliable database transactions:

Atomicity: All or nothing
• Bank transfer: Debit AND Credit must both succeed or both fail
• If system crashes mid-transaction, rollback occurs

Consistency: Valid state before and after
• Total money in system remains same after transfer
• All constraints are satisfied

Isolation: Concurrent transactions don't interfere
• Two people booking same seat - only one succeeds
• Prevents dirty reads, phantom reads

Durability: Committed = Permanent
• Once "Payment Successful" shown, data survives crashes
• Achieved via Write-Ahead Logging (WAL)`,
    companies: ['Amazon', 'Google', 'Microsoft', 'Flipkart', 'Uber'],
    difficulty: 'Medium'
  },
  {
    id: 3,
    question: 'What is Normalization? Explain 1NF, 2NF, 3NF.',
    answer: `Normalization reduces redundancy and improves data integrity.

1NF (First Normal Form):
• Atomic values only (no arrays/lists in cells)
• Each row is unique
• Example: Split "Math, Science" into separate rows

2NF (Second Normal Form):
• Must be in 1NF
• No partial dependencies (all non-key attributes depend on ENTIRE primary key)
• Only applies to composite keys

3NF (Third Normal Form):
• Must be in 2NF
• No transitive dependencies
• Non-key attributes depend ONLY on primary key
• Example: If Student → Department → HOD, split into two tables`,
    companies: ['Oracle', 'IBM', 'Amazon', 'Goldman Sachs', 'Morgan Stanley'],
    difficulty: 'Medium'
  },
  {
    id: 4,
    question: 'What is the difference between DELETE, TRUNCATE, and DROP?',
    answer: `DELETE:
• DML command (can use WHERE clause)
• Deletes specific rows
• Can be rolled back
• Fires triggers
• Slower (row-by-row deletion)
• Auto-increment not reset

TRUNCATE:
• DDL command (no WHERE clause)
• Removes ALL rows
• Cannot be rolled back (in most DBMS)
• Does NOT fire triggers
• Faster (deallocates pages)
• Resets auto-increment

DROP:
• DDL command
• Removes entire table structure + data
• Cannot be rolled back
• Frees all space
• Table no longer exists`,
    companies: ['Microsoft', 'Oracle', 'Infosys', 'Wipro', 'Cognizant'],
    difficulty: 'Easy'
  },
  {
    id: 5,
    question: 'What are different types of Keys in DBMS?',
    answer: `Primary Key:
• Uniquely identifies each row
• Cannot be NULL, must be unique
• Only ONE per table

Foreign Key:
• References primary key of another table
• Maintains referential integrity
• Can be NULL

Candidate Key:
• Minimal set of attributes that can uniquely identify a row
• Table can have multiple candidate keys
• One becomes primary key

Super Key:
• Any set of attributes that uniquely identifies rows
• May contain extra attributes

Composite Key:
• Primary key made of multiple columns
• Used when single column isn't unique

Alternate Key:
• Candidate keys that are NOT chosen as primary key`,
    companies: ['Amazon', 'Facebook', 'Apple', 'Netflix', 'Google'],
    difficulty: 'Easy'
  },
  {
    id: 6,
    question: 'Explain different types of Joins with examples.',
    answer: `INNER JOIN:
• Returns only matching rows from both tables
• SELECT * FROM A INNER JOIN B ON A.id = B.id

LEFT JOIN (LEFT OUTER JOIN):
• All rows from left table + matching from right
• NULL for non-matching right rows

RIGHT JOIN (RIGHT OUTER JOIN):
• All rows from right table + matching from left
• NULL for non-matching left rows

FULL OUTER JOIN:
• All rows from both tables
• NULL where no match exists

CROSS JOIN:
• Cartesian product (every row with every row)
• If A has 3 rows, B has 4 rows = 12 rows result

SELF JOIN:
• Table joined with itself
• Used for hierarchical data (employee-manager)`,
    companies: ['Amazon', 'Microsoft', 'Google', 'Uber', 'LinkedIn'],
    difficulty: 'Medium'
  },
  {
    id: 7,
    question: 'What is Indexing? When to use and when not to use?',
    answer: `Index is a data structure that improves query speed by allowing quick lookups.

Types:
• B-Tree Index: For range queries, most common
• Hash Index: For exact match only
• Clustered Index: Determines physical order (one per table)
• Non-Clustered Index: Separate structure, multiple allowed

When to USE:
✓ Frequently searched columns
✓ Columns in WHERE, JOIN, ORDER BY
✓ Foreign key columns
✓ Large tables

When NOT to use:
✗ Small tables (full scan is faster)
✗ Frequently updated columns (index maintenance overhead)
✗ Columns with many NULL values
✗ Low cardinality columns (e.g., gender with only M/F)`,
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber', 'Stripe'],
    difficulty: 'Medium'
  },
  {
    id: 8,
    question: 'What is a Deadlock? How to prevent it?',
    answer: `Deadlock occurs when two or more transactions wait for each other to release locks, creating a circular dependency.

Example:
• T1 locks Table A, wants Table B
• T2 locks Table B, wants Table A
• Both wait forever!

Prevention Techniques:
1. Lock Ordering: Always acquire locks in same order
2. Lock Timeout: Set maximum wait time
3. Deadlock Detection: DBMS detects and kills one transaction
4. Two-Phase Locking (2PL): Acquire all locks before releasing any

Recovery:
• DBMS chooses victim transaction
• Rollback victim and release its locks
• Victim transaction retries`,
    companies: ['Amazon', 'Microsoft', 'Oracle', 'Goldman Sachs', 'JP Morgan'],
    difficulty: 'Hard'
  },
  {
    id: 9,
    question: 'Explain Transaction Isolation Levels.',
    answer: `Isolation levels control how transactions see each other's changes:

READ UNCOMMITTED (Lowest):
• Can read uncommitted data (Dirty Read)
• Fastest but least safe

READ COMMITTED:
• Only reads committed data
• Prevents dirty reads
• Default in PostgreSQL, Oracle

REPEATABLE READ:
• Same query returns same results within transaction
• Prevents dirty reads and non-repeatable reads
• Default in MySQL

SERIALIZABLE (Highest):
• Transactions execute as if serial
• Prevents all anomalies including phantom reads
• Slowest but safest

Anomalies:
• Dirty Read: Reading uncommitted data
• Non-Repeatable Read: Same query, different results
• Phantom Read: New rows appear in repeated query`,
    companies: ['Amazon', 'Google', 'Uber', 'Stripe', 'PayPal'],
    difficulty: 'Hard'
  },
  {
    id: 10,
    question: 'What is a View? What are its advantages?',
    answer: `A View is a virtual table based on a SQL query. It doesn't store data but provides a way to present data.

Advantages:
• Security: Hide sensitive columns
• Simplicity: Complex queries wrapped in simple view
• Data Independence: App doesn't know underlying structure
• Consistency: Same data presented same way

Types:
• Simple View: Single table, can update
• Complex View: Multiple tables/joins, usually read-only
• Materialized View: Physically stores data, needs refresh

Limitations:
• Cannot create index on regular view
• Performance overhead (query runs each time)
• Update restrictions with JOINs, GROUP BY, DISTINCT`,
    companies: ['Microsoft', 'Oracle', 'SAP', 'IBM', 'Accenture'],
    difficulty: 'Easy'
  },
  {
    id: 11,
    question: 'What is the difference between Clustered and Non-Clustered Index?',
    answer: `Clustered Index:
• Determines physical order of data in table
• Only ONE per table
• Faster for range queries
• Table data is stored at leaf nodes
• Primary key creates clustered index by default
• Example: Dictionary (words in alphabetical order)

Non-Clustered Index:
• Separate structure from data
• Can have MULTIPLE per table
• Contains pointers to actual data
• Requires extra lookup (bookmark lookup)
• Good for columns not in clustered index
• Example: Book index (page numbers pointing to content)

When to choose:
• Clustered: Most frequently accessed column for range queries
• Non-Clustered: Additional columns needing fast lookup`,
    companies: ['Microsoft', 'Amazon', 'Oracle', 'Google', 'Uber'],
    difficulty: 'Medium'
  },
  {
    id: 12,
    question: 'Explain Relational Algebra operations.',
    answer: `Relational Algebra is a procedural query language with these operations:

Basic Operations:
• Selection (σ): Filters rows - σ(salary>50000)(Employee)
• Projection (π): Selects columns - π(name,dept)(Employee)
• Union (∪): Combines relations (must be compatible)
• Set Difference (−): Tuples in R1 but not R2
• Cartesian Product (×): All combinations of tuples

Derived Operations:
• Intersection (∩): Common tuples
• Join (⋈): Combines related tuples
  - Natural Join: On common attributes
  - Theta Join: On any condition
  - Equi Join: Using equality
• Division (÷): "For all" queries

SQL Mapping:
• σ(condition) → WHERE
• π(columns) → SELECT
• × → CROSS JOIN
• ⋈ → JOIN`,
    companies: ['Google', 'Amazon', 'Microsoft', 'Oracle', 'IBM'],
    difficulty: 'Medium'
  }
]

const sqlQuestions = [
  {
    id: 1,
    question: 'Find the second highest salary from Employee table.',
    answer: `Method 1: Using Subquery
SELECT MAX(salary) FROM Employee
WHERE salary < (SELECT MAX(salary) FROM Employee);

Method 2: Using LIMIT/OFFSET
SELECT DISTINCT salary FROM Employee
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

Method 3: Using DENSE_RANK()
SELECT salary FROM (
    SELECT salary, DENSE_RANK() OVER (ORDER BY salary DESC) as rank
    FROM Employee
) ranked WHERE rank = 2;

Method 4: Using NOT IN
SELECT MAX(salary) FROM Employee
WHERE salary NOT IN (SELECT MAX(salary) FROM Employee);

For Nth highest salary, replace the logic accordingly.`,
    companies: ['Amazon', 'Google', 'Microsoft', 'Facebook', 'Uber'],
    difficulty: 'Medium'
  },
  {
    id: 2,
    question: 'Write a query to find duplicate records in a table.',
    answer: `Method 1: Using GROUP BY and HAVING
SELECT email, COUNT(*) as count
FROM Users
GROUP BY email
HAVING COUNT(*) > 1;

Method 2: Using Self Join
SELECT DISTINCT a.*
FROM Users a
JOIN Users b ON a.email = b.email AND a.id != b.id;

Method 3: Using Window Function
SELECT * FROM (
    SELECT *, COUNT(*) OVER (PARTITION BY email) as cnt
    FROM Users
) t WHERE cnt > 1;

Method 4: Using EXISTS
SELECT * FROM Users a
WHERE EXISTS (
    SELECT 1 FROM Users b 
    WHERE a.email = b.email AND a.id != b.id
);`,
    companies: ['Amazon', 'Microsoft', 'Oracle', 'Infosys', 'TCS'],
    difficulty: 'Easy'
  },
  {
    id: 3,
    question: 'Explain the difference between WHERE and HAVING.',
    answer: `WHERE:
• Filters rows BEFORE grouping
• Cannot use aggregate functions
• Works on individual rows
• Used without GROUP BY
• Example: WHERE salary > 50000

HAVING:
• Filters groups AFTER grouping
• CAN use aggregate functions
• Works on grouped data
• Must be used with GROUP BY
• Example: HAVING COUNT(*) > 5

Query Execution Order:
FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY

Example:
SELECT department, AVG(salary)
FROM Employees
WHERE status = 'Active'    -- Filters rows first
GROUP BY department
HAVING AVG(salary) > 50000  -- Filters groups after`,
    companies: ['Amazon', 'Microsoft', 'Google', 'Flipkart', 'Paytm'],
    difficulty: 'Easy'
  },
  {
    id: 4,
    question: 'Write a query to find employees who earn more than their manager.',
    answer: `Using Self Join:
SELECT e.name AS Employee, e.salary AS EmpSalary, 
       m.name AS Manager, m.salary AS MgrSalary
FROM Employees e
JOIN Employees m ON e.manager_id = m.emp_id
WHERE e.salary > m.salary;

Using Subquery:
SELECT e.name, e.salary
FROM Employees e
WHERE e.salary > (
    SELECT salary FROM Employees 
    WHERE emp_id = e.manager_id
);

Using CTE:
WITH ManagerSalary AS (
    SELECT emp_id, name, salary, manager_id,
           (SELECT salary FROM Employees WHERE emp_id = e.manager_id) as mgr_sal
    FROM Employees e
)
SELECT name, salary, mgr_sal
FROM ManagerSalary
WHERE salary > mgr_sal;`,
    companies: ['Amazon', 'Facebook', 'Google', 'LinkedIn', 'Uber'],
    difficulty: 'Medium'
  },
  {
    id: 5,
    question: 'Explain Window Functions with examples.',
    answer: `Window functions perform calculations across a set of rows related to current row, without collapsing them.

ROW_NUMBER(): Unique sequential number
SELECT name, salary, ROW_NUMBER() OVER (ORDER BY salary DESC) as rn
FROM Employees;

RANK(): Ranks with gaps (1,2,2,4)
SELECT name, RANK() OVER (ORDER BY salary DESC) as rank FROM Employees;

DENSE_RANK(): Ranks without gaps (1,2,2,3)
SELECT name, DENSE_RANK() OVER (ORDER BY salary DESC) as rank FROM Employees;

PARTITION BY: Restart calculation per group
SELECT name, department, salary,
    ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as dept_rank
FROM Employees;

LAG/LEAD: Access previous/next row
SELECT name, salary,
    LAG(salary, 1) OVER (ORDER BY emp_id) as prev_salary,
    LEAD(salary, 1) OVER (ORDER BY emp_id) as next_salary
FROM Employees;`,
    companies: ['Amazon', 'Google', 'Microsoft', 'Uber', 'Airbnb'],
    difficulty: 'Hard'
  },
  {
    id: 6,
    question: 'Find the top 3 highest paid employees in each department.',
    answer: `Using DENSE_RANK():
SELECT * FROM (
    SELECT name, department, salary,
        DENSE_RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
    FROM Employees
) ranked
WHERE rank <= 3;

Using ROW_NUMBER() (no ties):
SELECT * FROM (
    SELECT name, department, salary,
        ROW_NUMBER() OVER (PARTITION BY department ORDER BY salary DESC) as rn
    FROM Employees
) ranked
WHERE rn <= 3;

Using Correlated Subquery:
SELECT e1.name, e1.department, e1.salary
FROM Employees e1
WHERE 3 > (
    SELECT COUNT(DISTINCT e2.salary)
    FROM Employees e2
    WHERE e2.department = e1.department AND e2.salary > e1.salary
);`,
    companies: ['Amazon', 'Facebook', 'Google', 'Netflix', 'Apple'],
    difficulty: 'Hard'
  },
  {
    id: 7,
    question: 'Write a query to delete duplicate rows keeping one.',
    answer: `Method 1: Using ROW_NUMBER() (Recommended)
DELETE FROM Employees
WHERE id IN (
    SELECT id FROM (
        SELECT id, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn
        FROM Employees
    ) t WHERE rn > 1
);

Method 2: Using Self Join
DELETE e1 FROM Employees e1
JOIN Employees e2 
ON e1.email = e2.email AND e1.id > e2.id;

Method 3: Using NOT IN with MIN
DELETE FROM Employees
WHERE id NOT IN (
    SELECT MIN(id) FROM Employees GROUP BY email
);

Method 4: Using CTE (SQL Server)
WITH CTE AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY email ORDER BY id) as rn
    FROM Employees
)
DELETE FROM CTE WHERE rn > 1;`,
    companies: ['Amazon', 'Microsoft', 'Oracle', 'Goldman Sachs', 'Morgan Stanley'],
    difficulty: 'Medium'
  },
  {
    id: 8,
    question: 'Explain the difference between UNION and UNION ALL.',
    answer: `UNION:
• Combines results from two SELECT statements
• Removes duplicate rows
• Performs sorting for duplicate removal
• Slower due to extra processing
• Columns must match in number and type

SELECT city FROM Customers
UNION
SELECT city FROM Suppliers;

UNION ALL:
• Combines results without removing duplicates
• Faster (no sorting/comparison)
• Use when duplicates are acceptable or impossible

SELECT city FROM Customers
UNION ALL
SELECT city FROM Suppliers;

When to use:
• UNION: Need unique results
• UNION ALL: Know no duplicates exist OR duplicates are needed

Performance Tip:
If you know there are no duplicates, always use UNION ALL as it's much faster.`,
    companies: ['Microsoft', 'Oracle', 'IBM', 'Infosys', 'Wipro'],
    difficulty: 'Easy'
  },
  {
    id: 9,
    question: 'Write a query to find cumulative/running total.',
    answer: `Using Window Function (Best):
SELECT order_date, amount,
    SUM(amount) OVER (ORDER BY order_date) as running_total
FROM Orders;

Running total per customer:
SELECT customer_id, order_date, amount,
    SUM(amount) OVER (PARTITION BY customer_id ORDER BY order_date) as customer_running_total
FROM Orders;

Using Self Join (older method):
SELECT o1.order_date, o1.amount,
    SUM(o2.amount) as running_total
FROM Orders o1
JOIN Orders o2 ON o2.order_date <= o1.order_date
GROUP BY o1.order_date, o1.amount;

Using Correlated Subquery:
SELECT order_date, amount,
    (SELECT SUM(amount) FROM Orders o2 
     WHERE o2.order_date <= o1.order_date) as running_total
FROM Orders o1;`,
    companies: ['Amazon', 'Google', 'Uber', 'Stripe', 'PayPal'],
    difficulty: 'Medium'
  },
  {
    id: 10,
    question: 'Find employees who joined in the last 30 days.',
    answer: `MySQL:
SELECT * FROM Employees
WHERE join_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- Alternative
SELECT * FROM Employees
WHERE join_date >= NOW() - INTERVAL 30 DAY;

PostgreSQL:
SELECT * FROM Employees
WHERE join_date >= CURRENT_DATE - INTERVAL '30 days';

SQL Server:
SELECT * FROM Employees
WHERE join_date >= DATEADD(day, -30, GETDATE());

Oracle:
SELECT * FROM Employees
WHERE join_date >= SYSDATE - 30;

Generic (using DATEDIFF):
SELECT * FROM Employees
WHERE DATEDIFF(CURDATE(), join_date) <= 30;`,
    companies: ['Amazon', 'Microsoft', 'Infosys', 'TCS', 'Accenture'],
    difficulty: 'Easy'
  },
  {
    id: 11,
    question: 'Write a query to pivot rows to columns.',
    answer: `Using CASE/SUM (Works in all databases):
SELECT 
    employee_id,
    SUM(CASE WHEN month = 'Jan' THEN sales ELSE 0 END) as Jan,
    SUM(CASE WHEN month = 'Feb' THEN sales ELSE 0 END) as Feb,
    SUM(CASE WHEN month = 'Mar' THEN sales ELSE 0 END) as Mar
FROM Sales
GROUP BY employee_id;

SQL Server PIVOT:
SELECT * FROM (
    SELECT employee_id, month, sales FROM Sales
) src
PIVOT (
    SUM(sales) FOR month IN ([Jan], [Feb], [Mar])
) pvt;

MySQL (using MAX/IF):
SELECT 
    employee_id,
    MAX(IF(month = 'Jan', sales, NULL)) as Jan,
    MAX(IF(month = 'Feb', sales, NULL)) as Feb,
    MAX(IF(month = 'Mar', sales, NULL)) as Mar
FROM Sales
GROUP BY employee_id;`,
    companies: ['Amazon', 'Microsoft', 'Google', 'Oracle', 'SAP'],
    difficulty: 'Hard'
  },
  {
    id: 12,
    question: 'Find customers who placed orders in consecutive days.',
    answer: `Using LAG Window Function:
SELECT DISTINCT customer_id FROM (
    SELECT customer_id, order_date,
        LAG(order_date) OVER (PARTITION BY customer_id ORDER BY order_date) as prev_date
    FROM Orders
) t
WHERE DATEDIFF(order_date, prev_date) = 1;

Using Self Join:
SELECT DISTINCT o1.customer_id
FROM Orders o1
JOIN Orders o2 ON o1.customer_id = o2.customer_id
    AND DATEDIFF(o1.order_date, o2.order_date) = 1;

Find customers with 3+ consecutive days:
SELECT customer_id FROM (
    SELECT customer_id, order_date,
        order_date - ROW_NUMBER() OVER (PARTITION BY customer_id ORDER BY order_date) as grp
    FROM Orders
) t
GROUP BY customer_id, grp
HAVING COUNT(*) >= 3;`,
    companies: ['Amazon', 'Uber', 'DoorDash', 'Instacart', 'Swiggy'],
    difficulty: 'Hard'
  }
]

type FilterType = 'all' | 'dbms' | 'sql'
type DifficultyType = 'all' | 'Easy' | 'Medium' | 'Hard'

export default function DBMSInterviewPage() {
  const [filter, setFilter] = useState<FilterType>('all')
  const [difficulty, setDifficulty] = useState<DifficultyType>('all')
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const filteredDBMS = filter === 'sql' ? [] : dbmsQuestions.filter(q => 
    difficulty === 'all' || q.difficulty === difficulty
  )
  const filteredSQL = filter === 'dbms' ? [] : sqlQuestions.filter(q => 
    difficulty === 'all' || q.difficulty === difficulty
  )

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id)
  }

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
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20">
              <Building2 className="w-8 h-8 text-purple-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">DBMS Interview Questions</h1>
              <p className="text-muted-foreground">Top questions asked at FAANG & product companies</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex gap-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === 'all' 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('dbms')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filter === 'dbms' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Database className="w-4 h-4" />
              DBMS
            </button>
            <button
              onClick={() => setFilter('sql')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
                filter === 'sql' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
              }`}
            >
              <Code2 className="w-4 h-4" />
              SQL
            </button>
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {(['all', 'Easy', 'Medium', 'Hard'] as DifficultyType[]).map((d) => (
              <button
                key={d}
                onClick={() => setDifficulty(d)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  difficulty === d
                    ? d === 'Easy' ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                    : d === 'Medium' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                    : d === 'Hard' ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                    : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                }`}
              >
                {d === 'all' ? 'All Levels' : d}
              </button>
            ))}
          </div>
        </div>

        {/* DBMS Questions Section */}
        {filteredDBMS.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Database className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">DBMS Theory Questions</h2>
              <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                {filteredDBMS.length} questions
              </span>
            </div>
            <div className="space-y-4">
              {filteredDBMS.map((q) => (
                <div 
                  key={`dbms-${q.id}`}
                  className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/20 hover:border-blue-500/40 transition-colors"
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpand(`dbms-${q.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">Q{q.id}</span>
                      </div>
                      <h3 className="font-medium text-white">{q.question}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {q.companies.slice(0, 3).map((company) => (
                          <span key={company} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                            {company}
                          </span>
                        ))}
                        {q.companies.length > 3 && (
                          <span className="text-xs text-gray-500">+{q.companies.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <CheckCircle2 className={`w-5 h-5 shrink-0 transition-transform ${
                      expandedId === `dbms-${q.id}` ? 'text-blue-400 rotate-180' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  {expandedId === `dbms-${q.id}` && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-lg overflow-x-auto">
                        {q.answer}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SQL Questions Section */}
        {filteredSQL.length > 0 && (
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <Code2 className="w-5 h-5 text-green-400" />
              <h2 className="text-xl font-semibold text-white">SQL Query Questions</h2>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                {filteredSQL.length} questions
              </span>
            </div>
            <div className="space-y-4">
              {filteredSQL.map((q) => (
                <div 
                  key={`sql-${q.id}`}
                  className="p-4 rounded-xl bg-green-500/5 border border-green-500/20 hover:border-green-500/40 transition-colors"
                >
                  <div 
                    className="flex items-start justify-between cursor-pointer"
                    onClick={() => toggleExpand(`sql-${q.id}`)}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`text-xs px-2 py-0.5 rounded-full ${
                          q.difficulty === 'Easy' ? 'bg-green-500/20 text-green-400' :
                          q.difficulty === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {q.difficulty}
                        </span>
                        <span className="text-xs text-gray-500">Q{q.id}</span>
                      </div>
                      <h3 className="font-medium text-white">{q.question}</h3>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {q.companies.slice(0, 3).map((company) => (
                          <span key={company} className="text-xs bg-white/5 text-gray-400 px-2 py-0.5 rounded">
                            {company}
                          </span>
                        ))}
                        {q.companies.length > 3 && (
                          <span className="text-xs text-gray-500">+{q.companies.length - 3} more</span>
                        )}
                      </div>
                    </div>
                    <CheckCircle2 className={`w-5 h-5 shrink-0 transition-transform ${
                      expandedId === `sql-${q.id}` ? 'text-green-400 rotate-180' : 'text-gray-600'
                    }`} />
                  </div>
                  
                  {expandedId === `sql-${q.id}` && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <pre className="text-sm text-green-400 whitespace-pre-wrap font-mono bg-black/30 p-4 rounded-lg overflow-x-auto">
                        {q.answer}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20">
          <h2 className="text-xl font-semibold text-white mb-4">🎯 Interview Tips</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium text-blue-400">DBMS Theory</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Know ACID with bank transfer example</li>
                <li>• Practice normalizing tables to 3NF</li>
                <li>• Understand indexing trade-offs</li>
                <li>• Explain isolation levels clearly</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium text-green-400">SQL Queries</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Master window functions (ROW_NUMBER, RANK)</li>
                <li>• Practice without IDE - use paper</li>
                <li>• Know multiple approaches for same problem</li>
                <li>• Understand query execution order</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
