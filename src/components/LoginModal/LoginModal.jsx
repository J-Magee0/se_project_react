import React, { useState, useEffect } from "react";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onLoginModalSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onLoginModalSubmit({ email, password });
    closeActiveModal();
  };

  return (
    <ModalWithForm
      name={"login"}
      buttonText={"Sign In"}
      title={"Sign In"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
          minLength={1}
          maxLength={100}
        />
      </label>
      <label htmlFor="login-password" className="modal__label">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="login-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
          minLength={1}
          maxLength={100}
        />
      </label>
    </ModalWithForm>
  );
}
