import { useContext } from "react";
import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";


function ClothesSection({ handleCardClick, handleAddBtn, clothingItems }) {
  const currentUser = useContext(CurrentUserContext);

  // Filter items to show only those owned by the current user
  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );
  return (
    <div className="clothes__section">
      <div className="clothes__section-title_container">
        <p className="clothes__section-title">Your Items</p>
        <button className="clothes__section-add-btn" onClick={handleAddBtn}>
          + Add New
        </button>
      </div>
      <ul className="clothes__section-cards__list">
        {userItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              clothingItems={userItems}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
