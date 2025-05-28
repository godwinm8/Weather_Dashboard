import React from "react";
import styles from "./GlobalLoader.module.css";

const GlobalLoader = ({ message = "Loading..." }) => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner}></div>
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
export default GlobalLoader;
