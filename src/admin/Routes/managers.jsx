//react
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * components
 *
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";

//material
import { Button, TextField, Snackbar, IconButton } from "@material-ui/core";
import { Alert as MuiAlert, Slide, Checkbox } from "@mui/material";

//styling
import "./designs/products.css";
import "./designs/app_manager.css";

export default () => {
  const [state, setState] = useState({
    managers: [],
    search_pattern: "",
    show_not_confirmed: true,
    mui: { snackBarPosition: { vertical: "top", horizontal: "right" } },
  });

  /**
   * load managers to state
   */
  useEffect(() => {
    (async () => {
      const managers = await new FormsApi().get("/auth/manager/all");
      if (managers !== "Error") {
        if (managers.status) {
          setState({
            ...state,
            managers: managers.result,
          });
        }
      }
    })();
  }, []);

  //mui
  //close snackBar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      mui: { ...state.mui, snackBarMessage: "", snackBarOpen: false },
    });
  };

  //alert for material ui
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  return (
    <>
      <Snackbar
        open={state.mui.snackBarOpen}
        anchorOrigin={state.mui.snackBarPosition}
        autoHideDuration={4500}
        onClose={handleClose}
        message={state.mui.snackBarMessage}
        TransitionComponent={(props) => <Slide {...props} direction="down" />}
      >
        <Alert
          onClose={handleClose}
          severity={state.mui.snackBarStatus}
          sx={{ width: "100%" }}
        >
          {state.mui.snackBarMessage}
        </Alert>
      </Snackbar>

      <TopBar />
      <div className="ctr">
        <div className="main">
          <div className="side-ctr card">
            <SideNav active="managers" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>Registered Managers</h2>
              </div>
              <div>
                <Link to="/">
                  <Button variant="outlined" color="primary">
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div className="app-manager-ctr">
              <div>
                <div className="manage-comp-ctr">
                  <div
                    style={{
                      marginBlock: 5,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextField
                      placeholder="Search Managers Here..."
                      type="search"
                      variant="outlined"
                      style={{ width: "300px" }}
                      onChange={(e) => {
                        setState({
                          ...state,
                          search_pattern: e.target.value,
                        });
                      }}
                    />

                    <div>
                      <Checkbox
                        title="Showing Not Confirmed Only"
                        checked={state.show_not_confirmed}
                        onChange={() => {
                          setState({
                            ...state,
                            show_not_confirmed: !state.show_not_confirmed,
                          });
                        }}
                      />
                      <span>Showing Not Confirmed Only</span>
                    </div>
                  </div>
                  <div className="manage-tbl-ctr">
                    <table>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th>Phone Number</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.managers.length === 0 ? (
                          <tr>
                            <td>...</td>
                          </tr>
                        ) : state.show_not_confirmed && state.search_pattern ? (
                          state.managers
                            .filter((el) =>
                              el.manager_name
                                .toLowerCase()
                                .includes(state.search_pattern.toLowerCase())
                            )
                            .filter((el) => !el.confirmed)
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.manager_name}</td>
                                  <td>{v.phone_number}</td>
                                  <td>
                                    <Button
                                      variant="contained"
                                      color={
                                        v.confirmed ? "primary" : "secondary"
                                      }
                                      onClick={async () => {
                                        if (v.confirmed) {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        } else {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}?auth=$admin123*`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        }
                                      }}
                                    >
                                      {v.confirmed ? "Confirmed" : "Confirm"}
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                        ) : state.search_pattern ? (
                          state.managers
                            .filter((el) =>
                              el.manager_name
                                .toLowerCase()
                                .includes(state.search_pattern.toLowerCase())
                            )
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.manager_name}</td>
                                  <td>{v.phone_number}</td>
                                  <td>
                                    <Button
                                      variant="contained"
                                      color={
                                        v.confirmed ? "primary" : "secondary"
                                      }
                                      onClick={async () => {
                                        if (v.confirmed) {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        } else {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}?auth=$admin123*`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        }
                                      }}
                                    >
                                      {v.confirmed ? "Confirmed" : "Confirm"}
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                        ) : state.show_not_confirmed ? (
                          state.managers
                            .filter((el) => !el.confirmed)
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.manager_name}</td>
                                  <td>{v.phone_number}</td>
                                  <td>
                                    <Button
                                      variant="contained"
                                      color={
                                        v.confirmed ? "primary" : "secondary"
                                      }
                                      onClick={async () => {
                                        if (v.confirmed) {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        } else {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Please Wait....",
                                              snackBarStatus: "info",
                                              snackBarOpen: true,
                                            },
                                          });
                                          let formsApi = new FormsApi();
                                          let res = await formsApi.put(
                                            `/auth/manager/edit/${v._id}?auth=$admin123*`
                                          );
                                          if (res === "Error") {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Network error",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            if (res.status === false) {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage:
                                                    "Some Error Papa",
                                                  snackBarStatus: "warning",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            } else {
                                              setState({
                                                ...state,
                                                mui: {
                                                  ...state.mui,
                                                  snackBarMessage: "Done",
                                                  snackBarStatus: "success",
                                                  snackBarOpen: true,
                                                },
                                              });
                                              setTimeout(() => {
                                                window.location.reload();
                                              }, 2000);
                                            }
                                          }
                                        }
                                      }}
                                    >
                                      {v.confirmed ? "Confirmed" : "Confirm"}
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          state.managers.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{v.manager_name}</td>
                                <td>{v.phone_number}</td>
                                <td>
                                  <Button
                                    variant="contained"
                                    color={
                                      v.confirmed ? "primary" : "secondary"
                                    }
                                    onClick={async () => {
                                      if (v.confirmed) {
                                        setState({
                                          ...state,
                                          mui: {
                                            ...state.mui,
                                            snackBarMessage: "Please Wait....",
                                            snackBarStatus: "info",
                                            snackBarOpen: true,
                                          },
                                        });
                                        let formsApi = new FormsApi();
                                        let res = await formsApi.put(
                                          `/auth/manager/edit/${v._id}`
                                        );
                                        if (res === "Error") {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Some Network error",
                                              snackBarStatus: "warning",
                                              snackBarOpen: true,
                                            },
                                          });
                                          setTimeout(() => {
                                            window.location.reload();
                                          }, 2000);
                                        } else {
                                          if (res.status === false) {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Error Papa",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage: "Done",
                                                snackBarStatus: "success",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          }
                                        }
                                      } else {
                                        setState({
                                          ...state,
                                          mui: {
                                            ...state.mui,
                                            snackBarMessage: "Please Wait....",
                                            snackBarStatus: "info",
                                            snackBarOpen: true,
                                          },
                                        });
                                        let formsApi = new FormsApi();
                                        let res = await formsApi.put(
                                          `/auth/manager/edit/${v._id}?auth=$admin123*`
                                        );
                                        if (res === "Error") {
                                          setState({
                                            ...state,
                                            mui: {
                                              ...state.mui,
                                              snackBarMessage:
                                                "Some Network error",
                                              snackBarStatus: "warning",
                                              snackBarOpen: true,
                                            },
                                          });
                                          setTimeout(() => {
                                            window.location.reload();
                                          }, 2000);
                                        } else {
                                          if (res.status === false) {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage:
                                                  "Some Error Papa",
                                                snackBarStatus: "warning",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          } else {
                                            setState({
                                              ...state,
                                              mui: {
                                                ...state.mui,
                                                snackBarMessage: "Done",
                                                snackBarStatus: "success",
                                                snackBarOpen: true,
                                              },
                                            });
                                            setTimeout(() => {
                                              window.location.reload();
                                            }, 2000);
                                          }
                                        }
                                      }
                                    }}
                                  >
                                    {v.confirmed ? "Confirmed" : "Confirm"}
                                  </Button>
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
          </div>
        </div>
      </div>
    </>
  );
};
