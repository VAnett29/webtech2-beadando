const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.horses = require("./horse.model.js")(mongoose);
db.logins = require("./login.model.js")(mongoose);

module.exports = db;
