import "./DeleteConfirmmodal.css";

function DeleteConfirmModal({
  activeModal,
  closeActiveModal,
  handleDelete,
  card,
}) {
  return (
    <div
      className={`modal ${activeModal === "delete-garment" && "modal__active"}`}
    >
      <div className="modal__content modal__content_type_confirm">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <p className="modal__confirm-caption">
          Are you sure you want to delete this item?
        </p>
        <p className="modal__confirm-caption-confirmation">
          This action is irreversible.
        </p>
        <div className="modal__button">
          <button
            onClick={() => handleDelete(card)}
            type="button"
            className="modal__confirm-button"
          >
            Yes delete item
          </button>
          <button
            onClick={closeActiveModal}
            type="button"
            className="modal__cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
