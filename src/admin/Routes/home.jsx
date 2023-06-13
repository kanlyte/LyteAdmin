import react, { useEffect, useState } from "react";

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
  const [state, setState] = useState({
    app_data: {},
    new_locations_coll: [],
    issues: [],
  });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get("/admin/appdata");
      if (res !== "Error" && res.status) {
        setState({
          ...state,
          app_data: res.result,
          issues: res.result.issues,
          new_locations_coll: res.result.new_locations_coll,
        });
      }
    })();
  }, []);

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
                    <div style={{ color: "#1A72E6" }}>
                      {state.app_data.properties || "..."}
                    </div>
                    <div>Properties</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>
                      {state.app_data.managers || "..."}
                    </div>
                    <div>Managers</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>
                      {state.app_data.interactions || "..."}
                    </div>
                    <div>Interactions</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>
                      {state.app_data.property_views || "..."}
                    </div>
                    <div>Property Views</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-cards">
                <div className="dashboard-card">
                  <span style={{ color: "#E0A70E" }}>
                    <i className="las la-shipping-fast"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#1A72E6" }}>
                      {state.app_data.districts || "..."}
                    </div>
                    <div>Districts</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>
                      {state.app_data.locations || "..."}
                    </div>
                    <div>Locations</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>
                      {state.app_data.pending_confirmation || "..."}
                    </div>
                    <div>Not Confirmed</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>
                      {state.issues.length}
                    </div>
                    <div>Issues</div>
                  </div>
                </div>
              </div>
              <div className="manage-comp-ctr">
                <h4 style={{ marginBlock: 5 }}>New Locations</h4>
                <div className="manage-tbl-ctr">
                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>District</th>
                        <th>Location</th>
                        <th>Manager Name</th>
                        <th>Manager Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.new_locations_coll.length === 0 ? (
                        <tr>
                          <td>...</td>
                        </tr>
                      ) : (
                        state.new_locations_coll.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{v.district}</td>
                              <td>{v.location}</td>
                              <td>{v.manager_name}</td>
                              <td>{v.phone_number}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="manage-comp-ctr">
                <h4 style={{ marginBlock: 5 }}>Issues</h4>
                <div className="manage-tbl-ctr">
                  <table>
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Issue Message</th>
                        <th>Contact</th>
                      </tr>
                    </thead>
                    <tbody>
                      {state.issues.length === 0 ? (
                        <tr>
                          <td>...</td>
                        </tr>
                      ) : (
                        state.issues.map((v, i) => {
                          return (
                            <tr key={i}>
                              <td>{i + 1}</td>
                              <td>{v.report_issue}</td>
                              <td>{v.contact || "..."}</td>
                              <td></td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
