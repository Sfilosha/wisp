import fs from "fs";
import path from "path";
import { cleanPropName, categorizeTextProps } from "../helpers/utils.js";
import Logger from "../../../helpers/Logger.js";
import FileService from "../core/FileService.js";
import { storybookTemplate } from "../codetemplates/storybookTemplate.js";
import { mapJoin } from "../helpers/mapJoin.js";

export class StorybookGenerator {
  constructor(ast, componentDir) {
    this.ast = ast;
    this.componentDir = componentDir;
    this.componentName = ast.componentName;
    const { placeholderPropNames, valuePropNames } = categorizeTextProps(ast);
    this.placeholderPropNames = placeholderPropNames;
    this.valuePropNames = valuePropNames;
    this.firstVariantLayers =
      Object.values(ast.variantStyles)[0]?.base?.layers || [];
  }

  generate() {
    Logger.info(
      `[StorybookGenerator] Generating initial Story for ${this.componentName}...`
    );

    // Check if already exists. If yes - skip generation
    const filePath = this._getFilePath();
    // if (fs.existsSync(filePath)) {
    //   Logger.note(
    //     `[StorybookGenerator] Skip: ${path.basename(filePath)} exists.`
    //   );
    //   return;
    // }

    const storybookCode = storybookTemplate({
      componentName: this.componentName,
      variantArgTypes: this._buildVariantArgTypes(this.ast.props),
      valueArgTypes: this._buildTextArgTypes(this.valuePropNames),
      placeholderArgTypes: this._buildTextArgTypes(this.placeholderPropNames),
      booleanArgTypes: this._buildBooleanArgTypes(this.ast.allBooleanPropNames),
      variantDefaultArgs: this._buildVariantDefaultArgs(this.ast.props),
      textDefaultArgs: this._buildTextDefaultArgs(this.ast.allTextPropNames),
      booleanDefaultArgs: this._buildBooleanDefaultArgs(
        this.ast.allBooleanPropNames
      ),
    });

    FileService.writeSafe(this._getFilePath(), storybookCode);
    Logger.info(`[Storybook Generator] STORYBOOK Generation Finished!`);
  }

  // ArgType Builders
  _buildVariantArgTypes(array) {
    return mapJoin(
      array,
      (p) =>
        `    ${cleanPropName(p.name)}: { control: 'select', options: ['${p.values.join("', '")}'] },`
    );
  }

  _buildTextArgTypes(array) {
    return mapJoin(
      array,
      (p) => `    ${cleanPropName(p)}: { control: 'text' },`
    );
  }

  _buildBooleanArgTypes(array) {
    return mapJoin(
      array,
      (p) => `    ${cleanPropName(p)}: { control: 'boolean' },`
    );
  }

  // Default arguments builder
  _buildVariantDefaultArgs(array) {
    return mapJoin(
      array,
      (p) => `    ${cleanPropName(p.name)}: '${p.values[0]}',`
    );
  }

  _buildTextDefaultArgs(array) {
    return mapJoin(array, (p) => {
      // Recursive search for layer to find defaultValue
      const layer = this._findLayerRecursive(this.firstVariantLayers, p);
      const value = layer?.defaultValue || "";
      return `    ${cleanPropName(p)}: '${value}',`;
    });
  }

  _buildBooleanDefaultArgs(array) {
    return mapJoin(array, (p) => `    ${cleanPropName(p)}: true,`);
  }

  // HELPERS
  // Recursive layer search based on the propName
  _findLayerRecursive(layers, propName) {
    if (!layers) return null;

    for (const layer of layers) {
      if (layer.propName === propName) return layer;

      if (layer.children && layer.children.length > 0) {
        // console.log(this._findLayerRecursive(layer.children, propName))
        const found = this._findLayerRecursive(layer.children, propName);
        if (found) return found;
      }
    }
    return null;
  }

  _getFilePath() {
    return path.join(this.componentDir, `${this.componentName}.stories.tsx`);
  }
}

export function generateStorybook(ast, componentDir) {
  new StorybookGenerator(ast, componentDir).generate();
}
