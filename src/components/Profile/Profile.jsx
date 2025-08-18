import "./Profile.css";
import Sidebar from "../Sidebar/Sidebar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleCardClick, handleAddBtn, handleDeleteBtn }) {
  return (
    <div className="profile">
      <section className="profile__sidebar">
        <Sidebar />
      </section>
      <section className="profile__clothes">
        <ClothesSection
          handleCardClick={handleCardClick}
          handleAddBtn={handleAddBtn}
          handleDeleteBtn={handleDeleteBtn}
        />
      </section>
    </div>
  );
}

export default Profile;
