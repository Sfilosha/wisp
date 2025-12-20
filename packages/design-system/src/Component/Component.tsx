// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useComponentStyles, IComponentStyleProps } from './useComponentStyles';
import styles from './Component.module.css';

// Extend style props with custom logic props
export interface IComponentProps extends IComponentStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const Component = (props: IComponentProps) => {
  const { onClick, onChange } = props;
  const { className } = useComponentStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // 👇 YOU CAN WRITE YOUR LOGIC HERE 👇
  
  return (
    <div className={className}>
      {/* Add children elements here */}
      <div className={styles['circle']} />
      <div className={styles['content']}>
              {props.hello && <span className={styles['text-hello']}>{props.hello}</span>}
      {props.title && <span className={styles['text-title']}>{props.title}</span>}
      </div>
    </div>
  );
};
