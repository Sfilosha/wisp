// THIS FILE IS AUTO-GENERATED EACH TIME
// DO NOT EDIT IT MANUALLY

import css from './Input.module.css';

// Props interface that affects css, generated from Figma
export interface IInputStyleProps {

  value?: string;
  placeholder?: string;

}

export const useInputStyles = ({ value, placeholder }: IInputStyleProps) => {
  const classes = [css.input, 
  
  ].join(' ');

  return {
    className: classes,
  };
};
