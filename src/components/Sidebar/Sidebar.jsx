import { useContext } from "react";
import "./Sidebar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";

function Sidebar({ onEditProfile, onSignOut }) {
  const currentUser = useContext(CurrentUserContext);

  // Create placeholder avatar with first letter of name
  const getPlaceholderAvatar = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
  };

  const userInitial = currentUser?.name
    ? getPlaceholderAvatar(currentUser.name)
    : "?";
  const userName = currentUser?.name || currentUser?.email || "User";

  return (
    <div className="sidebar">
      <div className="sidebar__data">
        {currentUser?.avatar ? (
          <img
            className="sidebar__avatar"
            src={currentUser.avatar}
            alt={userName}
          />
        ) : (
          <div className="sidebar__avatar sidebar__avatar_placeholder">
            {userInitial}
          </div>
        )}
        <p className="sidebar__name">{userName}</p>
      </div>
      <button
        className="sidebar__edit-btn"
        onClick={onEditProfile}
        type="button"
      >
        Change profile data
      </button>
      <button
        className="sidebar__logout-btn"
        onClick={onSignOut}
        type="button"
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
