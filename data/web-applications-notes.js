/** Study notes for the Web Applications notebook */
const NOTEBOOK_ID = 'web-applications';
const BASE = { isPublic: true, notebookId: NOTEBOOK_ID, category: 'Networking' };

const notes = [
  {
    id: 'web-session-ports',
    slug: 'session-layer-and-ports',
    title: 'Session Layer & Ports',
    tags: ['osi', 'tcp', 'ports'],
    excerpt: 'How sessions map applications to connections using source and destination ports.',
    ...BASE,
    body: `## Session layer recap

The **session layer** manages **conversations** between processes on two hosts. It tracks which application on Host A talks to which application on Host B.

Without sessions, Host B receives bytes but cannot route them to the correct app (browser vs Spotify vs mail client).

## Ports implement sessions

| Field | Role |
|-------|------|
| **Source port** | Chosen by sender OS — ephemeral, unique per outgoing connection |
| **Destination port** | Identifies the **service** on the receiver (80 = HTTP, 443 = HTTPS, 25 = SMTP) |

### Example: browser → web server

**Outbound (your machine → server):**

\`\`\`
Source Port      = 10000  (random ephemeral)
Destination Port = 80     (HTTP)
\`\`\`

**Return (server → your machine):**

\`\`\`
Source Port      = 80
Destination Port = 10000   ← OS knows: this belongs to your browser tab
\`\`\`

## Port ranges

| Range | Name | Use |
|-------|------|-----|
| **0–1023** | Well-known | Standard services (HTTP, HTTPS, FTP, DNS…) |
| **1024–49151** | Registered | Assigned applications/services |
| **49152–65535** | Ephemeral | Temporary client ports for new sessions |

## In code (Python)

\`\`\`python
import requests
requests.get("http://example.com")
\`\`\`

Behind the scenes:

1. OS opens ephemeral source port (e.g. **53221**)
2. Destination port = **80** (HTTP scheme)
3. TCP maps the connection to your Python process
4. Response arrives with destination port **53221** → handed to the right process

> **Exam tip:** \`http://example.com:8080\` — the number after \`:\` is an **explicit destination port**, overriding the default (80 for HTTP, 443 for HTTPS).`,
  },
  {
    id: 'web-dns',
    slug: 'dns-hierarchy',
    title: 'DNS Hierarchy & Resolution',
    tags: ['dns', 'application-layer'],
    excerpt: 'Root servers, TLDs, authoritative nameservers, and recursive resolver flow.',
    ...BASE,
    category: 'Networking',
    body: `## DNS is a tree

Each node knows how to find the level below it.

\`\`\`
Root (13 clusters: A-root … M-root)
  └── TLD servers (.com, .org, .edu, .krd)
        └── Authoritative name servers (e.g. auis.edu.krd)
\`\`\`

- **Root servers** do not store website IPs — they know where **TLD servers** live.
- **TLD servers** track **authoritative** servers for domains under that TLD.

## Recursive resolver walkthrough

Resolver (e.g. **8.8.8.8** — Google Public DNS):

1. Ask root: *"Where are .krd nameservers?"* → get TLD list
2. Ask .krd TLD: *"Where is auis.edu.krd authoritative?"* → get authoritative NS
3. Ask authoritative: *"IP for www.auis.edu.krd?"* → **A** or **AAAA** record
4. **Cache** the answer; return IP to client

## Full path (browser → page)

1. Browser asks resolver: *"IP of www.auis.edu.krd?"*
2. If not cached: Root → .krd TLD → authoritative for \`auis.edu.krd\`
3. Resolver returns IP to browser
4. Browser opens TCP connection to that IP

All of this typically completes in **milliseconds**. DNS caching makes repeat lookups faster.

> Domains do **not** establish TCP sessions themselves — they make hosts **findable** via the resolver.`,
  },
  {
    id: 'web-tcp-four-tuple',
    slug: 'tcp-ip-and-the-four-tuple',
    title: 'TCP/IP & the Four-Tuple',
    tags: ['tcp', 'handshake', 'exam'],
    excerpt: 'Source/dest IP and ports, three-way handshake, congestion control, exam-style domain explanation.',
    ...BASE,
    category: 'Networking',
    body: `## Building a connection

When you type a URL and press Enter, the OS opens a **TCP connection**. That requires the **4-tuple**:

| Component | How it is chosen |
|-----------|------------------|
| **Destination IP** | DNS resolver translates hostname |
| **Source IP** | OS kernel picks from routing table / active interface |
| **Destination port** | From URL scheme (http→80, https→443) or explicit \`:8080\` |
| **Source port** | Random ephemeral port (can be requested manually) |

## TCP three-way handshake

1. Client → **SYN**
2. Server → **SYN-ACK**
3. Client → **ACK**

Only after this can **HTTP** ride on top of the connection.

## How TCP helps

- **Congestion control** — increases send rate until ACKs stop arriving, then backs off (detects bottleneck)
- **Reliability** — retransmits lost segments
- **Ordering** — byte stream in sequence

## Exam-style: domain names under TCP/IP

1. User enters domain on client
2. **Recursive resolver** climbs DNS tree (root → TLD e.g. .com/.krd → authoritative)
3. Authoritative returns IP (e.g. for \`google.com\`)
4. Client completes TCP handshake with that IP
5. HTTP request/response exchanges; browser renders page

**Key points for grading:**

- HTTP rides **established TCP** connections — not before handshake completes
- Domains work **through DNS**; they don't manage sessions themselves
- Process happens in ms; DNS **caching** speeds repeat visits
- OSI session concepts **converged** into TCP/IP in practice

## Role of HTTP (separate layer)

HTTP dictates **what** client and server say to each other (methods, headers, body) — not **how** the wire connection is built. That is TCP's job.`,
  },
  {
    id: 'web-http-protocol',
    slug: 'http-protocol',
    title: 'HTTP Protocol',
    tags: ['http', 'tls', 'methods'],
    excerpt: 'Plain-text requests/responses, methods, keep-alive, FIN/ACK teardown, telnet demo.',
    ...BASE,
    category: 'Protocols',
    body: `## HTTP's role

HTTP defines **communication format** between client and server — not socket establishment (TCP/TLS handle that).

Once TLS (for HTTPS) is ready, the browser sends a request over the secure TCP connection.

## Raw HTTP request (plain text)

\`\`\`http
GET / HTTP/1.1
Host: www.auis.edu.krd
User-Agent: Chrome/122.0
Accept: text/html
Connection: keep-alive
\`\`\`

Meaning: *"Give me the root path \`/\` using HTTP/1.1."*

## Raw HTTP response

\`\`\`http
HTTP/1.1 200 OK
Content-Type: text/html
Content-Length: 1589

<!DOCTYPE html>...
\`\`\`

- **Status line** — \`200 OK\` = success
- **Headers** — metadata
- **Blank line**
- **Body** — HTML payload

## Try it yourself

\`\`\`bash
telnet www.auis.edu.krd 80
GET / HTTP/1.1
Host: www.auis.edu.krd

\`\`\`

(Blank line after headers ends the request.)

## HTTP methods

| Method | Meaning | Example |
|--------|---------|---------|
| **GET** | Read resource (usually no body) | Load page, image |
| **POST** | Send data to server | Form submit, login |
| **PUT** | Replace resource | API update |
| **DELETE** | Remove resource | Delete record |
| **HEAD** | Headers only | Check existence |
| **PATCH** | Partial update | Edit one field |
| **OPTIONS** | Allowed methods | CORS preflight |

## GET vs POST (forms)

- **GET** — browser may send \`Host\`, \`User-Agent\`, etc. so server renders correctly; form data in **URL query string**
- **POST** — optional second phase; **body** may contain credentials or form fields

## Connection lifecycle

After the page loads:

- Connection may **stay open ~10s** (\`keep-alive\`) for CSS/JS/images on same TCP link
- If idle, server sends **FIN** → client **ACK** → graceful close

## Why "text-based" matters

Requests and responses are human-readable lines. Format:

1. Request / status line
2. Headers
3. Blank line
4. Optional body`,
  },
  {
    id: 'web-nat-private-ip',
    slug: 'private-ips-and-nat',
    title: 'Private IPs & NAT',
    tags: ['nat', 'networking'],
    excerpt: 'Non-routable private addresses, NAT translation table, shared public IP.',
    ...BASE,
    category: 'Networking',
    body: `## Private IP addresses

Private IPs (e.g. \`192.168.x.x\`) are **not globally unique** — anyone can reuse them on a LAN. They never traverse the public internet directly.

## NAT router

When private machines reach the internet, traffic passes through a **Network Address Translator (NAT)**.

| Device | Private IP | Public IP (internet sees) |
|--------|------------|---------------------------|
| Laptop 1 | 192.168.1.2 | 203.0.113.10 |
| Laptop 2 | 192.168.1.3 | 203.0.113.10 |

Both laptops appear as **the same public IP** to remote servers.

## How sessions stay distinct

NAT maintains a **translation table**:

\`\`\`
(private IP, private port) ↔ (public IP, public port)
\`\`\`

- **Outbound:** rewrite private IP → public IP (+ port mapping)
- **Inbound:** match public port → correct private IP + port

Port mappings keep Spotify, browser, and mail separate even behind one public IP.`,
  },
  {
    id: 'web-node-express-basics',
    slug: 'node-express-basics',
    title: 'Node, Callbacks & Express Basics',
    tags: ['node', 'express', 'middleware'],
    excerpt: 'Anonymous callbacks, custom modules, middleware chain, app.get vs app.use.',
    ...BASE,
    category: 'Express',
    body: `## Anonymous callback functions

A function **with no name**, passed directly as a value — reactive logic: *"When X happens, run this."*

\`\`\`javascript
server.on("request", function (req, res) {
  // handle the request
});
\`\`\`

Node hands \`req\` and \`res\` to your callback when a request arrives.

## Custom modules

Split the app into files with **own scope** and **exports** — routing here, DB logic there. Modular design is the default in Node, not an afterthought.

## Middleware

Functions between incoming request and final response with access to \`req\`, \`res\`, and \`next\`.

Middleware can:

- Execute any code
- Modify \`req\` / \`res\`
- End the cycle (send response)
- Call \`next()\` to continue the chain

\`\`\`javascript
app.use(function (req, res, next) {
  console.log("Request came in");
  next(); // pass to next middleware
});
\`\`\`

### Request flow

\`\`\`
Request → middleware 1 → next() → middleware 2 → next() → route handler → response
\`\`\`

## Express vs raw Node

\`express()\` creates your **request manager** (\`app\`).

\`\`\`javascript
app.get("/", (req, res) => {
  res.send("Hello");
});
\`\`\`

Express handles method check, path matching, and headers — you don't manually parse URLs.

### app.get is conditional middleware

- Runs only for **GET**
- Runs only for matching **path** (e.g. \`"/"\` = site root)

### Order matters

\`\`\`javascript
app.use(express.json());   // BEFORE routes
app.get("/api/users", handler);
\`\`\`

\`app.use\` registers global middleware for **every** request.`,
  },
  {
    id: 'web-json-forms',
    slug: 'json-and-forms',
    title: 'JSON, GET Forms & POST Forms',
    tags: ['express', 'forms', 'json'],
    excerpt: 'express.json, urlencoded, req.query vs req.body, extended:true.',
    ...BASE,
    category: 'Express',
    body: `## JSON in Express

JSON is how APIs exchange structured data.

\`\`\`javascript
app.use(express.json());
\`\`\`

- Parses \`Content-Type: application/json\` bodies into \`req.body\`
- \`res.send({ name: "Ali" })\` sets JSON headers automatically

\`\`\`javascript
app.get("/api/users", (req, res) => {
  res.send([{ id: 1, name: "Lara" }]);
});
\`\`\`

Returns **data**, not an HTML page — that's an **API endpoint**.

## GET form submission

\`\`\`html
<form action="/formSubmit" method="GET">
  <input name="name">
  <input name="email">
</form>
\`\`\`

Browser sends:

\`\`\`
GET /formSubmit?name=Zheen&email=z@example.com
\`\`\`

Express matches path \`/formSubmit\` only; query string becomes:

\`\`\`javascript
req.query = { name: "Zheen", email: "z@example.com" };
\`\`\`

\`\`\`javascript
app.get("/formSubmit", (req, res) => {
  res.send(JSON.stringify(req.query));
});
\`\`\`

## POST form submission

Data lives in the **body**, not the URL:

\`\`\`
POST /formSubmit
body: name=Zheen&email=z@example.com
\`\`\`

Without a parser, \`req.body\` is **{}** or **undefined**.

\`\`\`javascript
app.use(express.urlencoded({ extended: true }));

app.post("/formSubmit", (req, res) => {
  res.send(JSON.stringify(req.body));
});
\`\`\`

### extended: true

Uses the **qs** library — handles nested objects/arrays in forms. **Always use \`extended: true\`** for HTML forms in practice; exams rarely test false vs true.

## Rule of thumb

| Data location | Express property | Typical method |
|---------------|------------------|----------------|
| After \`?\` in URL | \`req.query\` | GET |
| Request body (forms) | \`req.body\` | POST + \`urlencoded\` |
| Request body (JSON) | \`req.body\` | POST + \`json()\` |

## Both at once

\`\`\`html
<form action="/submit?version=2" method="POST">
\`\`\`

\`\`\`javascript
req.query = { version: "2" };
req.body  = { name: "Zheen", email: "z@example.com" };
\`\`\`

## Hidden inputs

\`\`\`html
<input type="hidden" name="id" value="123">
\`\`\`

Same rules — GET → \`req.query\`, POST → \`req.body\`.`,
  },
  {
    id: 'web-express-structure',
    slug: 'express-project-structure',
    title: 'Splitting Express & HTTP Metadata',
    tags: ['express', 'router', 'headers'],
    excerpt: 'express.Router, multi-file apps, headers vs payload, res.send behavior.',
    ...BASE,
    category: 'Express',
    body: `## Splitting into multiple files

\`\`\`
app.js          → middleware, app.use(routers), listen
getRoutes.js    → GET handlers
postRoutes.js   → POST handlers
\`\`\`

Each route file:

\`\`\`javascript
const router = express.Router();
router.get("/api/users", handler);
module.exports = router;
\`\`\`

Main app:

\`\`\`javascript
app.use(getRoutes);
app.use(postRoutes);
\`\`\`

You're plugging smaller routers into the main \`app\`.

## HTTP response anatomy

Every response has:

1. **Metadata (headers)** — status, Content-Type, Content-Length, Date…
2. **Payload (body)** — HTML, JSON, bytes

\`\`\`javascript
res.send("<h1>Hello</h1>");
\`\`\`

Express sets \`Content-Type: text/html\`, status, length — you focus on payload.

### Wrong metadata = broken client

| Mistake | Result |
|---------|--------|
| HTML labeled as JSON | Browser shows raw text, not a page |
| JSON labeled as text | \`fetch().json()\` fails |

Middleware can alter **headers** (CORS, cookies) and **payload** (parsers filling \`req.body\`).

## Why templates exist

Embedding HTML in JS strings:

\`\`\`javascript
res.send(\`<h1>Hello \${name}</h1>\`);
\`\`\`

…becomes unmaintainable at scale. **Templates** separate structure (HTML) from logic (Express).`,
  },
  {
    id: 'web-ejs',
    slug: 'ejs-templates',
    title: 'EJS Templates & Views',
    tags: ['ejs', 'templates', 'mvc'],
    excerpt: 'View engine, res.render, syntax, views folder, passing objects and loops.',
    ...BASE,
    category: 'Express',
    body: `## Setup

\`\`\`bash
npm install ejs
\`\`\`

\`\`\`javascript
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
\`\`\`

## View engine flow

\`\`\`
views/home.ejs  →  EJS engine  →  final HTML  →  browser
\`\`\`

\`\`\`javascript
res.render("home", { name: "Zheen" });
\`\`\`

Looks for \`views/home.ejs\`, replaces \`<%= name %>\`, sends HTML.

## EJS syntax

| Syntax | Purpose |
|--------|---------|
| \`<%= expr %>\` | Output escaped value |
| \`<%- html %>\` | Output raw HTML |
| \`<% code %>\` | Run JS (no output) — loops, if |
| \`<% include 'partial' %>\` | Include another template |

\`\`\`html
<h1>Hello <%= name %></h1>
<% if (loggedIn) { %>
  <p>Welcome back!</p>
<% } %>
\`\`\`

## Project layout

\`\`\`
myProject/
├── app.js
└── views/
    └── index.ejs
\`\`\`

Nested: \`res.render("users/profile")\` → \`views/users/profile.ejs\`

> One \`res.render\` per request. Missing file → \`Failed to lookup view "home"\`.

## Passing data

\`\`\`javascript
res.render("index", {
  title: "Home",
  user: { name: "Zheen", isLoggedIn: true },
  items: ["a", "b"],
});
\`\`\`

Inside EJS — properties become variables directly:

\`\`\`html
<h1><%= title %></h1>
<p><%= user.name %></p>
<% items.forEach(item => { %>
  <li><%= item %></li>
<% }); %>
\`\`\`

Shorthand:

\`\`\`javascript
let user = { name: "Zheen" };
let settings = { theme: "dark" };
res.render("profile", { user, settings });
\`\`\`

## Loop whitespace trap

Indented HTML inside loops sends **spaces every iteration** — inflates payload. Tight tags in loops when size matters:

\`\`\`html
<% for (let i = 0; i < 100; i++) { %><h1>test <%= i %></h1><% } %>
\`\`\`

## Forms → EJS

\`\`\`javascript
app.post("/submit", (req, res) => {
  res.render("result", { user: req.body });
});
\`\`\`

Template: \`<%= user.name %>\` after \`urlencoded\` middleware.`,
  },
  {
    id: 'web-cookies',
    slug: 'cookies-and-security',
    title: 'Cookies, Signing & Encryption',
    tags: ['cookies', 'security', 'stateless'],
    excerpt: 'HTTP statelessness, res.cookie, JSON in cookies, signed/encrypted cookies.',
    ...BASE,
    category: 'Security',
    body: `## HTTP is stateless

Server handles request → sends response → **forgets**. Neither side remembers the user by default.

**Cookies** (client-stored) and **sessions** (server-stored) add **state**.

## Cookies

Key–value pairs the **browser stores** and sends on every request to that origin.

\`\`\`javascript
app.use(cookieParser());

app.get("/login", (req, res) => {
  res.cookie("loggedIn", "true", { httpOnly: true });
  res.redirect("/");
});

app.get("/", (req, res) => {
  const loggedIn = req.cookies.loggedIn === "true";
  res.render("index", { user: { isLoggedIn: loggedIn } });
});

app.get("/logout", (req, res) => {
  res.clearCookie("loggedIn");
  res.redirect("/");
});
\`\`\`

> **res.cookie** sends a cookie. **app.set** configures Express (view engine, paths) — different API.

Cookies store **strings only**:

\`\`\`javascript
res.cookie("user", JSON.stringify({ name: "Zheen", isLoggedIn: true }));

// read back:
const user = JSON.parse(req.cookies.user || "{}");
\`\`\`

## Cookie options

| Option | Effect |
|--------|--------|
| \`httpOnly\` | JS on client cannot read |
| \`secure\` | HTTPS only |
| \`signed\` | Tamper detection |
| \`maxAge\` / \`expires\` | Lifetime |

## Why not encrypt-and-compare on server?

Storing originals server-side for comparison → **stateful** → breaks multi-server scale, lost on restart.

**Stateless approach:** sign or encrypt cookie **value** with a secret; verify on return.

| Technique | Property |
|-----------|----------|
| **Signing** | Readable but tamper-evident (session IDs) |
| **Encryption** | Opaque + tamper breaks decryption |

Tools: \`cookie-parser\` (sign), \`encrypt-cookie\`, Node \`crypto\` for secrets.

## Server restart problem

Random secrets generated at startup → restart **invalidates all cookies**. Production: store secrets in **environment variables**, not generated each boot.`,
  },
  {
    id: 'web-sessions-database',
    slug: 'sessions-databases-three-tier',
    title: 'Sessions, Three-Tier & Databases',
    tags: ['sessions', 'mysql', 'architecture'],
    excerpt: 'Session scaling limits, browser-server-DB separation, why no direct DB access.',
    ...BASE,
    category: 'Architecture',
    body: `## Sessions (server-side state)

\`\`\`
Browser stores: encrypted session_id only
Server stores: sensitive data in memory keyed by session ID
\`\`\`

Easy API: \`req.session.user = { ... }\`

### Scaling problem

User logs in on **Server A**; next request hits **Server B** — no shared memory → **broken auth**.

Fixes (Redis, Memcached) add ops complexity. Instructor's scalable preference:

- Store user data in a **database**
- Send **minimal signed/encrypted** token in cookie
- Verify on each request — **stateless**, horizontally scalable

## Three-tier architecture

\`\`\`
Browser (HTML/CSS/JS)
    ↕ HTTP only
Node.js server (logic, validation, translation)
    ↕ SQL / driver protocol
MySQL (persistent state)
\`\`\`

| Tier | Responsibility |
|------|----------------|
| **Client** | UI, HTTP requests — **no DB access** |
| **Server** | Business logic, auth, SQL on behalf of client |
| **Database** | Store, index, optimize queries |

## Why browser ≠ MySQL

1. **Security** — credentials in client = anyone can \`DROP TABLE\`
2. **Logic** — validation and permissions belong on server
3. **Performance** — hundreds of direct DB connections would overwhelm MySQL
4. **Abstraction** — clients shouldn't know SQL schemas

> A **database user** is an application account for the server — not a human visitor.

## Connecting Node to MySQL

Need: host/IP, port (3306 default), username, password, database name.

\`\`\`javascript
const mysql = require("mysql2");
const dbConfig = { host, user, password, database, port };
\`\`\`

If **Workbench connects** but Node doesn't → check code. If **Workbench fails** → credentials/port.`,
  },
  {
    id: 'web-mysql-lab',
    slug: 'mysql-prepared-statements',
    title: 'MySQL Lab & Prepared Statements',
    tags: ['mysql', 'sql-injection', 'lab'],
    excerpt: 'INSERT/SELECT flow, placeholders vs string concat, SQL injection prevention.',
    ...BASE,
    category: 'Database',
    body: `## Registration form → database

**Person** table: \`ID\`, \`FirstName\`, \`LastName\`, \`Age\`, \`Email\`

Stack: **Express** + **mysql2** + **EJS**

\`\`\`javascript
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
\`\`\`

## POST handler flow

1. Extract fields from \`req.body\` (already parsed)
2. **Validate** input
3. \`mysql.createConnection(dbConfig)\`
4. \`connection.connect()\`
5. Prepared \`INSERT\` with \`?\` placeholders
6. \`connection.query(sql, values, callback)\`
7. \`connection.end()\`
8. \`res.render("success", …)\`

## SQL injection — string concat (BAD)

\`\`\`javascript
// NEVER do this:
const sql = \`INSERT INTO Person VALUES ('\${firstName}', ...)\`;
\`\`\`

Attacker input:

\`\`\`
Robert'); DROP TABLE Person; --
\`\`\`

→ Two statements: insert + **drop table**.

## Prepared statements (GOOD)

\`\`\`javascript
const sql = "INSERT INTO Person (first_name, last_name, age, email) VALUES (?, ?, ?, ?)";
const values = [firstName, lastName, age, email];
connection.query(sql, values, (err, result) => { ... });
\`\`\`

\`?\` = locked boxes filled **outside** the SQL string. Malicious text stays a **harmless string value**.

Benefits: faster reuse, safe quoting, no manual escaping.

## SELECT + EJS

\`\`\`javascript
const sql = "SELECT first_name, last_name, age FROM Person";
\`\`\`

Template:

\`\`\`html
<%= person.first_name %> (<%= person.age %>)
\`\`\`

## Decoupled pattern

Keep SQL in one module, routes in another, views in \`views/\` — same router export pattern as splitting GET/POST files.`,
  },
];

notes.forEach((note, index) => {
  const ordered = new Date('2026-08-11T14:00:00Z');
  ordered.setMinutes(ordered.getMinutes() - index);
  note.dateAdded = ordered;
  note.dateUpdated = ordered;
});

module.exports = { notes };
