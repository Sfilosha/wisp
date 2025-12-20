// figmaParser.js
import { findStatePropName } from './StateDetector.js';
import Logger from '../../../helpers/Logger.js';
import { StyleExtractor } from '../helpers/styleExtractor.js';
import { LayersExtractor } from '../helpers/layersExtractor.js';
import { pseudoClassValues } from '../helpers/pseudoClassValues.js';

class FigmaParser {
  constructor(figmaItem, colorTokenMap, variablesMap) {
    this.figmaItem = figmaItem;
    this.propsMap = new Map();
    this.variantStyles = {};
    this.allTextPropNames = new Set();
    this.allBooleanPropNames = new Set();
    
    // Helpers
    this.styleExtractor = new StyleExtractor(colorTokenMap, variablesMap);
    this.layerParser = new LayersExtractor(
      this.styleExtractor,
      this.allTextPropNames, 
      this.allBooleanPropNames
    );
  }

  // Collect all properties from variants (state=..., size=..., etc.)
  _gatherProperties() {
    for (const variant of this.figmaItem.children) {
      const properties = variant.name.split(', ');
      for (const prop of properties) {
        const [key, value] = prop.split('=');
        if (!this.propsMap.has(key)) this.propsMap.set(key, new Set());
        this.propsMap.get(key).add(value);
      }
      // console.log(this.propsMap)
      // Logger.divider()
    }
  }

  // Process each variant to extract styles and organize by base and pseudo states
  _processVariant(variant) {
    const properties = variant.name.split(', ');
    let stateValue = 'default';
    const baseProperties = [];
    const pseudoClassProperties = new Set(pseudoClassValues);

    for (const prop of properties) {
      const [key, value] = prop.split('=');
      if (key === this.statePropName) {
        stateValue = value.toLowerCase();
      } else {
        baseProperties.push(prop);
      }
    }
    const baseVariantKey = baseProperties.join(', ');

    // Extract styles and layers for the variant
    const styles = this.styleExtractor.extractBlockStyles(variant);
    styles.layers = this.layerParser.extractVariantLayers(variant, this.figmaItem || []);

    // Initialize structure if not present
    if (!this.variantStyles[baseVariantKey]) {
      this.variantStyles[baseVariantKey] = { base: {}, pseudo: {} };
    }

    // Assign styles to base or pseudo state
    // If state is 'default' or unrecognized, assign to base
    if (stateValue === 'default' || !pseudoClassProperties.has(stateValue)) {
      this.variantStyles[baseVariantKey].base = styles;
    } 
    // If recognized pseudo state, assign accordingly
    else {
      this.variantStyles[baseVariantKey].pseudo[stateValue] = styles;
    }
  }

  _generateAST() {
    // Convert propsMap to array of { name, values[] } and exclude state prop
    const props = Array.from(this.propsMap.entries())
      .filter(([name]) => name !== this.statePropName)
      .map(([name, valuesSet]) => ({ name, values: Array.from(valuesSet) }));

    // Construct final AST
    return {
      componentName: this.figmaItem.name,
      props,
      variantStyles: this.variantStyles,
      allTextPropNames: Array.from(this.allTextPropNames),
      allBooleanPropNames: Array.from(this.allBooleanPropNames),
    };
  }

  parse() {
    Logger.info('[figmaParser] Started style parsing...');
    
    this._gatherProperties();
    this.statePropName = findStatePropName(this.propsMap);

    for (const variant of this.figmaItem.children) {
      this._processVariant(variant);
    }

    const ast = this._generateAST();
    Logger.info('[figmaParser] Parsing completed.');
    return ast;
  }
}

export function figmaParser(figmaItem, colorTokenMap, variablesMap) {
  const parser = new FigmaParser(figmaItem, colorTokenMap, variablesMap);
  return parser.parse();
}