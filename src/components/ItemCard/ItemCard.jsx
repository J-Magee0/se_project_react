import { useContext } from "react";
import "./ItemCard.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike }) {
  const currentUser = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (onCardLike && currentUser && currentUser._id) {
      const isLiked =
        item.likes && item.likes.some((id) => id === currentUser._id);
      onCardLike({ id: item._id, isLiked });
    }
  };

  // Check if the item was liked by the current user
  const isLiked =
    currentUser &&
    item.likes &&
    item.likes.some((id) => id === currentUser._id);

  const itemLikeButtonClassName = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <div className="card__image-container">
        <img
          onClick={handleCardClick}
          className="card__image"
          src={item.imageUrl || item.link}
          alt={item.name}
        />
        {currentUser && onCardLike && (
          <button
            className={itemLikeButtonClassName}
            onClick={handleLike}
            type="button"
          />
        )}
      </div>
    </li>
  );
}

export default ItemCard;
