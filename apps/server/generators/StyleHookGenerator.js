import path from "path";
import Logger from "../../../helpers/Logger.js";
import FileService from "../core/FileService.js";
import { cleanPropName, categorizeTextProps } from "../helpers/utils.js";
import { componentStyleHookTemplate } from "../codetemplates/componentStyleHookTemplate.js";
import { mapJoin } from "../helpers/mapJoin.js";

export class StyleHookGenerator {
  constructor(ast, componentDir) {
    this.ast = ast;
    this.componentDir = componentDir;
    this.componentName = ast.componentName;

    // Get placeholder and values prop from AST
    const { placeholderPropNames, valuePropNames } = categorizeTextProps(ast);
    this.placeholderPropNames = placeholderPropNames;
    this.valuePropNames = valuePropNames;
  }

  generate() {
    this._logDebugInfo();

    const hookCode = componentStyleHookTemplate({
      componentName: this.componentName,
      variantPropsInterface: this._buildVariantInterface(this.ast.props),
      valuePropsInterface: this._buildStringInterface(this.valuePropNames),
      placeholderPropsInterface: this._buildStringInterface(this.placeholderPropNames),
      booleanPropsInterface: this._buildBooleanInterface(this.ast.allBooleanPropNames),
      allStyleProps: this._getAllStyleProps().join(', '),
      cssSelectors: this._buildCssSelectors(),
  });

    FileService.writeSafe(this._getFilePath(), hookCode);
  }

  _buildCssSelectors() {
    return mapJoin(this.ast.props, (p) => {
      const propName = cleanPropName(p.name);
      return `    css[\`\${${propName}?.replace(/\\s+/g, '-').toLowerCase()}\`],`;
    });
  }

  _buildVariantInterface(array) {
    return mapJoin(array, (p) => 
      `  ${cleanPropName(p.name)}: '${p.values.join("' | '")}';`
    );
  }

 // Interface for boolean props from AST
  _buildBooleanInterface(array) {
    return mapJoin(array, (p) => 
      `  ${cleanPropName(p)}?: boolean;`
    );
  }

  //  Interface for string props (Value або Placeholder)
  _buildStringInterface(propNames) {
    return mapJoin(propNames, (p) => 
      `  ${cleanPropName(p)}?: string;`
    );
  }

  _getAllStyleProps() {
    return [
      ...this.ast.props.map(p => cleanPropName(p.name)),
      ...this.valuePropNames.map(p => cleanPropName(p)),
      ...this.placeholderPropNames.map(p => cleanPropName(p)),
      ...this.ast.allBooleanPropNames.map(p => cleanPropName(p)),
    ];
  }

  _logDebugInfo() {
    Logger.divider();
    console.log('[StyleHookGenerator] valuePropNames:', this.valuePropNames);
    console.log('[StyleHookGenerator] placeholderPropNames:', this.placeholderPropNames);
    Logger.divider();
  }

  _getFilePath() {
    return path.join(this.componentDir, `use${this.componentName}Styles.ts`);
  }
}

export function generateStyleHook(ast, componentDir) {
  new StyleHookGenerator(ast, componentDir).generate();
}