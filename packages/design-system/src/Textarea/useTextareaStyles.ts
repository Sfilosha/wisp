// THIS FILE IS AUTO-GENERATED EACH TIME
// DO NOT EDIT IT MANUALLY

import css from './Textarea.module.css';

// Props interface that affects css, generated from Figma
export interface ITextareaStyleProps {

  value?: string;
  placeholder?: string;

}

export const useTextareaStyles = ({ value, placeholder }: ITextareaStyleProps) => {
  const classes = [css.textarea, 
  
  ].join(' ');

  return {
    className: classes,
  };
};
