export function componentTsxTemplate({componentName, componentTag, componentAttributes, componentChildren}) {
    return `// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { use${componentName}Styles, I${componentName}StyleProps } from './use${componentName}Styles';
import styles from './${componentName}.module.css';

// Extend style props with custom logic props
export interface I${componentName}Props extends I${componentName}StyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const ${componentName} = (props: I${componentName}Props) => {
  const { onClick, onChange } = props;
  const { className } = use${componentName}Styles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // WRITE YOUR LOGIC BELOW
  
  return (
    <${componentTag} className={className}${componentAttributes}>${componentChildren}</${componentTag}>
  );
};
`};