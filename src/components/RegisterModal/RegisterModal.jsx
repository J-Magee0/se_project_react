import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function RegisterModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onRegisterModalSubmit,
  setActiveModal,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
      name: "",
      avatarUrl: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    onRegisterModalSubmit(data);
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
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="register-email" className="modal__label">
        Email *{" "}
        <input
          type="email"
          className="modal__input"
          id="register-email"
          placeholder="Email"
          required
          {...register("email", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
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
          {...register("password", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
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
          {...register("name", {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
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
          {...register("avatarUrl", {
            required: true,
            minLength: 1,
            maxLength: 200,
          })}
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
