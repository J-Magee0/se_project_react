import { useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

export default function EditProfileModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onEditProfileSubmit,
}) {
  const currentUser = useContext(CurrentUserContext);
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: "",
      avatar: "",
    },
  });

  useEffect(() => {
    if (isOpen && currentUser) {
      reset({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, reset]);

  const onSubmit = (data) => {
    onEditProfileSubmit(data);
  };

  return (
    <ModalWithForm
      name={"edit-profile"}
      buttonText={"Save"}
      title={"Edit Profile"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          required
          {...register("name", {
            required: true,
            minLength: 1,
            maxLength: 50,
          })}
        />
      </label>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="profile-avatar"
          placeholder="Avatar URL"
          {...register("avatar", {
            minLength: 1,
            maxLength: 200,
          })}
        />
      </label>
    </ModalWithForm>
  );
}
