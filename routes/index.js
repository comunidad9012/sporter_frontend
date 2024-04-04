var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("catalogo", { requestURL: process.env.REQUEST_URL });
});

router.get("/actualizar/:productID", function (req, res, next) {
  res.render("editarProducto", {
    productID: req.params.productID,
    requestURL: process.env.REQUEST_URL,
  });
});

module.exports = router;
