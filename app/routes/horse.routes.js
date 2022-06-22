module.exports = app => {
  const horses = require("../controllers/horse.controller.js");

  var router = require("express").Router();

  router.post("/", horses.create);
  router.get("/", horses.findAll);
  router.get("/:id", horses.findOne);
  router.put("/:id", horses.update);
  router.delete("/:id", horses.delete);
  router.delete("/", horses.deleteAll);
  app.use("/api/horses", router);
};
