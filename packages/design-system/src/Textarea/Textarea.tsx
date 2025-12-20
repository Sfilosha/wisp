// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useTextareaStyles, ITextareaStyleProps } from './useTextareaStyles';
import styles from './Textarea.module.css';

// Extend style props with custom logic props
export interface ITextareaProps extends ITextareaStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const Textarea = (props: ITextareaProps) => {
  const { onClick, onChange } = props;
  const { className } = useTextareaStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // WRITE YOUR LOGIC BELOW
  
  return (
    <textarea className={className} id={id} onChange={onChange} placeholder={props.placeholder} defaultValue={props.value}></textarea>
  );
};
