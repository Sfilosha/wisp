// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useInputStyles, IInputStyleProps } from './useInputStyles';
import styles from './Input.module.css';

// Extend style props with custom logic props
export interface IInputProps extends IInputStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const Input = (props: IInputProps) => {
  const { onClick, onChange } = props;
  const { className } = useInputStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // 👇 YOU CAN WRITE YOUR LOGIC HERE 👇
  
  return (
    <input className={className} id={id} type="text" onChange={onChange} placeholder={props.placeholder} defaultValue={props.value}></input>
  );
};
