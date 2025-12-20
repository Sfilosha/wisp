import FileService from '../core/FileService.js';
import { rgbaToHex } from './utils.js';

export class LayersExtractor {
  constructor(colorTokenMap, variablesMap, allTextPropNames, allBooleanPropNames) {
    this.colorTokenMap = colorTokenMap;
    this.variablesMap = variablesMap;
    this.allTextPropNames = allTextPropNames;
    this.allBooleanPropNames = allBooleanPropNames;
  }

  // Parse layers within a variant
  extractVariantLayers(variant, component) {
    const layers = [];
    const c = component || null;
    for (const child of variant.children || []) {
      console.log('Processing child:', child.name, child.type, child.visible);
      if (child.visible === false) continue;

      if (child.type === 'TEXT') {
        layers.push(this._parseTextLayer(child));
        layers.push(this._bindBooleanProps(child, c));
      }
      // else if (child.type === 'INSTANCE' && (child.name.toLowerCase().includes('icon') ... )) {
      //   layers.push(this._parseIconLayer(child));
      // }
    }
    return layers;
  }

  _bindBooleanProps(component, child) {
    console.log('Binding boolean props for layer:', child.name);
    FileService.writeSafe('./tmp/componentProperties.txt', 
      `Binding boolean props for component: 
      ${JSON.stringify(component?.componentPropertyDefinitions, null, 2)}\n 
      ${JSON.stringify(component?.componentPropertyReferences, null, 2)}`);
    console.log('Binding boolean props for component:', component.componentPropertyDefinitions);
  }

  _parseTextLayer(child) {
    const childName = child?.name || 'text';
    // propNameRaw.split('#')[0];
    this.allTextPropNames.add(childName);

    const layer = {
      type: 'TEXT',
      propName: childName || child.characters || 'text',
      defaultValue: child.characters || 'text',
      styles: {},
    };

    // Text color
    const textFill = child.fills?.[0];
    if (textFill?.type === 'SOLID') {
      const hexColor = rgbaToHex(textFill.color).toLowerCase();
      const variableID = textFill?.boundVariables?.color?.id;
      const token = this.variablesMap.get(variableID);
      layer.styles.color = this.colorTokenMap.has(token) 
        ? `var(${token})` 
        : hexColor;
    } else {
      layer.styles.color = 'transparent';
    }

    // Text properties
    if (child.fontName) {
      layer.styles.fontFamily = this._getFontProp(child, 'fontFamily', child.fontName.family);
      layer.styles.fontWeight = this._getFontProp(child, 'fontWeight', child.fontWeight);
      layer.styles.fontSize = this._getFontProp(child, 'fontSize', child.fontSize, 'px');
      layer.styles.lineHeight = this._getFontProp(child, 'lineHeight', child.lineHeight.value, 'px');
    }

    return layer;
  }
  

  // Helper to get font properties (variable or fallback)
  _getFontProp(child, propName, fallbackValue, unit = '') {
    const binding = child.boundVariables?.[propName]?.[0];
    if (binding && this.variablesMap.has(binding.id)) {
      return `var(${this.variablesMap.get(binding.id)})`;
    }
    return `${fallbackValue}${unit}`;
  }

  // _parseIconLayer(child) { ... }
}