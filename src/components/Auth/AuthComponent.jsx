import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Button from "../Button/Button";
import styles from "./AuthComponent.module.css";

const AuthComponent = () => {
  const {
    user,
    signIn,
    signUp,

    loading: authContextLoading,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);

  const [authError, setAuthError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError(null);
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      let response;
      if (isSigningUp) {
        response = await signUp({ email, password });
        if (response.error) throw response.error;
        if (response.data.user && response.data.session === null) {
          setSuccessMessage(
            "Sign up successful! Please check your email to verify your account."
          );
        } else if (response.data.user) {
          setSuccessMessage("Sign up successful and logged in!");
        } else {
          setSuccessMessage(
            "Sign up request processed. Follow any further instructions."
          );
        }
      } else {
        response = await signIn({ email, password });
        if (response.error) throw response.error;
        setSuccessMessage("Signed in successfully!");
      }
    } catch (error) {
      setAuthError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authContextLoading) {
    return <p className={styles.authMessage}>Loading user session...</p>;
  }

  if (user) {
    return null;
  }

  return (
    <div className={styles.authContainer}>
      <h3 className={styles.formTitle}>
        {isSigningUp ? "Create an Account" : "Sign In"}
      </h3>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="auth-email" className={styles.label}>
            Email address
          </label>
          <input
            type="email"
            id="auth-email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isSubmitting}
            className={styles.input}
            placeholder="you@example.com"
          />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="auth-password" className={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="auth-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isSubmitting}
            className={styles.input}
            placeholder="••••••••"
          />
        </div>

        {authError && <p className={styles.error}>{authError}</p>}
        {successMessage && (
          <p className={styles.successMessage}>{successMessage}</p>
        )}

        <Button
          type="submit"
          variant="primary"
          fullWidth
          isLoading={isSubmitting}
          loadingText="Processing..."
          className={styles.submitButtonMargin}
        >
          {isSigningUp ? "Sign Up" : "Sign In"}
        </Button>
      </form>
      <Button
        variant="link"
        onClick={() => {
          setIsSigningUp(!isSigningUp);
          setAuthError(null);
          setSuccessMessage("");
          setEmail("");
          setPassword("");
        }}
        disabled={isSubmitting}
        className={styles.toggleFormButton}
      >
        {isSigningUp
          ? "Already have an account? Sign In"
          : "Don't have an account? Sign Up"}
      </Button>
    </div>
  );
};

export default AuthComponent;
