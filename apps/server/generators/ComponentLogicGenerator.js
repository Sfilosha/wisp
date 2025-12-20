import path from "path";
import Logger from "../../../helpers/Logger.js";
import fs from "fs"
import FileService from "../core/FileService.js";
import { cleanPropName, categorizeTextProps } from "../helpers/utils.js";
import { componentTsxTemplate } from "../codetemplates/componentTsxTemplate.js";
import { renderAstLayer } from "../helpers/renderAstLayer.js";

export class ComponentLogicGenerator {
  constructor(ast, componentDir) {
    this.ast = ast;
    this.componentDir = componentDir;
    this.componentName = ast.componentName;
    this.normalisedName = this.componentName.toLowerCase();
    
    // Get Placeholder and Value prop from AST
    const { placeholderPropNames, valuePropNames } = categorizeTextProps(ast);
    this.valueProp = valuePropNames.length > 0 ? cleanPropName(valuePropNames[0]) : null;
    this.placeholderProp = placeholderPropNames.length > 0 ? cleanPropName(placeholderPropNames[0]) : 'placeholder';
  }

  generate() {
    // Check if already exists. If yes - skip generation
    const filePath = this._getFilePath();
    if (fs.existsSync(filePath)) {
      Logger.note(`[ComponentLogicGenerator] Skip: ${path.basename(filePath)} exists.`);
      return;
    }

    const tag = this._determineTag();
    const attributes = this._buildAttributes(tag);
    const children = this._buildChildren(tag);

    const componentCode = componentTsxTemplate({
      componentName: this.componentName,
      componentTag: tag,
      componentAttributes: attributes,
      componentChildren: children
  });

    FileService.writeSafe(this._getFilePath(), componentCode);
  }

  // Define Tag based on this.componentName
  _determineTag() {
    if (this.normalisedName.includes('button')) return 'button';
    if (this.normalisedName.includes('textarea')) return 'textarea';
    if (this.normalisedName.includes('input') || 
        this.normalisedName.includes('checkbox') || 
        this.normalisedName.includes('radio')) {
      return 'input';
    }
    return 'div';
  }

  // HTML Attributes Builder
  _buildAttributes(tag) {
    const attrs = [];

    if (tag === 'button') {
      attrs.push(' onClick={onClick}');
    } 
    else if (['input', 'textarea'].includes(tag)) {
      if (this.normalisedName.includes('checkbox') || this.normalisedName.includes('radio')) {
        const type = this.normalisedName.includes('radio') ? 'radio' : 'checkbox';
        attrs.push(` type="${type}" id={id} onChange={onChange}`);
      } else {
        attrs.push(' id={id} onChange={onChange}');
        if (tag === 'input') attrs.push(' type="text"');
        if (this.placeholderProp) attrs.push(` placeholder={props.${this.placeholderProp}}`);
        if (this.valueProp) attrs.push(` defaultValue={props.${this.valueProp}}`);
      }
    }

    return attrs.join('');
  }

  _buildChildren(tag) {
    // Inputs & TextArea with </> or empty children
    if (['input', 'textarea'].includes(tag)) {
      return '';
    }

    // Children Builder
    const firstVariantLayers = Object.values(this.ast.variantStyles)[0]?.base?.layers || [];
    
    const childrenElements = firstVariantLayers
      .map(layer => renderAstLayer(layer))
      .filter(Boolean)
      .join('\n');

    return `\n      {/* Add children elements here */}\n${childrenElements}\n    `;
  }

  _getFilePath() {
    return path.join(this.componentDir, `${this.componentName}.tsx`);
  }
}

export function generateComponentLogic(ast, componentDir) {
  new ComponentLogicGenerator(ast, componentDir).generate();
}