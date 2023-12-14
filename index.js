const express = require("express");
const bodyParser = require("body-parser");

const { createUser, findUser, updateUser, deleteUser } = require("./src/controllers/controllerUsuario");

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//Pessoas
server.post("/user/create", createUser);
server.get("/user", findUser);
server.put("/user/:id", updateUser);
server.delete("/user/:id", deleteUser);

server.listen(3001);
