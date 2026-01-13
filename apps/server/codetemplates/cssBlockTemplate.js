import { cleanPropName } from "../helpers/utils.js";

// Selector (.button, .button:disabled etc.)
// Styles (backgroundColor, border, layers, etc.)
export function cssBlockTemplate(selector, styles) {
  const cssLines = [];

  if (styles.display) cssLines.push(`  display: ${styles.display};`);
  if (styles.flexDirection)
    cssLines.push(`  flex-direction: ${styles.flexDirection};`);
  if (styles.justifyContent)
    cssLines.push(`  justify-content: ${styles.justifyContent};`);
  if (styles.alignItems) cssLines.push(`  align-items: ${styles.alignItems};`);
  if (styles.gap) cssLines.push(`  gap: ${styles.gap};`);

  if (styles.padding) cssLines.push(`  padding: ${styles.padding};`);
  if (styles.width) cssLines.push(`  width: ${styles.width};`);
  if (styles.height) cssLines.push(`  height: ${styles.height};`);
  if (styles.minWidth) cssLines.push(`  min-width: ${styles.minWidth};`);
  if (styles.maxWidth) cssLines.push(`  max-width: ${styles.maxWidth};`);
  if (styles.minHeight) cssLines.push(`  min-height: ${styles.minHeight};`);
  if (styles.maxHeight) cssLines.push(`  max-height: ${styles.maxHeight};`);

  if (styles.backgroundColor)
    cssLines.push(`  background-color: ${styles.backgroundColor};`);
  if (styles.border) cssLines.push(`  border: ${styles.border};`);
  if (styles.borderRadius)
    cssLines.push(`  border-radius: ${styles.borderRadius};`);

  if (styles.color) cssLines.push(`  color: ${styles.color};`);

  if (styles.fontFamily) {
    const ff = styles.fontFamily;
    const value = ff.startsWith("var(") ? ff : `'${ff}'`;
    cssLines.push(`  font-family: ${value};`);
  }

  if (styles.textAlign) cssLines.push(` text-align: ${styles.textAlign};`);
  if (styles.fontWeight) cssLines.push(`  font-weight: ${styles.fontWeight};`);
  if (styles.fontSize) cssLines.push(`  font-size: ${styles.fontSize};`);
  if (styles.lineHeight) cssLines.push(`  line-height: ${styles.lineHeight};`);
  if (styles.textDecoration)
    cssLines.push(`  text-decoration: ${styles.textDecoration};`);

  if (cssLines.length === 0) return "";

  return `${selector} {\n${cssLines.join("\n")}\n}\n\n`;
}
