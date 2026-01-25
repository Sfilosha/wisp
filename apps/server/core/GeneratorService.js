import path from "path";
import Logger from "../../../helpers/Logger.js";
import FileService from "./FileService.js";
import { generateComponent } from "../generators/ComponentGenerator.js";
import { generateComponentCss } from "../generators/ComponentCssGenerator.js";
import { generateStorybook } from "../generators/StorybookGenerator.js";
import config from "../config/index.js";
import fs from "fs";
import { figmaParser } from "../parsers/FigmaParser.js";

export default class GeneratorService {
  constructor() {
    // this.figmaApi = figmaApi;
    this.isCancelled = false;
  }

  cancel() {
    this.isCancelled = true;
    Logger.warn("Процес генерації скасовано користувачем.");
  }

  async generate({ ids, color, component }) {
    // Ensure output directory already exists
    FileService.ensureDir(config.outputDir);

    // Prepare maps for tokens and variables
    const variablesMap = new Map(Object.entries(ids || {}));
    const colorTokenMap = new Map(
      Object.entries(color || {}).map(([n, hex]) => [n, hex.toLowerCase()]),
    );

    // Write debug files
    // fs.writeFileSync('variablesMap.json', JSON.stringify([...variablesMap], null, 2));
    // fs.writeFileSync('colorTokenMap.json', JSON.stringify([...colorTokenMap], null, 2));
    // fs.writeFileSync('component.json', JSON.stringify(component, null, 2));

    Logger.info(`[GeneratorService] Обробка: ${component.name}`);
    const ast = figmaParser(component, colorTokenMap, variablesMap);

    // Ast file for debugging
    fs.writeFileSync("ast.json", JSON.stringify(ast, null, 2));

    const componentDir = path.join(config.outputDir, ast.componentName);
    FileService.ensureDir(componentDir);

    generateComponent(ast, componentDir);
    generateComponentCss(ast, componentDir);
    generateStorybook(ast, componentDir);
  }
}
