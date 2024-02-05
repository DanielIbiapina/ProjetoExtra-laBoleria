import { connectionDB } from "../database/db.js";

export async function postParticipant(req, res) {
  const { name } = req.body;

  const nameExiste = await connectionDB.query(
    "SELECT name FROM participants WHERE name=$1;",
    [name]
  );

  if (nameExiste.rowCount > 0) {
    res.status(409).send("Esse nome já existe!");
    return;
  }

  await connectionDB.query("INSERT INTO participants (name) VALUES ($1);", [
    name,
  ]);

  // Adiciona uma mensagem indicando a entrada na sala
  await connectionDB.query(
    "INSERT INTO messages (\"from\", \"to\", text, type, time) VALUES ($1, 'Todos', 'entra na sala...', 'status', NOW());",
    [name]
  );

  res.sendStatus(201);
}

export async function postStatus(req, res) {
  const { name } = req.body;

  const nameExists = await connectionDB.query(
    "SELECT name FROM status WHERE name = $1;",
    [name]
  );

  if (nameExists.rowCount === 0) {
    await connectionDB.query(
      "INSERT INTO status (name, online, last_activity) VALUES ($1, true, NOW());",
      [name]
    );
    res.status(201).send("Usuário registrado como online!");
  } else {
    await connectionDB.query(
      "UPDATE status SET online = true, last_activity = NOW() WHERE name = $1;",
      [name]
    );
    res.status(200).send("Status atualizado para online!");
  }
}

export async function checkAndUpdateStatus() {
  const inactivityThreshold = 5 * 1000;

  const inactiveUsers = await connectionDB.query(
    `SELECT name FROM status WHERE online = true AND last_activity < NOW() - interval '${inactivityThreshold} milliseconds';`
  );

  for (const user of inactiveUsers.rows) {
    console.log(inactiveUsers.rows);
    // Adiciona uma mensagem indicando que a pessoa saiu da sala
    await connectionDB.query(
      "INSERT INTO messages (\"from\", \"to\", text, type, time) VALUES ($1, 'Todos', 'sai da sala...', 'status', NOW());",
      [user.name]
    );

    // Remove o usuário da lista de participantes
    await connectionDB.query("DELETE FROM participants WHERE name = $1;", [
      user.name,
    ]);

    // Atualiza o status para offline
    await connectionDB.query(
      "UPDATE status SET online = false WHERE name = $1;",
      [user.name]
    );
  }
}

export async function postMessage(req, res) {
  const { from, to, text, type } = req.body;

  // Validação básica dos campos necessários
  if (!from || !text || !type) {
    return res.status(400).json({ error: "Campos obrigatórios ausentes." });
  }

  const newMessage = {
    from,
    to: to || "Todos",
    text,
    type,
    time: new Date().toLocaleTimeString(),
  };
  console.log(newMessage);
  // Adiciona a nova mensagem à tabela de mensagens
  await connectionDB.query(
    'INSERT INTO messages ("from", "to", text, type, time) VALUES ($1, $2, $3, $4, $5);',
    [
      newMessage.from,
      newMessage.to,
      newMessage.text,
      newMessage.type,
      newMessage.time,
    ]
  );

  res.status(201).json(newMessage);
}

export async function getMessages(req, res) {
  try {
    const result = await connectionDB.query("SELECT * FROM messages;");
    const messages = result.rows;

    res.json(messages);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}

export async function getParticipants(req, res) {
  try {
    const result = await connectionDB.query("SELECT * FROM participants;");
    const participants = result.rows;

    res.json(participants);
  } catch (error) {
    console.error("Erro ao buscar participantes:", error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
}
