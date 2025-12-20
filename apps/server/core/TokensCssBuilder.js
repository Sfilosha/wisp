export default class CssBuilder {
  static build(tokenSections) {
    const lines = [':root {'];
    
    for (const [label, tokens] of Object.entries(tokenSections)) {

      // if label's tokens object is empty, skip it
      if (!tokens || Object.keys(tokens).length === 0) continue;

      // add tokenSection label as comment
      lines.push(``, `  /* ${label} */`);

      // add each token as CSS variable
      for (const [name, value] of Object.entries(tokens)) {
        lines.push(`  ${name}: ${value};`);
      }
    }

    lines.push('}');
    return lines.join('\n') + '\n';
  }
}