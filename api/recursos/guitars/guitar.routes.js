const express = require("express");
const _ = require("underscore");
const guitars = require("./../../../database").guitars;
const uuid = require("uuid/v4");
const validateGuitar = require('./guitar.validate')
const log = require("./../../../utils/logger");

const guitarRouter = express.Router();

guitarRouter.get("/", (req, res) => {
    res.json(guitars);
})
guitarRouter.post("/", validateGuitar, (req, res) => {
  let newProduct = req.body;

  newProduct.id = uuid();
  guitars.push(newProduct);
  log.info("Producto agregado a la colección productos", newProduct);
  res.status(201).json(newProduct);
});
guitarRouter.get("/:id", (req, res) => {
  for (let guitar of guitars) {
    if (guitar.id === req.params.id) {
      res.json(guitar);
      return;
    }
  }
  // 404 Not found
  res.status(404).json(`El producto con id [${req.params.id}] no existe`);
})
guitarRouter.put("/:id", validateGuitar, (req, res) => {
  let id = req.params.id;
  let updatedProduct = req.body;
  let idx = _.findIndex(guitars, (guitar) => guitar.id === id);

  if (idx !== -1) {
    updatedProduct.id = id;
    guitars[idx] = updatedProduct;
    res.status(200).json(updatedProduct);
    log.info(`Producto con id [${id}] reemplazado con nuevo producto`, updatedProduct)
  } else {
    log.info(`Producto con id [${id}] no existe. Nada que borrar`);
    res.status(404).json(`El producto con id [${id}] no existe`);
  }
});
guitarRouter.delete("/:id", (req, res) => {
  let idx = _.findIndex(guitars, (guitar) => guitar.id === req.params.id);
  if (idx === -1) {
    res.status(404).json(`El producto con id [${req.params.id}] no existe, no puede ser eliminado`);
    return;
  }

  let gDeleted = guitars.splice(idx);
  log.info(`Producto con id [${idx}] fue borrado`);
  res.status(200).json(gDeleted);
});

module.exports = guitarRouter;