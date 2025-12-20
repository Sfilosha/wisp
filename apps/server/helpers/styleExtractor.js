import { rgbaToHex } from './utils.js';

export class StyleExtractor {
  constructor(colorTokenMap, variablesMap) {
    this.colorTokenMap = colorTokenMap;
    this.variablesMap = variablesMap;
  }

  // For Frames and Components
  extractBlockStyles(node) {
    const styles = {};

    Object.assign(styles, this._getBackgroundColor(node));
    Object.assign(styles, this._getBorder(node));
    Object.assign(styles, this._getBorderRadius(node));
    Object.assign(styles, this._getPadding(node));
    Object.assign(styles, this._getLayout(node));

    return styles;
  }

  // For TextNodes
  extractTextStyles(node) {
    const styles = {};
    
    const textFill = node.fills?.[0];
    if (textFill?.type === 'SOLID') {
       styles.color = this._getColorValue(textFill, textFill.boundVariables?.color);
    } else {
       styles.color = 'transparent';
    }

    if (node.fontName) {
      styles.fontFamily = this._verifyVariableBinding(node, 'fontFamily', node.fontName.family);
      styles.fontWeight = this._verifyVariableBinding(node, 'fontWeight', node.fontWeight);
      styles.fontSize = this._verifyVariableBinding(node, 'fontSize', node.fontSize, 'px');
      styles.lineHeight = this._verifyVariableBinding(node, 'lineHeight', node.lineHeight?.value || 'auto', 'px');
    }

    return styles;
  }

  // For Rectangle, Ellipse, Line, Vector
  extractShapeStyles(node) {
    const styles = {};

    Object.assign(styles, this._getBackgroundColor(node));
    Object.assign(styles, this._getBorder(node));
    
    if (node.width) styles.width = `${node.width}px`;
    if (node.height) styles.height = `${node.height}px`;

    // Shape specific stylization
    if (node.type === 'ELLIPSE') {
      styles.borderRadius = '50%';
    } else if (node.type === 'RECTANGLE') {
      // For rectangles with border radius
      Object.assign(styles, this._getBorderRadius(node));
    }

    return styles;
  }

  _verifyVariableBinding(node, propName, fallbackValue, unit = '') {
    const varAlias = node.boundVariables?.[propName];
    const varId = Array.isArray(varAlias) ? varAlias[0]?.id : varAlias?.id;

    if (varId && this.variablesMap.has(varId)) {
      return `var(${this.variablesMap.get(varId)})`;
    }
    return `${fallbackValue || 0}${unit}`;
  }

  _getColorValue(paintObj, boundVar) {
     const hexColor = rgbaToHex(paintObj.color).toLowerCase();
     const variableID = boundVar?.id;
     
     if (variableID) {
        const token = this.variablesMap.get(variableID);

        if (this.colorTokenMap.has(token)) {
            return `var(${token})`;
        }
     }
     
     return hexColor;
     
  }

  _getBackgroundColor(node) {
    const fill = node.fills?.[0];
    if (fill?.type === 'SOLID') {
      return { backgroundColor: this._getColorValue(fill, node.fills[0]?.boundVariables?.color) };
    }
    return { backgroundColor: 'transparent' };
  }

  _getBorder(node) {
    const stroke = node.strokes?.[0];
    if (stroke?.type === 'SOLID') {
      const borderColor = this._getColorValue(stroke, node.strokes[0]?.boundVariables?.color);
      const borderWidth = node.strokeWeight ? `${node.strokeWeight}px` : '1px';
      return { border: `${borderWidth} solid ${borderColor}` };
    }
    return {};
  }

  _getBorderRadius(node) {
    if (!node.cornerRadius) return {};

    let tl, tr, br, bl;

    if (node.cornerRadius.mixed === true) {
      const { topLeft, topRight, bottomRight, bottomLeft } = node.cornerRadius;
      tl = `${topLeft}px`;
      tr = `${topRight}px`;
      br = `${bottomRight}px`;
      bl = `${bottomLeft}px`;
    } else {
      tl = this._verifyVariableBinding(node, 'topLeftRadius', node.cornerRadius, 'px');
      tr = this._verifyVariableBinding(node, 'topRightRadius', node.cornerRadius, 'px');
      br = this._verifyVariableBinding(node, 'bottomRightRadius', node.cornerRadius, 'px');
      bl = this._verifyVariableBinding(node, 'bottomLeftRadius', node.cornerRadius, 'px');
    }

    if (tl === tr && tr === br && br === bl) return { borderRadius: tl };
    if (tl === br && tr === bl) return { borderRadius: `${tl} ${tr}` };
    return { borderRadius: `${tl} ${tr} ${br} ${bl}` };
  }

  _getPadding(node) {
    if (node.paddingLeft === undefined) return {};
    
    const top = this._verifyVariableBinding(node, 'paddingTop', node.paddingTop, 'px');
    const right = this._verifyVariableBinding(node, 'paddingRight', node.paddingRight, 'px');
    const bottom = this._verifyVariableBinding(node, 'paddingBottom', node.paddingBottom, 'px');
    const left = this._verifyVariableBinding(node, 'paddingLeft', node.paddingLeft, 'px');

    if (top === bottom && left === right) {
      return { padding: top === left ? top : `${top} ${left}` };
    }
    return { padding: `${top} ${right} ${bottom} ${left}` };
  }

  _getLayout(node) {
    if (!node.layoutMode || node.layoutMode === 'NONE') return {};

    const styles = { display: 'flex' };

    if (node.layoutMode === 'HORIZONTAL') styles.flexDirection = 'row';
    if (node.layoutMode === 'VERTICAL') styles.flexDirection = 'column';
    if (node.primaryAxisAlignItems) styles.justifyContent = node.primaryAxisAlignItems.toLowerCase().replace(/_/g, '-');
    if (node.counterAxisAlignItems) styles.alignItems = node.counterAxisAlignItems.toLowerCase().replace(/_/g, '-');

    const itemSpacingBinding = node.boundVariables?.itemSpacing;
    if (itemSpacingBinding && this.variablesMap.has(itemSpacingBinding.id)) {
      styles.gap = `var(${this.variablesMap.get(itemSpacingBinding.id)})`;
    } else if (node.itemSpacing) {
      styles.gap = `${node.itemSpacing}px`;
    }
    
    return styles;
  }
}