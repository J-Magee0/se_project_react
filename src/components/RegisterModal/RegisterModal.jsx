import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onRegisterModalSubmit,
  setActiveModal,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
      setAvatarUrl("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ email, password, name, avatarUrl });
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    // Close register modal then open login modal
    closeActiveModal();
    if (typeof setActiveModal === "function") {
      setActiveModal("login");
    }
  };

  return (
    <ModalWithForm
      name={"Register"}
      buttonText={"Sign Up"}
      title={"Sign Up"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          value={email}
          onChange={handleEmailChange}
          minLength={1}
          maxLength={100}
        />
      </label>
      <label htmlFor="register-password" className="modal__label">
        Password *{" "}
        <input
          type="password"
          className="modal__input"
          id="register-password"
          placeholder="Password"
          required
          value={password}
          onChange={handlePasswordChange}
          minLength={1}
          maxLength={100}
        />
      </label>
      <label htmlFor="register-name" className="modal__label">
        Name *{" "}
        <input
          type="text"
          className="modal__input"
          id="register-name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
          minLength={1}
          maxLength={50}
        />
      </label>
      <label htmlFor="register-avatar-url" className="modal__label">
        Avatar URL *{" "}
        <input
          type="url"
          className="modal__input"
          id="register-avatar-url"
          placeholder="Avatar URL"
          required
          value={avatarUrl}
          onChange={handleAvatarUrlChange}
          minLength={1}
          maxLength={200}
        />
      </label>
      <button
        type="button"
        className="modal__login-btn"
        onClick={handleLoginClick}
      >
        Or Log In
      </button>
    </ModalWithForm>
  );
}
