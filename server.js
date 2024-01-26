const express = require("express");
const errHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbConnection");
const dotenv = require("dotenv").config();

//connects mongoose schema to app
connectDb();

//app instance
const app = express();

const port = process.env.port || 5000;

//app.use is express built in middleware
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
//errHandler is a custom middleware for handling errors
app.use(errHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
