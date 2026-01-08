import { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function LoginModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onLoginModalSubmit,
  setActiveModal,
}) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    onLoginModalSubmit(data);
  };

  const handleSignUpClick = (e) => {
    e.preventDefault();
    if (typeof setActiveModal === "function") {
      setActiveModal("register");
    }
  };

  return (
    <ModalWithForm
      name={"login"}
      buttonText={"Log In"}
      title={"Log In"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="login-email" className="modal__label">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="login-email"
          placeholder="Email"
          required
          {...register("email", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
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
          {...register("password", {
            required: true,
            minLength: 1,
            maxLength: 100,
          })}
        />
      </label>
      <button
        type="button"
        className="modal__signup-btn"
        onClick={handleSignUpClick}
      >
        Or Sign Up
      </button>
    </ModalWithForm>
  );
}
