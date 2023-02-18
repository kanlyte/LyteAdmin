//styles
import "./sidebar.css";

//assets
import ProfileImage from "../../../assets/logos/lyte.png";

//react router
import { Link } from "react-router-dom";

export default (props) => {
  return (
    <div className="sidebar">
      <div className="sidebar-content">
        <div className="sidebar-hdr">
          <img src={ProfileImage} alt="CLASSIMAGE" />
          <span>Lyte Admin</span>
        </div>
        <div className="sidebar-links">
          <Link to="/">
            <div
              className={
                props.active === "home" ? "sidebar-link active" : "sidebar-link"
              }
            >
              <i className="las la-home"></i>
              <span>Home</span>
            </div>
          </Link>

          <Link to="/manage">
            <div
              className={
                props.active === "manage"
                  ? "sidebar-link active"
                  : "sidebar-link"
              }
            >
              <i className="las la-globe"></i>
              <span>Application</span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
