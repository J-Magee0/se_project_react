import "./ModalWithForm.css";
import { useState, useEffect } from "react";

function ModalWithForm({
  name,
  title,
  children,
  buttonText,
  closeActiveModal,
  isOpen,
  onSubmit,
}) {
  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const form = e.target.form;
    setFormValid(form.checkValidity());
  };

  // 🔑 Reset validity when modal closes
  useEffect(() => {
    if (!isOpen) {
      setFormValid(false);
    }
  }, [isOpen]);

  return (
    <div className={`modal modal_type_${name} ${isOpen ? "modal__active" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form
          onSubmit={onSubmit}
          className="modal__form"
          onChange={handleChange}
        >
          {children}
          <button type="submit" className="modal__submit" disabled={!formValid}>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;