import Logger from '../../../helpers/Logger.js';
import { generateStyleHook } from './StyleHookGenerator.js';
import { generateComponentLogic } from './ComponentLogicGenerator.js';

export function generateComponent(ast, componentDir) {
  Logger.info(`[ComponentGenerator] Generating files for component ${ast.componentName}...`);
  generateStyleHook(ast, componentDir);
  generateComponentLogic(ast, componentDir);
  Logger.info(`[ComponentGenerator] Code Files for ${ast.componentName} generated successfully!`);
}
