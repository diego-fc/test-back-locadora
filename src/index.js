const express = require("express");
const bodyParser = require("body-parser");

const { createUser, findUser, updateUser, deleteUser } = require("./controllers/controllerUsuario");
const { createFilms, findFilms, updateFilms, deleteFilms } = require("./controllers/controllerFilmes");
const { createLocation, findLocation, updateLocation, deleteLocation } = require("./controllers/controllerLocation");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Pessoas
server.post("/user/create", createUser);
server.get("/user", findUser);
server.put("/user/:id", updateUser);
server.delete("/user/:id", deleteUser);

//Filmes
server.post("/film/create", createFilms);
server.get("/film", findFilms);
server.put("/film/:id", updateFilms);
server.delete("/film/:id", deleteFilms);

//Filmes
server.post("/location/create", createLocation);
server.get("/location", findLocation);
server.put("/location/:id", updateLocation);
server.delete("/location/:id", deleteLocation);

server.listen(3001);
