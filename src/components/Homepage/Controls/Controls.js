import React from "react";

import styles from "./Controls.module.css";

import UnitControl from "./UnitControl/UnitControl";

export default function Controls() {
  return (
    <div className={styles.controlsWrap}>
      <h2>Controls</h2>
      <UnitControl />
    </div>
  );
}
