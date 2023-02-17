import react, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 * components
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";

/**
 *
 * material
 */
import { Button } from "@material-ui/core";

/**
 * component styling
 */
import "./designs/home.css";

export default () => {
  const [state, setState] = useState({
    product_reqs: [],
    pending_orders: [],
    cleared_orders: [],
  });
  useEffect(() => {
    (async () => {
      const res = await new FormsApi().get("/orders/all");
      const reqs = await new FormsApi().get("/admin/product_requests");
      if (res !== "Error" && res.status) {
        if (reqs !== "Error" && reqs.status) {
          setState({
            ...state,
            product_reqs: reqs.result,
            pending_orders: res.result.filter(
              (el) => el.order_status === "pending"
            ),
            cleared_orders: res.result.filter(
              (el) => el.order_status !== "pending"
            ),
          });
        }
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
                    <div style={{ color: "#1A72E6" }}>121</div>
                    <div>Orders</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#0CA940" }}>
                    <i className="las la-users"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#8884D8" }}>89</div>
                    <div>Products</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#CC0000" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#0CA940" }}>89</div>
                    <div>Seller Score</div>
                  </div>
                </div>
                <div className="dashboard-card">
                  <span style={{ color: "#1A72E6" }}>
                    <i className="las la-user-tag"></i>
                  </span>
                  <div className="">
                    <div style={{ color: "#E0A70E" }}>89</div>
                    <div>Performance</div>
                  </div>
                </div>
              </div>
              <div className="dashboard-summury">
                <div style={{ padding: 10 }}>
                  <div
                    style={{
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>Plus Orders</span>
                    <Button variant="outlined" color="default">
                      Refresh
                    </Button>
                  </div>
                  <div className="pdts-grid-ctr trending">
                    <div>
                      <span>Pending Orders</span>
                      <table>
                        <thead>
                          <tr>
                            <th>Order No.</th>
                            <th>Urgent</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.pending_orders.length === 0 ? (
                            <tr>
                              <td>No Rows to display</td>
                            </tr>
                          ) : (
                            state.pending_orders.map((v, i) => {
                              let date = new Date(v.order_date);
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.order_urgent ? "true" : "false"}</td>
                                  <td>{`${date.getDate()}-${
                                    date.getMonth() + 1
                                  }-${date.getFullYear()}`}</td>
                                  <td>{`${date.getHours()}:${date.getMinutes()}`}</td>
                                  <td>
                                    <Link to={`/order/${v.id}`}>
                                      <Button
                                        variant="outlined"
                                        color="primary"
                                      >
                                        Go
                                      </Button>
                                    </Link>
                                  </td>
                                </tr>
                              );
                            })
                          )}
                        </tbody>
                      </table>
                    </div>
                    <div>
                      <span>Plus Orders</span>
                      <table>
                        <thead>
                          <tr>
                            <th>Order No.</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.cleared_orders.length === 0 ? (
                            <tr>
                              <td>No Rows to display</td>
                            </tr>
                          ) : (
                            state.cleared_orders.map((v, i) => {
                              let date = new Date(v.order_date);
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.order_status}</td>
                                  <td>{`${date.getDate()}-${
                                    date.getMonth() + 1
                                  }-${date.getFullYear()}`}</td>
                                  <td>{`${date.getHours()}:${date.getMinutes()}`}</td>
                                  <td>
                                    <Link to={`/order/${v.id}`}>
                                      <Button
                                        variant="outlined"
                                        color="primary"
                                      >
                                        Go
                                      </Button>
                                    </Link>
                                  </td>
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
              <div className="dashboard-summury">
                <div style={{ padding: 10 }}>
                  <div
                    style={{
                      marginBottom: 10,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <span style={{ fontSize: 18 }}>Plus Product Requests</span>
                    <Button variant="outlined" color="default">
                      Refresh
                    </Button>
                  </div>
                  <div className="trending">
                    <div>
                      <span>Requests Made</span>
                      <table className="full-width-table">
                        <thead>
                          <tr>
                            <th></th>
                            <th></th>
                            <th>Request</th>
                            <th>Description</th>
                            <th>User's Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.product_reqs.length === 0 ? (
                            <tr>
                              <td>No Requests for now...</td>
                            </tr>
                          ) : (
                            state.product_reqs.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>
                                    {v.request_img ? (
                                      <img
                                        src={v.request_img}
                                        height={75}
                                        width={75}
                                        style={{ borderRadius: 5 }}
                                      />
                                    ) : (
                                      "..."
                                    )}
                                  </td>
                                  <td>{v.request_name} </td>
                                  <td>{v.request_description || "..."}</td>
                                  <td>{v.user_name || "..."}</td>
                                  <td>{v.user_phone || "..."}</td>
                                  <td>{v.user_email || "..."}</td>
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
        </div>
      </div>
    </>
  );
};
