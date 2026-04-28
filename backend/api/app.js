const express = require("express");
const cors = require("cors");

const app = express();

const port = 8080;
const knex = require("knex")(require("../db/knexfile.js")["development"]);

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
  res.send("API reached! Please visit the /movies endpoint for data."),
);

app.get("/movies", function (req, res) {
  knex("favs")
    .select("*")
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.get("/movies/:movie", function (req, res) {
  knex("favs")
    .select("*")
    .where("name", "=", req.params.movie)
    .then((data) => res.status(200).json(data))
    .catch((err) =>
      res.status(404).json({
        message:
          "The data you are looking for could not be found. Please try again",
      }),
    );
});

app.post("/movies/", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await knex("favs").insert(updateData);

    return res.status(201).json({ Movie_inserted: updateData.name });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.patch("/movies/:movie", async (req, res) => {
  const { id, ...updateData } = req.body;
  try {
    await knex("favs").where("name", "=", req.params.movie).update(updateData);

    return res.status(201).json({ Movie_updated: req.params.movie });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

app.delete("/movies/:movie", async (req, res) => {
  try {
    await knex("favs").where("name", "=", req.params.movie).del();
    return res.status(201).json({ Movie_deleted: req.params.movie });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`),
);
