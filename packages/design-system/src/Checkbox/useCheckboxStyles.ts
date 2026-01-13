// THIS FILE IS AUTO-GENERATED EACH TIME
// DO NOT EDIT IT MANUALLY

import css from './Checkbox.module.css';

// Props interface that affects css, generated from Figma
export interface ICheckboxStyleProps {
  checked: 'True' | 'False';



}

export const useCheckboxStyles = ({ checked }: ICheckboxStyleProps) => {
  const classes = [css.checkbox, 
      css[`${checked?.replace(/\s+/g, '-').toLowerCase()}`],
  ].join(' ');

  return {
    className: classes,
  };
};
