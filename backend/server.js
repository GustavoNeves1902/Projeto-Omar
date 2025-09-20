const express = require("express");
const multer = require("multer");
const { Pool } = require("pg");
const cors = require("cors");

const app = express();
const upload = multer(); // para receber arquivos
const port = 3000;

// Configuração do banco (ajuste conforme seu ambiente)
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "Aluno",
  password: "Gustavo@1902",
  port: 5432,
});

app.use(cors());
app.use(express.json());

// Rota para buscar aluno pelo ID
app.get("/aluno/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Buscando aluno ID:", id); // DEBUG
    const result = await pool.query(
      "SELECT nome_perfil, encode(foto_avatar, 'base64') AS foto FROM Aluno WHERE id=$1",
      [id]
    );
    console.log(result.rows); // DEBUG

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: "Aluno não encontrado" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro no servidor");
  }
});

// Rota para atualizar o nome do aluno
app.put("/aluno/:id/nome", async (req, res) => {
  try {
    const { id } = req.params;
    const { nome_perfil } = req.body;

    await pool.query(
      "UPDATE Aluno SET nome_perfil=$1 WHERE id=$2",
      [nome_perfil, id]
    );

    res.send("Nome atualizado com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar nome");
  }
});

// Rota para atualizar a foto do aluno
app.put("/aluno/:id/foto", upload.single("foto"), async (req, res) => {
  try {
    const { id } = req.params;
    const foto = req.file.buffer;

    await pool.query(
      "UPDATE Aluno SET foto_avatar=$1 WHERE id=$2",
      [foto, id]
    );

    res.send("Foto atualizada com sucesso!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao atualizar foto");
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
