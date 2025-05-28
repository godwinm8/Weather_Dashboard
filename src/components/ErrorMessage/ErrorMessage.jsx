import React from "react";
import styles from "./ErrorMessage.module.css";

const ErrorMessage = ({ error, onClear }) => {
  if (!error) {
    return null;
  }

  const errorMessageText =
    error instanceof Error ? error.message : String(error);

  return (
    <div className={styles.errorBox}>
      <p className={styles.errorMessageText}>Error: {errorMessageText}</p>
      {onClear && (
        <button
          onClick={onClear}
          className={styles.closeButton}
          aria-label="Clear error"
          type="button"
        >
          ×
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
