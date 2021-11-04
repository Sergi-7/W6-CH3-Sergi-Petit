require("dotenv").config();
require("./database/index");
const inquirer = require("inquirer");
const initializeServer = require("./server/index");

// const port = process.env.SERVER_PORT || 5000;

(async () => {
  const answers = await inquirer.prompt([
    {
      name: "port",
      type: "input",
      message: "En que puerto quiere que se inicie la API ?",
      default: 4100,
    },
    {
      name: "database",
      type: "list",
      message: "Que base de datos quieres usar ?",
      default: "pruebas",
      choices: [
        { name: "pruebas", value: "test" },
        { name: "produccion", value: "prod" },
      ],
    },
    {
      name: "modify",
      type: "confirm",
      message:
        "Quieres permitir que los clientes puedan crear, borrar y modificar?",

      default: "no",
    },
  ]);
  initializeServer(answers.port);
})();
