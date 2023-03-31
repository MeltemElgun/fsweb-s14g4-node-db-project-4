const express = require("express");
const server = express();
const recipeRouter = require("./recipes/recipes-router");
server.use(express.json());
server.use("/api/tarifler", recipeRouter);
module.exports = server;
