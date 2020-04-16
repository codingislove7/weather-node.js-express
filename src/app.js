const path = require("path");
const express = require("express");
const app = express();
const hbs = require("hbs");
const weather = require("./utils/weather.js");
//Define paths  for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Behnam Sheykhe",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Behnam Sheykhe",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    message:
      "it is simple, just enter your city and we tell you how weather is!",
    name: "Behnam Sheykhe",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must search for an address",
    });
  }
  let searchAddress = req.query.address;
  weather(
    searchAddress,
    (error, { timezone, cityname, temp, description, rain } = {}) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        timezone,
        cityname,
        temp,
        description,
        rain,
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  console.log(req.query.search);

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Helparicle not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page not found. 404",
  });
});
app.listen(8080, () => {
  console.log("Server is up on port 9000.");
});
