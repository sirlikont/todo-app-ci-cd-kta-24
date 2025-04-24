const express = require('express');
const cors = require('cors'); // Import CORS
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'todos.db');

// Kasutame CORS, et lubada päringud kõikidest allikatest (nt. frontend, localhost jne)
app.use(cors());
app.use(express.json()); // Luba JSON body parsimine

const db = new sqlite3.Database(DB_FILE);

// Kui andmebaas ei ole olemas, siis loome selle
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, done INTEGER)');
});

// Lõpp-punkt todo loendi saamiseks
app.get('/api/todos', (req, res) => {
  db.all('SELECT * FROM todos', (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows); // Tagasta kõik TODO'd JSON kujul
  });
});

// Lõpp-punkt uue todo lisamiseks
app.post('/api/todos', (req, res) => {
  const { title } = req.body;
  db.run('INSERT INTO todos (title, done) VALUES (?, ?)', [title, 0], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ id: this.lastID, title, done: 0 }); // Tagasta uus todo
  });
});

// Lõpp-punkt todo ülesande uuendamiseks (näiteks valmisolek)
app.put('/api/todos/:id', (req, res) => {
  const { title, done } = req.body;
  db.run('UPDATE todos SET title = ?, done = ? WHERE id = ?', [title, done, req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ id: req.params.id, title, done }); // Tagasta uuendatud todo
  });
});

// Lõpp-punkt todo kustutamiseks
app.delete('/api/todos/:id', (req, res) => {
  db.run('DELETE FROM todos WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send(); // Tagasta tühi vastus, kui on edukalt kustutatud
  });
});

// Käivitame serveri määratud pordil
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://learnvibes.me:${PORT}`);
});


