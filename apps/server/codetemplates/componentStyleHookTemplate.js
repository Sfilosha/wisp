export function componentStyleHookTemplate({
  componentName,
  variantPropsInterface,
  valuePropsInterface,
  placeholderPropsInterface,
  booleanPropsInterface,
  allStyleProps,
  cssSelectors 
}) {
  return `// THIS FILE IS AUTO-GENERATED EACH TIME
// DO NOT EDIT IT MANUALLY

import css from './${componentName}.module.css';

// Props interface that affects css, generated from Figma
export interface I${componentName}StyleProps {
${variantPropsInterface}
${valuePropsInterface}
${placeholderPropsInterface}
${booleanPropsInterface}
}

export const use${componentName}Styles = ({ ${allStyleProps} }: I${componentName}StyleProps) => {
  const classes = [css.${componentName.toLowerCase()}, 
  ${cssSelectors}
  ].join(' ');

  return {
    className: classes,
  };
};
`;
}