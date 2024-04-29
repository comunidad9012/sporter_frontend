var express = require("express");
var router = express.Router();

function isPrivileged(cookies){

  if ( !Number(cookies.logged_in) || !Number(cookies.is_admin)){
      return false
  }
  return true

}

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("catalogo", { APIBaseURL: process.env.REQUEST_URL,
    isAdmin : Number(req.cookies.is_admin),
    isNotLogged : !Boolean(Number(req.cookies.logged_in))
  });
});

router.get("/actualizar/:productID", function (req, res, next) {
  if (isPrivileged(req.cookies)){
    res.render("editarProducto", {
      productID: req.params.productID,
      APIBaseURL: process.env.REQUEST_URL,
    });
  } else{
    res.redirect("/not_allowed")
  }
});

// Registro
router.get("/register", function (req, res, next) {
    res.render("register", {
      APIBaseURL: process.env.REQUEST_URL,
    });
});

// Inicio de sesion
router.get("/signIn", function (req, res, next) {
  res.render("signin", {
    APIBaseURL: process.env.REQUEST_URL,
  });
});

// Administrar usuarios
router.get("/administration", function (req, res, next) {
  if (isPrivileged(req.cookies)){
    res.render("administration",{
      APIBaseURL: process.env.REQUEST_URL,
    });
  } else{
    res.redirect("/not_allowed")
  }
});

router.get("/not_allowed", function (req, res, next) {
  res.render("not_allowed")
})

module.exports = router;
