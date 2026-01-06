import React, { useState, useEffect } from "react";
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
  const [weather, setWeather] = useState("");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  useEffect(() => {
    if (isOpen) {
      setName("");
      setImageUrl("");
      setWeather("");
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault(); // Handle form submission logic here
    onAddItemModalSubmit({ name, imageUrl, weather }); // Call the parent function to handle the submission
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
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value={"hot"}
            checked={weather === "hot"}
            required
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value={"warm"}
            checked={weather === "warm"}
            required
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            value={"cold"}
            checked={weather === "cold"}
            required
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
