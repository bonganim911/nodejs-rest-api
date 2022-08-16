var qs = require('querystring');
const Puppy = require("../models/puppy.js");
// Create and Save a new Puppy

exports.create = (req, res) => {
  console.log(req.body);
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }
  // Create a Puppy
  const puppy = new Puppy({
    name: req.body.name,
    serviceDetails: req.body.serviceDetails,
    date: req.body.date,
    arrivalTime:req.body.arrivalTime,
    isServiced:req.body.isServiced || 0,
  });
  // Save Puppy in the database
  Puppy.create(puppy, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Puppy."
      });
    else res.send(data);
  });
};


// Retrieve all puppies from the database (with condition).
exports.findAll = (req, res) => {
  Puppy.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving puppies."
      });
    else res.send(data);
  });
};

// Update a Puppy identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);
  Puppy.updateById(
    req.params.id,
    new Puppy(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Puppy with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Puppy with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );

};
// Delete a Puppy with the specified id in the request
exports.delete = (req, res) => {
  Puppy.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Puppy with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Puppy with id " + req.params.id
        });
      }
    } else res.send({ message: `Puppy was deleted successfully!` });
  });

};