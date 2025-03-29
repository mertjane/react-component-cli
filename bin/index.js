#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require('chalk');


// Function containing the component generation logic
const generateComponent = (name) => {
  const srcDir = path.join(process.cwd(), "src");
  const componentsDir = path.join(srcDir, "components");
  const componentDir = path.join(componentsDir, name);

  // Ensure the src/components directory exists
  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  // Check if the component folder already exists
  if (fs.existsSync(componentDir)) {
    console.log(`Component "${name}" already exists.`);
    return;
  }

  // Create the component folder
  fs.mkdirSync(componentDir);

  // Define file paths
  const componentFile = path.join(componentDir, `${name}.tsx`);
  const stylesFile = path.join(componentDir, `${name}.styles.scss`);
  const typesFile = path.join(componentDir, `${name}.types.ts`);

  // Component template
  const componentTemplate = `import React from "react";
import "./${name}.styles.scss";

interface ${name}Props {}

const ${name}: React.FC<${name}Props> = () => {
  return <div className="${name.toLowerCase()}">Hello, ${name}!</div>;
};

export default ${name};
`;

  // Style template
  const stylesTemplate = `.${name.toLowerCase()} {
  /* Add your styles here */
}`;

  // Types template
  const typesTemplate = `export interface ${name}Props {}`;

  // Write the files
  fs.writeFileSync(componentFile, componentTemplate);
  fs.writeFileSync(stylesFile, stylesTemplate);
  fs.writeFileSync(typesFile, typesTemplate);

  console.log(chalk.green(`Component "${name}" created successfully in src/components/${name}/`));
};

// Define the command with both full name and alias
program
  .command("generate-component <name>", { isDefault: true })
  .description("Generate a new React component")
  .alias("g-c")
  .action(generateComponent);

program.parse(process.argv);