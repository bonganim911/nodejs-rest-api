const sql = require("../services/db.js");

// constructor
const Puppy = function(puppy) {
  this.name = puppy.name;
  this.serviceDetails = puppy.serviceDetails;
  this.date = puppy.date;
  this.arrivalTime = puppy.arrivalTime;
  this.isServiced = puppy.isServiced;
};

Puppy.create = (newPuppy, result) => {
  console.log("errored: ", newPuppy);
  sql.query("INSERT INTO puppies SET ?", newPuppy, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created puppy: ", { id: res.insertId, ...newPuppy });
    result(null, { id: res.insertId, ...newPuppy });
  });

};
Puppy.getAll = (result) => {
  console.log("gets here: ");
  let query = "SELECT * FROM puppies";
  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    console.log("puppies: ", res);
    result(null, res);
  });
};
Puppy.updateById = (id, puppy, result) => {
  sql.query(
    "UPDATE puppies SET isServiced = ? WHERE id = ?",
    [1, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      if (res.affectedRows == 0) {
        // not found Puppy with the id
        result({ kind: "not_found" }, null);
        return;
      }
      console.log("updated puppy: ", { id: id});
      result(null, { id: id, ...puppy });
    }
  );

};
Puppy.remove = (id, result) => {
  console.log("removing this id puppy: ", id);
  sql.query(`DELETE FROM puppies WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found Puppy with the id
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted puppy with id: ", id);
    result(null, res);
  });
};
module.exports = Puppy;