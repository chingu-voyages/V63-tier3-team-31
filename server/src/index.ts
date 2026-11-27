import express from "express";

const app = express();

app.use(express.json());

app.get("/api/hello", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});