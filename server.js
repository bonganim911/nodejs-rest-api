const express = require("express");
const cors = require("cors");
const app = express();
const puppyRouter = require("./app/routes/puppy.routes.js");
const errors = require("./app/middleware/errors.js");

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/api/puppy', puppyRouter);

app.use(errors.errorHandler);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});