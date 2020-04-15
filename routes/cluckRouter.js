const express = require("express");
const knex = require("../db/connection.js");
const router = express.Router();

// Router CluckGET function.
router.get("/sign_in", (request, response) => {
  response.render("signIn");
});
// POST for Sign in.
router.post("/sign_in", (request, response) => {
  const COOKIE_MAX_AGE = 1000 * 60 * 60 * 24;
  const params = request.body;

  response.cookie("username", params.username, { maxAge: COOKIE_MAX_AGE });

  response.redirect("/cluck");
});
// POST for Sign OUt.
router.post("/sign_out", (request, response) => {
  response.clearCookie("username");
  response.redirect("/cluck");
});
// New Cluck GET Function

router.get("/new", (request, response) => {
  response.render("new");
});
// POST Cluck of the User into the database
router.post("/", (request, response) => {
  const { content, image_url } = request.body;
  const username = request.cookies.username;
  knex("Clucks")
    .insert({
      username: username,
      content: content,
      image_url: image_url
    })
    .returning("*")
    .then(response.redirect("/cluck"));
});
//GET for CLUCK
router.get("/", (request, response) => {
  knex("Clucks")
    .orderBy("created_at", "desc")
    .then(clucks => {
      response.render("cluck", { clucks });
    });
});

module.exports = router;
