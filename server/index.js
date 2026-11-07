const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const DB_FILE = path.join(__dirname, 'database.json');

// Initialize database file
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify({ users: [], sessions: [] }, null, 2));
}

function readDb() {
  try {
    const raw = fs.readFileSync(DB_FILE, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    return { users: [], sessions: [] };
  }
}

function writeDb(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

const server = http.createServer((req, res) => {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // API Router
  if (req.url === '/api/auth/google' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { email, name, picture, sub } = JSON.parse(body);
        const db = readDb();
        let user = db.users.find(u => u.email === email);

        if (!user) {
          user = {
            id: 'usr_' + Date.now(),
            googleId: sub || 'g_' + Date.now(),
            name: name || 'Google Scholar',
            email: email,
            avatar: picture || '',
            authProvider: 'google',
            course: 'Computer Science',
            year: 3,
            state: 'Maharashtra',
            familyIncome: 550000,
            category: 'General',
            academicScore: 84,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          db.users.push(user);
        } else {
          user.lastLogin = new Date().toISOString();
          if (picture) user.avatar = picture;
          if (name) user.name = name;
        }

        writeDb(db);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  if (req.url === '/api/auth/register' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { email, name, password } = JSON.parse(body);
        const db = readDb();
        let user = db.users.find(u => u.email === email);

        if (user) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: false, error: 'Account with this email already exists' }));
          return;
        }

        user = {
          id: 'usr_' + Date.now(),
          name: name || email.split('@')[0],
          email: email,
          password: password, // In production, hash with bcrypt
          authProvider: 'email',
          course: 'Computer Science',
          year: 3,
          state: 'Maharashtra',
          familyIncome: 550000,
          category: 'General',
          academicScore: 84,
          createdAt: new Date().toISOString(),
          lastLogin: new Date().toISOString()
        };

        db.users.push(user);
        writeDb(db);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  if (req.url === '/api/auth/login' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try {
        const { email, password } = JSON.parse(body);
        const db = readDb();
        let user = db.users.find(u => u.email === email);

        if (!user) {
          // Auto-provision demo account for quick sign-in if not present
          user = {
            id: 'usr_' + Date.now(),
            name: email.split('@')[0].replace('.', ' '),
            email: email,
            authProvider: 'email',
            course: 'Computer Science',
            year: 3,
            state: 'Maharashtra',
            familyIncome: 550000,
            category: 'General',
            academicScore: 84,
            createdAt: new Date().toISOString(),
            lastLogin: new Date().toISOString()
          };
          db.users.push(user);
        } else {
          user.lastLogin = new Date().toISOString();
        }

        writeDb(db);

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: true, user }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ success: false, error: 'Invalid payload' }));
      }
    });
    return;
  }

  if (req.url === '/api/auth/logout' && req.method === 'POST') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, message: 'Logged out successfully' }));
    return;
  }

  if (req.url === '/api/users' && req.method === 'GET') {
    const db = readDb();
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ success: true, count: db.users.length, users: db.users }));
    return;
  }

  // 404 fallback
  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
});

server.listen(PORT, () => {
  console.log(`GRANTLY Backend API server listening on http://localhost:${PORT}`);
});

