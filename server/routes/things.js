const express = require("express");
const Thing = require("../../database/models/thing");

const router = express.Router();

router.get("/", async (req, res) => {
  const things = await Thing.find();
  res.json(things);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const thing = await Thing.findById(id);
    if (thing) {
      res.json(thing);
    } else {
      const error = new Error("Thing not found");
      error.code = 404;
      throw error;
    }
  } catch (error) {
    error.code = 404;
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedThing = await Thing.findByIdAndDelete(id);
    res.json({ deleted: deletedThing });
  } catch (error) {
    error.code = 400;
    error.message = "Error al borrar";
    next(error);
  }
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
