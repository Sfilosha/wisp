export function rgbaToHex({ r, g, b }) {
  const toHex = c => `0${Math.round(c * 255).toString(16)}`.slice(-2);
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export const cleanPropName = (name, divider = '') => name.toLowerCase().replace(/\s+/g, divider);

export function categorizeTextProps(ast) {
  const placeholderPropNames = ast.allTextPropNames.filter(p =>
    p.toLowerCase().includes('placeholder')
  );
  const valuePropNames = ast.allTextPropNames.filter(
    p => !p.toLowerCase().includes('placeholder')
  );

  return { placeholderPropNames, valuePropNames };
}
