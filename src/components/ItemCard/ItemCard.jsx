import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {

  const handleCardClick = () => {
    onCardClick(item); // Call the onCardClick function with the item
  };

  return (
    <li className="card">
      <h2 className="card__name">{item.name}</h2>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.link}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
