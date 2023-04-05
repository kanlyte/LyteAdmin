import react, { useState } from "react";

/**
 * components
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";

/**
 * component styling
 */
import "./designs/home.css";

export default () => {
  const [state, setState] = useState({});

  return (
    <>
      <TopBar />
      <div className="ctr">
        <div className="main">
          <div className="side-ctr card">
            <SideNav active="home" />
          </div>
          <div className="main-ctr card">
            <div className="dashboard-ctr">
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>121</div>
                    <div>Properties</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>89</div>
                    <div>Managers</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>89</div>
                    <div>Connections Today</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>89</div>
                    <div>Locations</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>121</div>
                    <div>Properties</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>89</div>
                    <div>Managers</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>89</div>
                    <div>Connections Today</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>89</div>
                    <div>Locations</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>121</div>
                    <div>Properties</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>89</div>
                    <div>Managers</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>89</div>
                    <div>Connections Today</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>89</div>
                    <div>Locations</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>121</div>
                    <div>Properties</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>89</div>
                    <div>Managers</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>89</div>
                    <div>Connections Today</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>89</div>
                    <div>Locations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
