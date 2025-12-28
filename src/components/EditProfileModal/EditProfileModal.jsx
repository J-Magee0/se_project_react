import React, { useState, useEffect, useContext } from "react";
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
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setName(currentUser.name || "");
      setAvatar(currentUser.avatar || "");
    }
  }, [isOpen, currentUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onEditProfileSubmit({ name, avatar });
  };

  return (
    <ModalWithForm
      name={"edit-profile"}
      buttonText={"Save"}
      title={"Edit Profile"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="profile-name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="profile-name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
          minLength={1}
          maxLength={50}
        />
      </label>
      <label htmlFor="profile-avatar" className="modal__label">
        Avatar URL{" "}
        <input
          type="url"
          className="modal__input"
          id="profile-avatar"
          placeholder="Avatar URL"
          value={avatar}
          onChange={handleAvatarChange}
          minLength={1}
          maxLength={200}
        />
      </label>
    </ModalWithForm>
  );
}
