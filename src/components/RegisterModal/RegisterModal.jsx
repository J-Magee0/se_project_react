import React, { useState, useEffect } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onRegisterModalSubmit,
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setEmail("");
      setPassword("");
      setName("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegisterModalSubmit({ email, password, name });
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
        Email{" "}
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
        Password{" "}
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
        Name{" "}
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
    </ModalWithForm>
  );
}
