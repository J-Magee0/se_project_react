import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

export default function AddItemModal({
  closeActiveModal,
  isOpen,
  activeModal,
  onAddItemModalSubmit,
}) {
  const { register, handleSubmit, reset, } = useForm({
    defaultValues: {
      name: "",
      imageUrl: "",
      weather: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = (data) => {
    onAddItemModalSubmit(data);
  };

  return (
    <ModalWithForm
      name={"add-garment"}
      buttonText={"Add garment"}
      title={"New garment"}
      activeModal={activeModal}
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit(onSubmit)}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          required
          {...register("name", {
            required: true,
            minLength: 1,
            maxLength: 30,
          })}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          required
          {...register("imageUrl", {
            required: true,
            minLength: 1,
            maxLength: 200,
          })}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            id="hot"
            type="radio"
            className="modal__radio-input"
            {...register("weather", { required: true })}
            value="hot"
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            id="warm"
            type="radio"
            className="modal__radio-input"
            {...register("weather", { required: true })}
            value="warm"
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            id="cold"
            type="radio"
            className="modal__radio-input"
            {...register("weather", { required: true })}
            value="cold"
          />{" "}
          Cold
        </label>
      </fieldset>
    </ModalWithForm>
  );
}
