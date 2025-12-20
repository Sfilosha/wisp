// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useInputComboStyles, IInputComboStyleProps } from './useInputComboStyles';
import styles from './InputCombo.module.css';

// Extend style props with custom logic props
export interface IInputComboProps extends IInputComboStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const InputCombo = (props: IInputComboProps) => {
  const { onClick, onChange } = props;
  const { className } = useInputComboStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // 👇 YOU CAN WRITE YOUR LOGIC HERE 👇
  
  return (
    <input className={className} id={id} onChange={onChange} type="text" placeholder={props.placeholder} defaultValue={props.subtext}></input>
  );
};
