#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");

const configPath = path.join(__dirname, "../config.json");

const getUserPreferences = () => {
  if (fs.existsSync(configPath)) {
    return fs.readJsonSync(configPath);
  }
  return { useTypescript: true, useSCSS: true }; // Default values
};

const generateComponent = (name) => {
  const { useTypescript, useSCSS } = getUserPreferences();

  const srcDir = path.join(process.cwd(), "src");
  const componentsDir = path.join(srcDir, "components");
  const componentDir = path.join(componentsDir, name);

  if (!fs.existsSync(componentsDir)) {
    fs.mkdirSync(componentsDir, { recursive: true });
  }

  if (fs.existsSync(componentDir)) {
    console.log(chalk.red(`Component "${name}" already exists.`));
    return;
  }

  fs.mkdirSync(componentDir);

  const componentFile = path.join(
    componentDir,
    `${name}.${useTypescript ? "tsx" : "jsx"}`
  );
  const stylesFile = path.join(
    componentDir,
    `${name}.styles.${useSCSS ? "scss" : "css"}`
  );
  const typesFile = path.join(componentDir, `${name}.types.ts`);

  const componentTemplate = `import React from "react";
import "./${name}.styles.${useSCSS ? "scss" : "css"}";
${useTypescript ? `interface ${name}Props {}` : ""}

const ${name}: React.FC${useTypescript ? `<${name}Props>` : ""} = () => {
  return <div className="${name.toLowerCase()}">Hello, ${name}!</div>;
};

export default ${name};
`;

  const stylesTemplate = `.${name.toLowerCase()} {
  /* Add your styles here */
}`;

  const typesTemplate = `export interface ${name}Props {}`;

  fs.writeFileSync(componentFile, componentTemplate);
  fs.writeFileSync(stylesFile, stylesTemplate);

  if (useTypescript) {
    fs.writeFileSync(typesFile, typesTemplate);
  }

  console.log(
    chalk.green(
      `Component "${name}" created successfully in src/components/${name}/`
    )
  );
};

program
  .command("generate-component <name>")
  .description("Generate a new React component")
  .alias("g-c")
  .action(generateComponent);

program.parse(process.argv);
