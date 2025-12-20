export class LayersExtractor {
  constructor(styleExtractor, allTextPropNames, allBooleanPropNames) {
    this.styleExtractor = styleExtractor;
    this.allTextPropNames = allTextPropNames;
    this.allBooleanPropNames = allBooleanPropNames;
  }

  // Parse layers within a node
  extractVariantLayers(node, component) {
    const layers = [];

    for (const child of node.children || []) {
      
      // Extract component property references to bind boolean props (In progress)
      // const cprMap = new Map();
      // const cpr = child.componentPropertyReferences;
      // for (const [key, value] of Object.entries(cpr || {})) {
      //   console.log('Component Property Reference:', key, value);
      //     cprMap.set(key, value);
      //     }
      //     console.log('cprMap:', cprMap);

      if (child.visible === false) continue;

      switch (child.type) {
        case 'TEXT':
          layers.push(this._parseTextNode(child));
          break;
          
        case 'FRAME':
        case 'GROUP':
          layers.push(this._parseFrameNode(child));
          break;

        case 'RECTANGLE':
        case 'ELLIPSE':
          layers.push(this._parseShapeNode(child));
          break;
          
        // case 'INSTANCE': ...
      }
    }
    return layers;
  }

  _parseTextNode(child) {
    const childName = child?.name || 'Sample Text';
    this.allTextPropNames.add(childName);

    return {
      type: 'TEXT',
      propName: childName || 'Property Name',
      defaultValue: child.characters || 'Default Value',
      styles: this.styleExtractor.extractTextStyles(child),
    };
  }

  _parseShapeNode(child) {
    const childName = child?.name || 'Shape';

    return {
      type: child.type, // 'RECTANGLE' || 'ELLIPSE'
      propName: childName, 
      styles: this.styleExtractor.extractShapeStyles(child),
    };
  }

  _parseFrameNode(child) {
    const childName = child?.name || 'Frame Node';

    return {
      type: 'CONTAINER',
      propName: childName,
      styles: this.styleExtractor.extractBlockStyles(child),
      children: this.extractVariantLayers(child) 
    };
   }

   // _parseIconLayer(child) { ... }
}