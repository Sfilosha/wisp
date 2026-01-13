// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from "react";
import { nanoid } from "nanoid";
import { useButtonStyles, IButtonStyleProps } from "./useButtonStyles";
import styles from "./button.module.css";

// Extend style props with custom logic props
export interface IButtonProps extends IButtonStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const Button = (props: IButtonProps) => {
  const { onClick, onChange } = props;
  const { className } = useButtonStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // WRITE YOUR LOGIC BELOW

  return (
    <button className={className} onClick={onClick}>
      {/* Add children elements here */}
      {props.value && (
        <span className={styles["text-value"]}>{props.value}</span>
      )}
    </button>
  );
};
