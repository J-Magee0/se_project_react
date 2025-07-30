import "./ModalWithForm.css";

function ModalWithForm({
  name,
  title,
  children,
  buttonText,
  activeModal,
  closeActiveModal,
  isOpen,
}) {
  return (
    <div
      className={`modal ${isOpen && "modal__active"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        />
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit" disabled>
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
