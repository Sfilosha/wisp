import { cleanPropName } from "./utils.js";

export const renderAstLayer = (layer) => {
    const prop = cleanPropName(layer.propName);

    switch (layer.type) {
      case 'TEXT':
        if (prop.toLowerCase().includes('placeholder')) return null;
        return `      {props.${prop} && <span className={styles['text-${prop}']}>{props.${prop}}</span>}`;

      case 'FRAME':
      case 'GROUP':
      case 'CONTAINER':
        const childItem = layer.children && layer.children.length > 0
          ? layer.children.map(child => renderAstLayer(child)).filter(Boolean).join('\n')
          : '';

        // If has children <div></div>; If no child <div/>
        if (childItem) {
          return `      <div className={styles['${prop}']}>
        ${childItem}
      </div>`;
        } else {
          return `      <div className={styles['${prop}']} />`;
        }

      case 'RECTANGLE':
      case 'ELLIPSE':
      case 'VECTOR':
        return `      <div className={styles['${prop}']} />`;

      case 'INSTANCE':
        return `      {/* Instance: ${layer.name} */}\n      <div className={styles['${prop}']} />`;

      default:
        return null;
    }
  };