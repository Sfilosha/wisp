"use strict";

figma.showUI(__html__, { width: 300, height: 500 });

const normalizeName = (name: string) => name.replace(/[\/\s+]/g, "-");

function rgbaToHex(color: RGBA): string {
  const toHex = (value: number) => {
    const hex = Math.round(value * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`;
}

function toUnit(
  value: number,
  {
    unit = "rem",
    base = 16,
  }: { unit?: "rem" | "%" | "px" | "none"; base?: number } = {}
): string {
  if (typeof value !== "number" || isNaN(value)) return "";

  switch (unit) {
    case "rem":
      return `${value / base}rem`;
    case "%":
      return `${(value / base) * 100}%`;
    case "px":
      return `${value}px`;
    case "none":
    default:
      return `${value}`;
  }
}

// Collect all tokens from Figma Variables and Text Styles
async function getAllTokens() {
  const ids: Record<string, string> = {};
  const tokens = {
    numeric: {} as Record<string, string>,
    string: {} as Record<string, string>,
    color: {} as Record<string, string>,
    typography: {} as Record<string, string>,
  };

  // FLOAT
  for (const v of await figma.variables.getLocalVariablesAsync("FLOAT")) {
    const key = `--${normalizeName(v.name)}`;
    console.log(key)
    ids[v.id] = key;
    const value = Object.values(v.valuesByMode)[0] as number;
    if (typeof value === "number") {
      const isWeight = v.name?.toLowerCase()?.includes("weight");
      tokens.numeric[key] = isWeight ? `${value}` : toUnit(value);
    }
  }

  // STRING
  for (const v of await figma.variables.getLocalVariablesAsync("STRING")) {
    const key = `--${normalizeName(v.name)}`;
    ids[v.id] = key;
    const value = Object.values(v.valuesByMode)[0] as string;
    if (typeof value === "string") tokens.string[key] = `"${value}"`;
  }

  // COLOR
  const colorVars = await figma.variables.getLocalVariablesAsync("COLOR");
  const resolved = new Map<string, string>();

  for (const v of colorVars) {
    const key = `--${normalizeName(v.name)}`;
    ids[v.id] = key;
    const value = Object.values(v.valuesByMode)[0];
    if (value && typeof value === "object" && "r" in value)
      resolved.set(v.id, rgbaToHex(value as RGBA));
  }

  for (const v of colorVars) {
    const key = `--${normalizeName(v.name)}`;
    ids[v.id] = key;
    const value = Object.values(v.valuesByMode)[0];

    if (!value) continue;

    // Якщо це пряме значення кольору
    if (typeof value === "object" && "r" in value) {
      tokens.color[key] = rgbaToHex(value as RGBA);
      continue;
    }

    // Якщо це VARIABLE_ALIAS (посилання на іншу змінну)
    if (
      typeof value === "object" &&
      "type" in value &&
      (value as VariableAlias).type === "VARIABLE_ALIAS"
    ) {
      const alias = value as VariableAlias;
      const resolvedHex = resolved.get(alias.id);
      if (resolvedHex) tokens.color[key] = resolvedHex;
    }
  }

  // TYPOGRAPHY
  const fontWeights: Record<string, number> = {
    thin: 100,
    extralight: 200,
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  };

  for (const style of await figma.getLocalTextStylesAsync()) {
    const base = `--text-${normalizeName(style.name)}`;
    const { fontName, fontSize, lineHeight } = style;

    tokens.typography[`${base}-font-family`] = `"${fontName.family}"`;
    tokens.typography[`${base}-font-weight`] = String(
      fontWeights[fontName.style.toLowerCase().replace(/\s/g, "")] || 400
    );

    if (typeof fontSize === "number")
      tokens.typography[`${base}-font-size`] = toUnit(fontSize);

    if (lineHeight.unit === "PIXELS")
      tokens.typography[`${base}-line-height`] = toUnit(lineHeight.value, {
        unit: "px",
      });
    else if (lineHeight.unit === "PERCENT")
      tokens.typography[`${base}-line-height`] = toUnit(lineHeight.value, {
        unit: "%",
        base: 100,
      });
  }

  const allTokens = { ids, ...tokens };
  console.log("✅ Tokens collected:", allTokens);
  return allTokens;
}

function serializeFigmaNode(node: SceneNode): any {
  // Properties to extract from each node
  const propertiesToExtract = [
    'id',
    'name',
    'type',
    'visible',
    'opacity',
    'blendMode',
    'layoutVersion',
    'children',
    'x',
    'y',
    'width',
    'height',
    'rotation',
    'constraints',
    'absoluteBoundingBox',
    'absoluteRenderBounds',
    'fills',
    'strokes',
    'strokeWeight',
    'strokeAlign',
    'effects',
    'cornerRadius',
    'layoutMode',
    'primaryAxisSizingMode',
    'counterAxisSizingMode',
    'primaryAxisAlignItems',
    'counterAxisAlignItems',
    'rectangleCornerRadii',
    'itemSpacing',
    'paddingLeft',
    'paddingRight',
    'paddingTop',
    'paddingBottom',

    // Component/Instance specific properties
    'componentPropertyDefinitions',
    'componentPropertyReferences',
    'componentProperties',          
    'mainComponentId',

    // Variable bindings
    'boundVariables',

    // TextNode specific properties
    'characters',      
    'fontSize',       
    'fontWeight',
    'fontName',
    'lineHeight',
    'letterSpacing',
    'textCase',
    'textDecoration',
    'textStyleID',
    'fillStyleId',
  ];

  // Create a plain object to hold the serialized data
  const obj: Record<string, any> = {};

  propertiesToExtract.forEach(prop => {
    if (prop in node) {
      try {

        if (prop === 'componentPropertyDefinitions' && node.type !== 'COMPONENT_SET') {
          return;
        }
        
        obj[prop] = (node as any)[prop];
        
        if (obj[prop] === figma.mixed) {
           if (prop === 'cornerRadius') {
             obj[prop] = {
                 mixed: true,
                 topLeft: (node as any).topLeftRadius,
                 topRight: (node as any).topRightRadius,
                 bottomRight: (node as any).bottomRightRadius,
                 bottomLeft: (node as any).bottomLeftRadius
             };
           } else {
             obj[prop] = 'figma.mixed'; 
           }
        }
      } catch (e) {
        console.warn(`Failed to read property ${prop} on node ${node.name}`);
      }
    }
  });

  // 3. Check for children and recursively serialize them
  if ('children' in node) {
    obj.children = node.children.map((child: SceneNode) => serializeFigmaNode(child));
  }

  return obj;
}

figma.ui.onmessage = async (msg) => {

  switch (msg.type) {
    case "tokens-update": {
      console.log("🔄 [PLUGIN] Collecting tokens...");
      const data = await getAllTokens();
      console.log("✅ [PLUGIN] Tokens collected, sending to UI");
      console.log(data);
      figma.ui.postMessage({
        type: "tokens-update",
        payload: data,
      });
      break;
    }

    case "components-generate": {
      const selected = figma.currentPage.selection;
      const result = serializeFigmaNode(selected[0]);
      console.log('Selected', selected[0]);

      console.log("🔄 [PLUGIN] Generating components for selection:", selected);
      if (!selected.length)
        return figma.notify(
          "🛑 Please select at least one ComponentSet"
        );
        
        if (selected[0].type !== "COMPONENT_SET")
          return figma.notify(
            "🛑 Please select only ComponentSet"
          );

      const data = await getAllTokens();
      figma.ui.postMessage({
        type: "component-generate",
        payload: {
          componentData: selected[0],
          componentNodeIds: selected.map((n) => n.id),
          component: result,
          ...data,
        },
      });
      console.log('component', result);
      break;
    }

    case "notify-success":
      figma.notify(`✅ ${msg.message}`);
      break;

    case "notify-cancel":
      figma.notify(`🛑 Canceled`);
      break;

    case "notify-error":
      figma.notify(`❌ Error: ${msg.message}`);
      break;
  }
};
