import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import pkg from "pg";

dotenv.config();
const { Pool } = pkg;

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const SECRET_KEY = process.env.JWT_SECRET || "troque_essa_senha";

// Middleware de autenticação
function autenticarToken(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Criar usuário admin (apenas 1 vez)
app.post("/registro", async (req, res) => {
  const { email, senha } = req.body;
  const hashedPassword = await bcrypt.hash(senha, 10);
  await pool.query(
    "INSERT INTO usuarios (email, senha) VALUES ($1, $2)",
    [email, hashedPassword]
  );
  res.json({ message: "Usuário criado" });
});

// Login
app.post("/login", async (req, res) => {
  const { email, senha } = req.body;
  const result = await pool.query(
    "SELECT * FROM usuarios WHERE email=$1",
    [email]
  );
  if (result.rows.length === 0) return res.sendStatus(401);
  const user = result.rows[0];
  if (!(await bcrypt.compare(senha, user.senha))) return res.sendStatus(401);
  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "8h" });
  res.json({ token });
});

// CRUD Fornecedores
app.get("/fornecedores", autenticarToken, async (req, res) => {
  const { rows } = await pool.query("SELECT * FROM fornecedores ORDER BY id DESC");
  res.json(rows);
});

app.post("/fornecedores", autenticarToken, async (req, res) => {
  const { nome, endereco, cnpj, ie, cep, contato } = req.body;
  await pool.query(
    "INSERT INTO fornecedores (nome, endereco, cnpj, ie, cep, contato) VALUES ($1, $2, $3, $4, $5, $6)",
    [nome, endereco, cnpj, ie, cep, contato]
  );
  res.json({ message: "Fornecedor adicionado" });
});

app.put("/fornecedores/:id", autenticarToken, async (req, res) => {
  const { nome, endereco, cnpj, ie, cep, contato } = req.body;
  await pool.query(
    "UPDATE fornecedores SET nome=$1, endereco=$2, cnpj=$3, ie=$4, cep=$5, contato=$6 WHERE id=$7",
    [nome, endereco, cnpj, ie, cep, contato, req.params.id]
  );
  res.json({ message: "Fornecedor atualizado" });
});

app.delete("/fornecedores/:id", autenticarToken, async (req, res) => {
  await pool.query("DELETE FROM fornecedores WHERE id=$1", [req.params.id]);
  res.json({ message: "Fornecedor removido" });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));
