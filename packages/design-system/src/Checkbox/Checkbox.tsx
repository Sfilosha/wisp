// THIS FILE IS GENERATED ONCE AND CAN BE EDITED MANUALLY

import React, { useMemo } from "react";
import { nanoid } from "nanoid";
import { useCheckboxStyles, ICheckboxStyleProps } from "./useCheckboxStyles";
import styles from "./Checkbox.module.css";

// Extend style props with custom logic props
export interface ICheckboxProps extends ICheckboxStyleProps {
  id?: string;
  onClick?: () => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  // Add other props here
}

export const Checkbox = (props: ICheckboxProps) => {
  const { onClick, onChange } = props;
  const { className } = useCheckboxStyles(props);

  const id = useMemo(() => props.id || nanoid(), [props.id]);

  // WRITE YOUR LOGIC BELOW

  return (
    <label style={{ display: "flex" }}>
      <input
        type="checkbox"
        id={id}
        onChange={onChange}
        style={{ appearance: "none" }}
      />
      <span className={styles["checkbox"]}></span>
    </label>
  );
};
