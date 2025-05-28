import React from "react";
import styles from "./Button.module.css";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  className = "",
  isLoading = false,
  loadingText = "Processing...",
  ...props
}) => {
  const buttonClasses = `
    ${styles.buttonBase}
    ${styles[variant]} 
    ${styles[size]}
    ${fullWidth ? styles.fullWidth : ""}
    ${isLoading ? styles.loading : ""}
    ${className}
  `;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={buttonClasses.trim()}
      {...props}
    >
      {isLoading ? (
        <>
          <span className={styles.spinner}></span>
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
