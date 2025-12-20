// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useButtonSmallStyles, IButtonSmallStyleProps } from './useButtonSmallStyles';
import styles from './ButtonSmall.module.css';

// Extend style props with custom logic props
export interface IButtonSmallProps extends IButtonSmallStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const ButtonSmall = (props: IButtonSmallProps) => {
  const { onClick, onChange } = props;
  const { className } = useButtonSmallStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // 👇 YOU CAN WRITE YOUR LOGIC HERE 👇
  
  return (
    <button className={className} onClick={onClick}>
      {/* Add children elements here */}
      {props.value && <span className={styles['text-value']}>{props.value}</span>}
      {props.hi && <span className={styles['text-hi']}>{props.hi}</span>}
    </button>
  );
};
