import { useContext } from "react";
import "./ItemModal.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemModal({ activeModal, card, closeActiveModal, handleDeleteBtn }) {
  const cardToUse = card || {};
  const currentUser = useContext(CurrentUserContext);

  // Check if the current user is the owner of the item
  const isOwn = currentUser && currentUser._id && cardToUse.owner === currentUser._id;

  return (
    <div className={`modal ${activeModal === "preview" && "modal__active"}`}>
      <div className="modal__content ">
        <button
          onClick={closeActiveModal}
          type="button"
          className="modal__close"
        ></button>
        <img src={card.imageUrl || card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <div className="modal__footer-left">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather type: {card.weather}</p>
          </div>
          {isOwn && (
            <button
              className="modal__delete-btn"
              onClick={() => handleDeleteBtn(cardToUse)}
              type="button"
            >
              Delete item
            </button>
          )}
        </div>
      </div>{" "}
    </div>
  );
}

export default ItemModal;
