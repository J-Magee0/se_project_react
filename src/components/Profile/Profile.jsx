import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleCardClick,
  handleAddBtn,
  handleDeleteBtn,
  clothingItems,
  onEditProfile,
  onSignOut,
  onCardLike,
}) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddBtn={handleAddBtn}
          handleDeleteBtn={handleDeleteBtn}
          clothingItems={clothingItems}
          onCardLike={onCardLike}
        />
      </section>
    </div>
  );
}

export default Profile;
