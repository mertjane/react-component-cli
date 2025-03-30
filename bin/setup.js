#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const chalk = require("chalk");

(async () => {
  const answers = await inquirer.createPromptModule([
    {
      type: "confirm",
      name: "useTypescript",
      message: "Do you want to use TypeScript by default?",
      default: true,
    },
    {
      type: "confirm",
      name: "useSCSS",
      message: "Do you want to use SCSS by default?",
      default: true,
    },
  ]);

  const configPath = path.join(__dirname, "../config.json");

  fs.writeFileSync(configPath, JSON.stringify(answers, null, 2));

  console.log(chalk.green("✔ Preferences saved! You won't be asked again."));
})();
