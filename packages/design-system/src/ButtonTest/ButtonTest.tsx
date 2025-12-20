// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useButtonTestStyles, IButtonTestStyleProps } from './useButtonTestStyles';
import styles from './ButtonTest.module.css';

// Extend style props with custom logic props
export interface IButtonTestProps extends IButtonTestStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const ButtonTest = (props: IButtonTestProps) => {
  const { onClick, onChange } = props;
  const { className } = useButtonTestStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // WRITE YOUR LOGIC BELOW
  
  return (
    <button className={className} onClick={onClick}>
      {/* Add children elements here */}
      {props.value && <span className={styles['text-value']}>{props.value}</span>}
      {props.hi && <span className={styles['text-hi']}>{props.hi}</span>}
    </button>
  );
};
