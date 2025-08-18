import ".//Sidebar.css";
import avatar from "../../assets/avatar_true.svg";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Default avatar" />
      <p className="sidebar__name">Terrence Tegegne</p>
    </div>
  );
}

export default Sidebar;
