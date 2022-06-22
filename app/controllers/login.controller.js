const db = require("../models");
const Login = db.logins;

exports.create = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const login = new Login({
    email: req.body.email,
    password: req.body.password,
  });

  login
    .save(login)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Login."
      });
    });
};

exports.findAll = (req, res) => {
  const email = req.query.email;
  var condition = email ? { email: { $regex: new RegExp(email), $options: "i" } } : {};

  Login.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving logins."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Login.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Not found Login with id " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving Login with id=" + id });
    });
};

exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!"
    });
  }

  const id = req.params.id;

  Login.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Login with id=${id}. Maybe Login was not found!`
        });
      } else res.send({ message: "Login was updated successfully." });
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Login with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  Login.findByIdAndRemove(id, { useFindAndModify: false })
    .then(data => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Login with id=${id}. Maybe Login was not found!`
        });
      } else {
        res.send({
          message: "Login was deleted successfully!"
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Login with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  Login.deleteMany({})
    .then(data => {
      res.send({
        message: `${data.deletedCount} Logins were deleted successfully!`
      });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all logins."
      });
    });
};