const express = require("express");
const debug = require("debug")("index");
const chalk = require("chalk");

const app = express();

const initializeServer = (port) => {
  const server = app.listen(port, () => {
    debug(chalk.yellow(`Listening to port : ${port}`));
  });

  server.on("error", (error) => {
    debug(chalk.red("There was an error initializing the server"));
    if (error.code === "EADDRINUSE") {
      debug(chalk.red(`Port : ${port} is already being used`));
    }
  });
};

module.exports = initializeServer;
