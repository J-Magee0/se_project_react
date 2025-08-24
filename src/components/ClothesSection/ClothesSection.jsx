import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";


function ClothesSection({ handleCardClick, handleAddBtn, clothingItems }) {
  return (
    <div className="clothes__section">
      <div className="clothes__section-title_container">
        <p className="clothes__section-title">Your Items</p>
        <button className="clothes__section-add-btn" onClick={handleAddBtn}>
          + Add New
        </button>
      </div>
      <ul className="clothes__section-cards__list">
        {clothingItems.map((item) => {
          return (
            <ItemCard
              key={item._id}
              item={item}
              onCardClick={handleCardClick}
              clothingItems={clothingItems}
            />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
