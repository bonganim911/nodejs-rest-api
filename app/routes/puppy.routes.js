const express = require("express");
const router = express.Router();
const puppies = require("../controllers/puppy.controller.js");

  // Create a new Puppy
  router.post("/", puppies.create);

  // Retrieve all puppies
  router.get("/", puppies.findAll);

  // Update a Puppy with id
  router.put("/:id", puppies.update);

  // Delete a Puppy with id
  router.delete("/:id", puppies.delete);

  router.get("/puppies", (req, res) => {
    res.json({ message: "Welcome to puppy nodejs flutter application." });
  });

module.exports = router;
