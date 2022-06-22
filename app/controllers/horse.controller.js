const db = require("../models");
const Horse = db.horses;

exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const horse = new Horse({
    name: req.body.name,
    sex: req.body.sex,
    born: req.body.born,
    color: req.body.color,
    height: req.body.height
  });

  horse
    .save(horse)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Horse."
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { $regex: new RegExp(name), $options: "i" } } : {};

  Horse.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving horses."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Horse.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Horse with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Horse with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Horse.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Horse with id=${id}. Maybe Horse was not found!`
        });
      } else res.send({ message: "Horse was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Horse with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Horse.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Horse with id=${id}. Maybe Horse was not found!`
        });
      } else {
        res.send({
          message: "Horse was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Horse with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Horse.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Horses were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all horses."
      });
    });
};