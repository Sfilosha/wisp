import path from "path";
import { cssBlockTemplate } from "../codetemplates/cssBlockTemplate.js";
import { cleanPropName } from "../helpers/utils.js";
import Logger from "../../../helpers/Logger.js";
import FileService from "../core/FileService.js";

export class CssGenerator {
  constructor(ast, componentDir) {
    this.ast = ast;
    this.componentDir = componentDir;
    this.componentName = ast.componentName;
    this.baseClassName = this.componentName.toLowerCase();
    this.isSelectable = ["checkbox", "radio", "switch"].includes(
      this.baseClassName
    );
    this.cssBlocks = [];

    this.stateToPseudoMap = {
      hover: ":hover",
      focus: ":focus",
      disabled: ":disabled",
      active: ":active",
    };
  }

  generate() {
    Logger.info(
      `[CssGenerator] Generating CSS with tokens for <<${this.componentName}>>`
    );

    this._addBaseStyles();
    this._processVariants();

    const cssContent = this.cssBlocks.join("\n");
    const filePath = path.join(
      this.componentDir,
      `${this.componentName}.module.css`
    );
    FileService.writeSafe(filePath, cssContent);

    Logger.info(`[CssGenerator] Css Generation Finished!`);
  }

  _addBaseStyles() {
    const baseBlock = `.${this.baseClassName} { 
      border: none; 
      text-decoration: none;
      box-sizing: border-box;
      background: none;
      padding: 0;
      margin: 0;
      }\n\n`;

    this.cssBlocks.push(baseBlock);

    if (
      this.baseClassName.includes("input") ||
      this.baseClassName.includes("textarea")
    ) {
      this.cssBlocks.push(
        `.${this.baseClassName} { padding: 8px 12px; border-radius: 8px; width: 100%; font-family: var(--font-primary); }\n`
      );
    }

    if (this.baseClassName.includes("checkbox")) {
      this.cssBlocks.push(
        `.${this.baseClassName} {display: flex; align-items: center; } \n`
      );
    }

    if (this.baseClassName.includes("button")) {
      this.cssBlocks.push(
        `.${this.baseClassName} { display: flex; align-items: center; gap: 8px; cursor: pointer; }\n`
      );
    }
  }

  _processVariants() {
    for (const [variantName, variantProperties] of Object.entries(
      this.ast.variantStyles
    )) {
      const variantSelector = this._buildVariantSelector(variantName);

      // Base State for Variants
      if (variantProperties.base) {
        this._addCssBlock(variantSelector, variantProperties.base);
        this._processLayers(variantProperties.base.layers, variantSelector);
        // console.log(variantSelector);
      }

      // Pseudo States (hover, focus, etc.)
      if (variantProperties.pseudo) {
        this._processPseudoStates(variantProperties.pseudo, variantSelector);
      }
    }
  }

  _processPseudoStates(pseudoDataMap, parentSelector) {
    for (const [state, pseudoData] of Object.entries(pseudoDataMap)) {
      const pseudoClass = this.stateToPseudoMap[state];
      if (!pseudoClass) continue;

      let stateSelector;
      if (parentSelector.includes("input[type=")) {
        stateSelector = `${parentSelector.split(" ")[0]}${pseudoClass} + ${parentSelector.split(" ")[2]}`;
      } else {
        stateSelector = `${parentSelector}${pseudoClass}`;
      } // .button:hover}

      this._addCssBlock(stateSelector, pseudoData);
      this._processLayers(pseudoData.layers, stateSelector);
    }
  }

  _processLayers(layers, parentSelector) {
    if (!layers || layers.length === 0) return;

    layers.forEach((layer) => {
      if (layer.propName.toLowerCase().includes("placeholder")) return;

      const prefix = layer.type === "TEXT" ? "text-" : "";
      const cleanName = cleanPropName(layer.propName);
      const fullSelector = `${parentSelector} .${prefix}${cleanName}`;

      if (layer.styles && Object.keys(layer.styles).length > 0) {
        this.cssBlocks.push(cssBlockTemplate(fullSelector, layer.styles));
      }

      // If there are children - start again
      if (layer.children) {
        this._processLayers(layer.children, parentSelector);
      }
    });
  }

  _addCssBlock(selector, data) {
    this.cssBlocks.push(cssBlockTemplate(selector, data));
  }

  _buildVariantSelector(variantNameString) {
    if (!variantNameString) {
      return `.${this.baseClassName}`;
    }

    const classes = variantNameString.split(", ").filter(Boolean);
    const selectorPrefix = [];
    const selectorSuffix = [];

    for (const classItem of classes) {
      const [propName, value] = classItem.split("=");
      const normalValue = value.toLowerCase();

      if (this.isSelectable) {
        if (propName === "checked" && normalValue === "true") {
          selectorPrefix.push(`input[type="${this.baseClassName}"]:checked + `);
        }
      } else {
        selectorSuffix.push(`.${cleanPropName(value, "-")}`);
      }
    }

    if (this.isSelectable) {
      return `${selectorPrefix.join("")}.${this.baseClassName}`;
    } else {
      return `.${this.baseClassName}${selectorSuffix.join("")}`;
    }
  }
}

export function generateComponentCss(ast, componentDir) {
  new CssGenerator(ast, componentDir).generate();
}
