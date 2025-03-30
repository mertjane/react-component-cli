#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer").default;

const configPath = path.join(__dirname, "../config.json");


// Getting user preferences in first use
const getUserPreferences = async () => {
  if (fs.existsSync(configPath)) {
    return fs.readJsonSync(configPath);
  }

  console.log(chalk.yellow("🔧 Config not found. Setting up preferences..."));

  const answers = await inquirer.prompt([
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

  fs.writeFileSync(configPath, JSON.stringify(answers, null, 2), "utf8");
  console.log(chalk.green("✔ Preferences saved!"));
  return answers;
};


// Generate react component
const generateComponent = async (name) => {
  const { useTypescript, useSCSS } = await getUserPreferences();

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


  // React component template
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


  // types.ts template
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

/**=================================================================**/

  const generateContext = (name) => {
    const { useTypescript } = getUserPreferences(); // Use TS preference
  
    const srcDir = path.join(process.cwd(), "src");
    const contextDir = path.join(srcDir, "context");
    const contextFile = path.join(contextDir, `${name}.${useTypescript ? "tsx" : "jsx"}`);
  
    if (!fs.existsSync(contextDir)) {
      fs.mkdirSync(contextDir, { recursive: true });
    }
  
    if (fs.existsSync(contextFile)) {
      console.log(chalk.red(`Context "${name}" already exists.`));
      return;
    }
  
    const contextTemplate = `import React, { createContext, useContext, useState, ReactNode } from "react";
  
  interface ${name}Props {
    state: string;
    setState: React.Dispatch<React.SetStateAction<string>>;
  }
  
  const ${name} = createContext<${name}Props | undefined>(undefined);
  
  export const ${name}Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState("default value");
  
    return (
      <${name}.Provider value={{ state, setState }}>
        {children}
      </${name}.Provider>
    );
  };
  
  export const use${name} = () => {
    const context = useContext(${name});
    if (!context) {
      throw new Error("use${name} must be used within a ${name}Provider");
    }
    return context;
  };
  `;
  
    fs.writeFileSync(contextFile, contextTemplate);
    console.log(chalk.green(`Context "${name}" created successfully in src/context/${name}/`));
  };
  
  // Add the command in `program`
  program
    .command("generate-context <name>")
    .description("Generate a new React Context with a Provider")
    .alias("g-ctx")
    .action(generateContext);
  

program.parse(process.argv);
