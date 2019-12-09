const express = require("express");
const db = require("../data/dbConfig.js");

const router = express.Router();

router.get("/", (req, res) => {
  db("accounts")
    .then(accounts => res.json(accounts))
    .catch(error =>
      res.status(500).json({ message: "Error listing accounts" })
    );
});

router.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(account => (account.length ? res.json(account) : reject()))
    .catch(error =>
      res.status(404).json({ message: "Error finding account" })
    );
});

router.post("/", (req, res) => {
  db("accounts")
    .insert({ name: req.body.name, budget: req.body.budget })
    .then(account => res.json(account))
    .catch(error =>
      res.status(500).json({ message: "Error creating account" })
    );
});

router.put("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .update({ name: req.body.name, budget: req.body.budget })
    .then(account => res.json(account))
    .catch(error =>
      res.status(500).json({ message: "Error updating account" })
    );
});

router.delete("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .del()
    .then(account => res.status(204).send())
    .catch(error =>
      res.status(500).json({ message: "Error deleting account", error })
    );
});

module.exports = router;