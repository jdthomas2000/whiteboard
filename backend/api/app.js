const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();

const port = 8080;
const knex = require("knex")(require("../db/knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:5173" },
});

io.on("connection", (socket) => {
  console.log("client connected");
});

app.get("/", (req, res) =>
  res.send("API reached! Please visit the /unit_x endpoint for data."),
);

app.get("/unit_x", function (req, res) {
  knex("unit_x")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.get("/unit_x/:id", function (req, res) {
  knex("unit_x")
    .select("*")
    .where("id", "=", req.params.id)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.post("/unit_x/", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    const [newMember] = await knex("unit_x").insert(updateData).returning("*");
    io.emit("member_added", newMember);
    return res.status(201).json(newMember);
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.patch("/unit_x/:id", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await knex("unit_x").where("id", "=", req.params.id).update(updateData);
    const updatedMember = await knex("unit_x")
      .where({ id: req.params.id })
      .first();
    io.emit("member_updated", updatedMember);
    return res.status(201).json({ Member_updated: req.params.id });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/unit_x/:id", async (req, res) => {
  try {
    await knex("unit_x").where("id", "=", req.params.id).del();
    io.emit("member_deleted", { id: Number(req.params.id) });
    return res.status(201).json({ id: Number(req.params.id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

httpServer.listen(8080);
