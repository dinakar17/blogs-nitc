// This is a toggle component that can be used to toggle between two states
// Just for the sake of animation, I have created this component

import React from "react";
import styles from "../../styles/Toggle.module.css";

type Props = {
  toggled: boolean;
  onClick: () => void;
};

export default function Toggle({ toggled, onClick }: Props) {
//   console.log(toggled);
  return (
    <div
      onClick={onClick}
      className={`${styles.toggle} ${toggled ? styles.night : ""}`}
    >
      <div className={styles.notch}>
        <div className={styles.crater} />
        <div className={styles.crater} />
      </div>
      <div>
        <div className={`${styles.shape} ${styles.sm}`} />
        <div className={`${styles.shape} ${styles.sm}`} />
        <div className={`${styles.shape} ${styles.md}`} />
        <div className={`${styles.shape} ${styles.lg}`} />
      </div>
    </div>
  );
}
