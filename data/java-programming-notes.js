/** Study notes for the Java Programming notebook */
const NOTEBOOK_ID = 'java-programming';
const BASE_DATE = new Date('2026-08-11');

const notes = [
  {
    id: 'java-methods',
    slug: 'methods',
    notebookId: NOTEBOOK_ID,
    title: 'Methods',
    category: 'Fundamentals',
    excerpt: 'Method signatures, parameters vs arguments, void vs return, overloading, and procedural abstraction.',
    tags: ['methods', 'abstraction', 'overloading'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## What is a method?

A **method** declares a compound procedure and labels it. Several steps of logic are grouped into one named block; the name is how the rest of the program invokes that work.

> **Exam trap:** Declaring \`square(int x)\` does **not** run it. Methods execute only when **called** from \`main\` or another method.

## Method signature

\`\`\`java
int square(int x)
\`\`\`

| Part | Meaning |
|------|---------|
| \`int\` (before name) | Return type — sends an integer back to the caller |
| \`square\` | Method name |
| \`int x\` | One parameter; \`x\` is the parameter name inside the method |

**Parameter vs argument**

\`\`\`java
int square(int x) { return x * x; }  // x is the parameter

square(30);   // 30 is the argument
square(a);    // if a = 30, Java resolves the value first, then passes it
\`\`\`

The lecturer’s point: you pass an **integer value**, not a variable slot. That value can be a literal, a variable, or an expression.

## void vs returning a value

\`\`\`java
void printSquare(int x) {
    System.out.println(x * x);  // prints only — no value returned
}

int square(int x) {
    return x * x;               // caller receives the result
}
\`\`\`

> **Exam trap:** \`return\` does **not** print. You must assign, use, or print the returned value yourself.

## Method overloading

Same method name, **different parameter lists** — the compiler picks the match at **compile time** by name + argument types.

\`\`\`java
int square()       { return 0; }
int square(int x)  { return x * x; }
\`\`\`

**Legal:** different count, types, or order of parameters.

**Illegal — duplicate method error:**

\`\`\`java
int test()    { return 1; }
double test() { return 1.0; }  // same parameter list — only return type differs
\`\`\`

When method A calls method B, Java **pauses** A, runs B, passes back any return value, then continues A.

## Procedural abstraction

**Procedural abstraction** hides internal steps behind a meaningful name. Readers follow high-level flow without parsing every low-level instruction — **cognitive load** drops.

| Term | Meaning |
|------|---------|
| **Cognitive load** | How much a developer must hold in working memory to read or change code |
| **Modeling** | Representing software visually or structurally (diagrams, UML, written design) |
| **Design** | Deciding what the system needs now *and* what it may need later |

> Ben Goldacre’s TED talk on research funding ([*What doctors don't know about the drugs they prescribe*](https://www.ted.com/talks/ben_goldacre_what_doctors_don_t_know_about_the_drugs_they_prescribe)) is a useful reminder: science survives **argument** — grants, papers, and conference talks are all forms of communication embedded in the process, not decoration after discovery.

## Why methods reduce complexity

- Create **structure** — read programs at a higher level
- **Hide** implementation details
- **Reuse** logic instead of duplicating it

## Why more lines ≠ more complexity

Extracting duplicated logic into methods may **increase line count** but **lower** cognitive load and make future edits safer. Structure code is allowed to add lines if it controls complexity.`,
  },
  {
    id: 'java-complexity',
    slug: 'complexity-and-requirements',
    notebookId: NOTEBOOK_ID,
    title: 'Software Complexity & Requirements',
    category: 'Design',
    excerpt: 'Complexity formula, symptoms, business vs structure code, functional and non-functional requirements.',
    tags: ['complexity', 'requirements', 'design'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Software complexity

**Software complexity** = anything that makes a system hard to understand and amend.

You cannot eliminate complexity entirely. The goal is to **delay**, **control**, and prevent it from becoming unmanageable.

### Weighted complexity

\`\`\`
Software Complexity = Σ (cᵢ × tᵢ)
\`\`\`

- **cᵢ** — complexity of component *i*
- **tᵢ** — time developers spend working on that component

A messy module nobody touches hurts less than a messy **hotspot** changed every week.

## Three symptoms

| Symptom | What it means | Example |
|---------|---------------|---------|
| **Change amplification** | One change forces many others | Tight coupling spreads edits across the codebase |
| **Cognitive load** | Too much context required for a small fix | Must read the whole system to change one feature |
| **Unknown unknowns** | You don't know what you don't know | Hidden dependencies; unclear which file to edit |

## Business logic vs structure code

| Type | Role |
|------|------|
| **Business logic code** | Implements requirements directly |
| **Structure code** | Organizes the system (classes, interfaces, layers) |

Structure code may add lines, but its purpose is **controlling complexity**.

## Requirements

| Type | Question |
|------|----------|
| **Functional** | *What* should the system do? |
| **Non-functional** | *How well* should it do it? (performance, security, maintainability) |

Methods serve both: they implement behavior **and** improve maintainability through organization.`,
  },
  {
    id: 'java-classes-objects',
    slug: 'classes-and-objects',
    notebookId: NOTEBOOK_ID,
    title: 'Classes & Objects',
    category: 'OOP',
    excerpt: 'Class rules, PascalCase vs camelCase, members, objects on the heap, and JVM memory layout.',
    tags: ['classes', 'objects', 'heap', 'memory'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Why classes exist

A **class** groups related variables and methods — Java’s main tool for **separating code into meaningful files**.

### Naming rules

| Kind | Convention | Example |
|------|------------|---------|
| Class | PascalCase | \`Cat\`, \`SensorReading\` |
| Method | camelCase | \`getAge\`, \`calculateArea\` |

**Public class rule:** if the class is \`public\`, the filename must match: \`Cat.java\` → \`public class Cat\`.

### Class members

Classes contain **variables** and **methods** only. You cannot place bare executable statements in the class body:

\`\`\`java
// ILLEGAL directly in class body:
if (age > 2) {
    System.out.println("Old cat");
}
\`\`\`

Logic belongs inside methods, constructors, or initializer blocks.

## Class vs object

| | Class | Object |
|---|-------|--------|
| Role | Blueprint / definition | Actual instance at runtime |
| Memory | Metadata in Method Area | Contiguous block on **heap** |

\`\`\`java
Cat tom = new Cat();
\`\`\`

1. JVM allocates heap memory for a \`Cat\` instance
2. Constructor runs
3. Reference variable \`tom\` holds the address of that object

### Inside each object (heap block)

- **Object header** — metadata (Mark Word, Klass pointer to class data)
- **Instance data** — field values (primitives + references)
- **No bytecode** — code lives with the class, not inside each instance

## CPU & memory perspective

| Term | Meaning |
|------|---------|
| **Object** | Raw contiguous bytes holding fields + header |
| **Heap** | Global region where all objects are allocated |
| **Reference variable** | Holds the memory address of an object (“remote control”) |

### Where references live

| Location | Holds |
|----------|-------|
| **Stack** | Local reference variables inside methods — die when the method returns |
| **Heap (inside object)** | Instance fields that are reference types |

## Entity abstraction

**Entity abstraction** = representing a whole concept as one class with related attributes and methods.

\`\`\`
Circle
├── radius
├── color
└── calculateArea()
\`\`\`

| Abstraction type | Created by | Hides |
|------------------|------------|-------|
| **Procedural** | Methods | *How* an action is done |
| **Entity** | Classes | Related state + behavior as one unit |`,
  },
  {
    id: 'java-references',
    slug: 'references-and-strings',
    notebookId: NOTEBOOK_ID,
    title: 'References, Strings & Pass-by-Value',
    category: 'Memory',
    excerpt: 'Java is strictly pass-by-value, the new keyword, String pool, and the dot operator.',
    tags: ['references', 'strings', 'pass-by-value'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Java is strictly pass-by-value

Java **never** passes the object itself or the original reference variable — only a **copy of the bits** in the variable.

| Type passed | What the callee receives |
|-------------|--------------------------|
| **Primitive** | Copy of the value (e.g. \`5\`) — changes inside the method don't affect the caller |
| **Reference** | Copy of the address — both copies point at the same object |

> See the [Java Language Specification](https://docs.oracle.com/javase/specs/jls/se17/html/jls-8.html): parameter passing is always by value.

### Reading \`new\`

- **\`new\`** → fresh heap allocation
- **No \`new\`** → usually no new object (except string literals — see below)

## String pool vs heap

\`\`\`java
String a = "hello";              // String pool (interned)
String b = "hello";              // reuses same pool object
String c = new String("hello");  // forces NEW heap object

System.out.println(a == b);       // true  — same address
System.out.println(a == c);       // false — different objects
System.out.println(a.equals(c));  // true  — same characters
\`\`\`

> **Exam trap:** \`==\` compares **references** (addresses). \`.equals()\` compares **content** for objects like \`String\`.

## Dot operator

\`.\` means *access a member through something*:

\`\`\`java
objectReference.member   // instance member
ClassName.staticMember   // class-level member
\`\`\`

Methods in the same class can call each other:

\`\`\`java
public void sayHello() {
    say("hello");
}
\`\`\`

## Instance vs static variables (preview)

| | Instance variable | Static variable |
|---|-------------------|-----------------|
| Belongs to | Each object | The class |
| Memory | Copied per \`new\` on heap | **One** copy in Method Area |
| Change scope | \`tom.age\` ≠ \`z.age\` | All objects share the same value |`,
  },
  {
    id: 'java-static',
    slug: 'static-members',
    notebookId: NOTEBOOK_ID,
    title: 'Static vs Instance Members',
    category: 'Memory',
    excerpt: 'Method Area vs heap, static methods, invokestatic, and why static code cannot touch instance fields.',
    tags: ['static', 'method-area', 'heap'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Static members

Add \`static\` to attach a member to the **class**, not to individual objects.

\`\`\`java
public class Cat {
    public static String city;

    public static void resetCity() {
        city = "Suly";
    }
}
\`\`\`

Access without an object:

\`\`\`java
Cat.city = "Suly";
Cat.resetCity();
\`\`\`

All instances share one static field:

\`\`\`java
Cat tom = new Cat();
Cat z = new Cat();
Cat.city = "Suly";

System.out.println(tom.city); // Suly
System.out.println(z.city);  // Suly
System.out.println(Cat.city); // Suly
\`\`\`

## JVM memory areas (runtime)

| Area | Stores |
|------|--------|
| **Method Area** (Metaspace) | Class structures, bytecode, **static variables**, runtime constant pool |
| **Heap** | All **object instances** and arrays |
| **Stack** | Stack frames, local variables, operand stack per thread |

- **Static variable** → allocated **once** when the class loads; one address for the whole app lifecycle
- **Instance field** → allocated inside each heap object on every \`new\`

## Static methods

- Called via \`ClassName.method()\` — no object required
- May access **only other static** members
- Bytecode: \`invokestatic\` — stack frame has **no \`this\`**

## Instance methods

- Need a **base object** (\`this\`)
- Compiler secretly adds \`this\` as the first parameter:

\`\`\`java
// You write:
public float getAge() { return age; }

// Compiler conceptually generates:
public float getAge(Cat this) { return this.age; }
\`\`\`

Calling \`tom.getAge()\` pushes a stack frame whose slot 0 holds **tom’s address**.

## Bytecode instructions (exam vocabulary)

| Context | Read field | Write field | Call method |
|---------|------------|-------------|-------------|
| Static | \`getstatic\` / \`putstatic\` | fixed Method Area address | \`invokestatic\` |
| Instance | \`getfield\` / \`putfield\` | needs \`this\` + offset | \` invokevirtual\` etc. |

> **Why static methods can't use instance fields:** no \`this\` in the frame → CPU cannot compute the field offset on the heap. **Compile-time error.**`,
  },
  {
    id: 'java-constructors',
    slug: 'constructors',
    notebookId: NOTEBOOK_ID,
    title: 'Constructors & Initialization',
    category: 'OOP',
    excerpt: 'Constructors vs init(), overloading, this(), chaining, static blocks, and garbage collection.',
    tags: ['constructors', 'this', 'gc'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Constructor basics

A **constructor** runs automatically when an object is created:

\`\`\`java
Cat tom = new Cat();
\`\`\`

1. Allocate memory
2. Run \`Cat\` constructor
3. \`tom\` references the new object

Unlike a manual \`init()\` method, callers **cannot forget** construction — initialization policy is enforced.

**Class invariant:** a condition that must hold for **every** object of the class (e.g. every \`Sensor\` has a valid ID).

### Default constructor

If you write **no** constructors, Java provides:

\`\`\`java
public Cat() { }
\`\`\`

If you add **any** constructor, the default is **not** supplied unless you define it yourself.

## Constructor overloading

Same class name, **different parameter lists**:

\`\`\`java
new Cat();         // Cat()
new Cat(2.5f);     // Cat(float age)
\`\`\`

Example — sensor registration with sentinel reading:

\`\`\`java
public Sensor(String id, String unit) {
    this(id, unit, -999.0);  // delegate to full constructor
}

public Sensor(String id, String unit, double lastReading) {
    this.sensorId = id;
    this.unit = unit;
    this.lastReading = lastReading;
    this.calibrated = lastReading != -999.0;
}
\`\`\`

## \`this\` vs \`this(...)\`

| Syntax | Meaning |
|--------|---------|
| \`this.field\` | Current object’s field (disambiguate from parameter) |
| \`this(args)\` | Call **another constructor** in the same class — **must be first line** |

### Shadowing trap

| Expression | Resolves to |
|------------|-------------|
| \`sensorId\` | parameter (closer scope) |
| \`this.sensorId\` | instance field |
| \`sensorId = sensorId\` | **no-op** on the field |
| \`this.sensorId = sensorId\` | **correct** assignment |

## Chaining beats duplication

Without \`this(...)\`, Constructor 1 duplicates assignments from Constructor 2. Add a fifth field later → update **one** constructor; the other inherits via chaining. Same principle as extracting a method.

## Static block

Runs **once** when the class is first loaded:

\`\`\`java
static {
    System.out.println("Cat class loaded");
}
\`\`\`

Imitating “first object only” logic with a static flag in a constructor is possible but usually a static block or static initializer is clearer.

## Garbage collection

**GC** reclaims heap objects that are **no longer reachable** through any live reference. You don't \`free\` manually in Java.`,
  },
  {
    id: 'java-inheritance',
    slug: 'inheritance-and-overriding',
    notebookId: NOTEBOOK_ID,
    title: 'Inheritance, Overriding & Access',
    category: 'OOP',
    excerpt: 'super, private fields, method overriding, static methods, and access modifiers.',
    tags: ['inheritance', 'overriding', 'encapsulation'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## Inheritance

One class **reuses** members from another:

- **Superclass** — inherited from (\`Shape\`)
- **Subclass** — inherits (\`Circle extends Shape\`)

Subclasses inherit **non-private** members and may add new fields and methods.

### Setting private superclass fields

\`\`\`java
public class Shape {
    private String color;
    public Shape(String color) { this.color = color; }
}

public class Circle extends Shape {
    private double radius;

    public Circle(String color, double radius) {
        super(color);   // Shape constructor sets private color
        this.radius = radius;
    }
}
\`\`\`

\`\`\`java
// ERROR in Circle — color is private to Shape:
this.color = color;
super.color = color;
\`\`\`

> **Rule:** \`super(...)\` must be the **first** statement in a subclass constructor — superclass part is built first.

## Method overriding

Subclass provides a **new implementation** for an inherited instance method — **same signature**:

\`\`\`java
// Shape
public double calculateArea() {
    System.err.println("Area not defined for generic shape.");
    return 0.0;
}

// Circle
@Override
public double calculateArea() {
    return Math.PI * radius * radius;
}
\`\`\`

Use \`@Override\` — if signatures differ (e.g. wrong parameter types), the compiler catches a mistaken **overload** instead of a silent new method.

## Static methods are NOT overridden

Static methods belong to the **class**, not the object. The compiler resolves the call at compile time by the **reference type**, not polymorphic instance behavior.

\`\`\`java
Shape s = new Circle();
// Static dispatch — no runtime override like instance methods
\`\`\`

Overriding is about **object-specific** behavior; static methods don't participate.

## Access modifiers

| Modifier | Visibility |
|----------|------------|
| \`public\` | Everywhere |
| \`private\` | Declaring class only |
| \`protected\` | Subclasses + same package |
| *(default / package-private)* | Same package only |

Design preference in course: keep it simple — mostly **public** methods, **private** fields (encapsulation).`,
  },
  {
    id: 'java-design-uml',
    slug: 'design-uml-and-crc',
    notebookId: NOTEBOOK_ID,
    title: 'Design, CRC & UML',
    category: 'Design',
    excerpt: 'Grouping requirements into classes, CRC cards, and UML class diagram rules.',
    tags: ['uml', 'crc', 'design'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## From requirements to classes

Before coding, group **functional requirements** into logical entities:

| Requirement cluster | Candidate class |
|---------------------|-----------------|
| Employee data | \`Employee\` |
| Payroll rules | \`Payroll\` |
| Scheduling | \`Schedule\` |
| Notifications | \`Notification\` |

## CRC cards

| Column | Content |
|--------|---------|
| **Class** | Component name |
| **Responsibilities** | What it knows or does → often become methods/fields |
| **Collaborators** | Other classes it needs |

UML class diagrams catch design mistakes **before** writing Java.

## UML visibility

| Symbol | Modifier |
|--------|----------|
| \`+\` | public |
| \`-\` | private |
| \`#\` | protected |

**Encapsulation rule:** attributes **private** (\`-\`); methods other classes call **public** (\`+\`).

## Relationships

\`\`\`
       Shape
      ▲     ▲
      |     |
  Circle  Rectangle
\`\`\`

Empty arrowhead at subclass → **inheritance**.

**Association (solid line):** long-term reference — \`Person\` ─── \`Schedule\`

**Dependency (dashed \`-->\`):** temporary use (parameter, local variable)

**Aggregation (\`<>\--\`):** part can exist independently — Course ◇── Students

**Composition (\`*--\`):** part dies with whole — Order ◆── OrderItems

**Multiplicity:** label ends (\`1\`, \`*\`, \`0..1\`) — e.g. Person **1** ─── **\*** Appointments

In Java, one-to-many often looks like:

\`\`\`java
private List<Appointment> appointments;
\`\`\`

## CRC → UML (six steps)

1. Draw a 3-compartment box per CRC class
2. Class name in top compartment
3. Each responsibility → \`+methodName()\` in bottom compartment (camelCase)
4. Deduce fields → \`-\` in middle compartment
5. Lines to every collaborator
6. Arrowhead points toward the class being **used**

> UML helps you see coupling and misplaced responsibilities early — cheaper than refactoring production code.`,
  },
  {
    id: 'java-abstract-packages',
    slug: 'abstract-final-and-packages',
    notebookId: NOTEBOOK_ID,
    title: 'abstract, final & Packages',
    category: 'Advanced OOP',
    excerpt: 'Incomplete classes and methods, restricting inheritance, namespaces, and contractual abstraction.',
    tags: ['abstract', 'final', 'packages', 'interfaces'],
    isPublic: true,
    dateAdded: BASE_DATE,
    dateUpdated: BASE_DATE,
    body: `## final — “no more change”

Meaning depends on **where** it appears:

| Attached to | Effect |
|-------------|--------|
| **class** | Cannot extend (\`String\` is \`final\` — no subclasses) |
| **method** | Cannot override |
| **variable** | Assign once only |

\`\`\`java
public final class SecureToken { }

public class Shape {
    public final void auditLog() { }  // subclasses cannot override
}
\`\`\`

## abstract — intentionally incomplete

| | abstract class | abstract method |
|---|----------------|-----------------|
| Meaning | Cannot \`new\` it directly | Signature only — **no body** |
| Subclass job | Must be concrete (unless also abstract) | Must implement |

\`\`\`java
public abstract class Shape {
    private String color;

    public Shape(String color) { this.color = color; }

    public abstract double calculateArea();
}

// ILLEGAL:
Shape s = new Shape("blue");

// OK:
Circle c = new Circle("blue", 5.0);
\`\`\`

\`Shape\` declares **what** every shape must do; each concrete shape supplies **how**.

## Packages

A **package** is a namespace — prevents name collisions when projects or libraries grow.

\`\`\`java
package edu.auis.util.math;

public class Shape { }
\`\`\`

- Package line must be **first** in the file (comments/license excepted)
- Folder path must match: \`edu/auis/util/math/Shape.java\`
- **Default package** (no declaration) — avoid for real projects; collision risk when combining code

Reversed domain style (\`edu.auis...\`) keeps names globally unique.

## Contractual abstraction

An **interface** defines required behavior without fixing the implementation — code depends on the **contract**, not one concrete class. (Full interface syntax comes later in the course; the idea: program to capabilities, not to a single type.)

## final parameters

\`\`\`java
public Circle(final double radius) {
    this.radius = radius;
    // radius = 10;  // compile error — parameter is read-only inside method
}
\`\`\`

\`final\` on a parameter prevents accidental reassignment; it does **not** make the object’s field immutable unless the field itself is \`final\`.`,
  },
];

notes.forEach((note, index) => {
  const ordered = new Date('2026-08-11T12:00:00Z');
  ordered.setMinutes(ordered.getMinutes() - index);
  note.dateAdded = ordered;
  note.dateUpdated = ordered;
});

module.exports = { notes };
