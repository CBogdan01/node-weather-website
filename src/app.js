const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Bogdan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Bogdan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help me",
    title: "Help",
    name: "Bogdan",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  } else {
    geoCode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
          if (error) {
            return res.send({ error });
          }
          res.send({
            forecast: forecastData,
            location,
          });
        });
      }
    );
  }
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.status(404).render("404", {
    title: "404",
    name: "Bogdan",
    errorMessage: "Help page not found",
  });
});

app.get("*", (req, res) => {
  res.status(404).render("404", {
    title: "404",
    name: "Bogdan",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
