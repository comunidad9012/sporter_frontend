var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("catalogo", { APIBaseURL: process.env.REQUEST_URL });
});

router.get("/actualizar/:productID", function (req, res, next) {
  res.render("editarProducto", {
    productID: req.params.productID,
    APIBaseURL: process.env.REQUEST_URL,
  });
});

// Registro
router.get("/register", function (req, res, next) {
  res.render("register");
});

// Inicio de sesion
router.get("/signIn", function (req, res, next) {
  res.render("signIn");
});

module.exports = router;
