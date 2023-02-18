import React, { useState } from "react";

/**
 * Defined
 */
import "./topbar.css";

/**
 * assests
 */
import ProfileImage from "../../../assets/logos/lyte.png";

export default () => {
  return (
    <div className="topbar">
      <div className="topbar-ctr card">
        <div className="topbar-left-ctr">
          <div className="logo">Lyte</div>
        </div>
        <div className="topbar-right-ctr">
          <div className="topbar-icons">
            <div className="topbar-icon-wrapper">
              <img
                src={ProfileImage}
                height="36px"
                width="36px"
                style={{ borderRadius: "50%", cursor: "pointer" }}
                alt="ADMIN"
                aria-controls="profile-menu-opener"
                aria-haspopup="true"
              />
            </div>
            <div>
              <h3>Lyte</h3>
              <span>Admin</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
