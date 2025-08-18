import React, { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [weatherType, setWeatherType] = useState("");




  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWeatherTypeChange = (e) => {
    setWeatherType(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Handle form submission logic here
    onAddItemModalSubmit({ name, imageUrl, weatherType }); // Call the parent function to handle the submission
    setName("");
    setImageUrl("");
    setWeatherType("");
    console.log("Submitted:", { name, imageUrl, weatherType });
  };

  return (
    <ModalWithForm
      name={"add-garment"}
      buttonText={"Add garment"}
      title={"New garment"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          value={name}
          onChange={handleNameChange}
          minLength={1}
          maxLength={30}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          onChange={handleImageUrlChange}
          value={imageUrl}
          required
          minLength={1}
          maxLength={200}
        />
      </label>
      <fieldset className="modal__radio-btns" required>
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name={weatherType}
            onChange={handleWeatherTypeChange}
            value={"hot"}
            checked={weatherType === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name={weatherType}
            onChange={handleWeatherTypeChange}
            value={"warm"}
            checked={weatherType === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name={weatherType}
            onChange={handleWeatherTypeChange}
            value={"cold"}
            checked={weatherType === "cold"}
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
