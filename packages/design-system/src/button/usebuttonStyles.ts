// THIS FILE IS AUTO-GENERATED EACH TIME
// DO NOT EDIT IT MANUALLY

import css from "./button.module.css";

// Props interface that affects css, generated from Figma
export interface IButtonStyleProps {
  style: "Link" | "Tertiary" | "Secondary" | "Primary" | "Error";
  size: "small" | "large" | "medium";
  value?: string;
}

export const useButtonStyles = ({ style, size, value }: IButtonStyleProps) => {
  const classes = [
    css.button,
    css[`${style?.replace(/\s+/g, "-").toLowerCase()}`],
    css[`${size?.replace(/\s+/g, "-").toLowerCase()}`],
  ].join(" ");

  return {
    className: classes,
  };
};
