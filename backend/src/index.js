import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { prisma } from "./prisma.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

app.get("/api/profile", async (req, res) => {
  if (!prisma) {
    return res.json({
      name: "John Esneider Marin",
      title: "Estudiante de Desarrollo de Software (6.º semestre)",
      summary:
        "Bueno en frontend, backend, Postgres, Python, React y otras tecnologías.",
      location: "Colombia",
      email: "",
      photo: "/profile.jpg",
      social: {
        github: "",
        linkedin: ""
      }
    });
  }
  try {
    const profile = await prisma.profile.findFirst();
    res.json(profile || {});
  } catch (e) {
    res.status(500).json({ error: "error" });
  }
});

app.get("/api/projects", async (req, res) => {
  if (!prisma) {
    return res.json([
      {
        title: "Proyecto A",
        description: "Sistema seguro con autenticación y auditoría.",
        tech: ["React", "Node", "Postgres"],
        url: "#"
      }
    ]);
  }
  try {
    const projects = await prisma.project.findMany();
    res.json(projects);
  } catch (e) {
    res.status(500).json({ error: "error" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body || {}
    if (!name || !email || !message) {
      return res.status(400).json({ ok: false, error: "Datos incompletos" })
    }
    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return res.status(400).json({ ok: false, error: "Formato inválido" })
    }
    const trimmed = {
      name: name.trim().slice(0, 200),
      email: email.trim().slice(0, 200),
      message: message.trim().slice(0, 2000),
    }
    if (prisma) {
      await prisma.contactMessage.create({ data: trimmed })
    }
    return res.json({ ok: true })
  } catch (e) {
    return res.status(500).json({ ok: false })
  }
})

const port = process.env.PORT ? Number(process.env.PORT) : 3001;
app.listen(port, () => {
  console.log(`API escuchando en http://localhost:${port}`);
});
