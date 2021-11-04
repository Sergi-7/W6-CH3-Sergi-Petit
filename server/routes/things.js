const express = require("express");
const Thing = require("../../database/models/thing");

const router = express.Router();

router.get("/", async (req, res) => {
  const things = await Thing.find();
  res.json(things);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const thing = await Thing.findById(id);
  res.json(thing);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deletedThing = await Thing.findByIdAndDelete(id);
  res.json({ deleted: deletedThing });
});

router.post("/", async (req, res, next) => {
  try {
    const thing = req.body;
    const newThing = await Thing.create(thing);
    res.json(newThing);
  } catch (error) {
    error.code = 400;
    error.message = "Error al crear";
    next(error);
  }
});
module.exports = router;
