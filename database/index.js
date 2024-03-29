const chalk = require("chalk");
const debug = require("debug")("database");
const mongoose = require("mongoose");

mongoose.set("debug", true);
mongoose.connect(process.env.MONGODB_STRING, (error) => {
  if (error) {
    debug(chalk.red("No se ha podido iniciar la base de datos."));
    debug(chalk.red(error.message));
    return;
  }
  debug(chalk.green("Conectado a la base de datos"));
});
