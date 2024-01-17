const express = require("express");
const errHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();

const port = process.env.port || 5000;

//app.use is express built in middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
//errHandler is a custom middleware for handling errors
app.use(errHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
