const path = require("path");
const express = require("express");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const methodOverride = require("method-override");
const app = express();

app.set("view engine", "ejs");

console.log("__dirname: ", __dirname);

app.use(express.static(path.join(__dirname, "public")));
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  methodOverride((request, response) => {
    if (request.body && request.body._method) {
      const method = request.body._method;
      return method;
    }
  })
);
app.use((request, response, next) => {
  console.log("cookies", request.cookies);
  const username = request.cookies.username;
  response.locals.loggedInUserName = username || "";
  next();
});

//Server
const PORT = 4545;
const ADDRESS = "localhost";
app.listen(PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}/cluck`);
});

const cluckRouter = require("./routes/cluckRouter");
app.use("/cluck", cluckRouter);
