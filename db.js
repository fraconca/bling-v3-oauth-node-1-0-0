const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bling.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS tokens (
      id INTEGER PRIMARY KEY,
      access_token TEXT,
      refresh_token TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveTokensToDB(access_token, refresh_token) {
  db.run(
    `INSERT INTO tokens (access_token, refresh_token) VALUES (?, ?)`,
    [access_token, refresh_token],
    function (err) {
      if (err) {
        return console.error('Erro ao salvar no banco:', err.message);
      }
      console.log('📥 Tokens salvos no banco com sucesso!');
    }
  );
}

module.exports = { saveTokensToDB };