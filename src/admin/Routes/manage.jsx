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
import { Close } from "@material-ui/icons";
import {
  Alert as MuiAlert,
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

//styling
import "./designs/products.css";
import "./designs/app_manager.css";

export default () => {
  const [state, setState] = useState({
    districts: [],
    locations: [],
    location_query: "",
    district_query: "",
    selected_district: "",
    active_district: "",
    active_location: "",
    mui: { snackBarPosition: { vertical: "top", horizontal: "right" } },
    temp_district: "",
    temp_location: "",
    temp_district_filter_locations: "",
  });

  //for selecting a district
  const changeSelectDistrict = (event) => {
    setState({ ...state, selected_district: event.target.value });
  };
  //for selecting a district to filter locations
  const changeSelectDistrictFilterLocatons = (event) => {
    setState({
      ...state,
      temp_district_filter_locations: event.target.value,
    });
  };

  //load locations and districts
  useEffect(() => {
    (async () => {
      const districts = await new FormsApi().get("/admin/district/all");
      const locations = await new FormsApi().get("/admin/location/all");
      if (districts !== "Error" && locations !== "Error") {
        if (districts.status !== false && locations.status !== false) {
          setState({
            ...state,
            districts: districts.result,
            locations: locations.result,
          });
        }
      }
    })();
  }, []);

  //for district submit
  const form_district_submit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "Please Wait....",
        snackBarStatus: "info",
        snackBarOpen: true,
      },
    });
    let formDataInstance = new FormData(e.target);
    let contentObj = {};
    formDataInstance.forEach((v, i) => {
      contentObj[i] = v;
    });
    if (state.active_district) {
      contentObj["_id"] = state.active_district._id;
      contentObj["edit"] = true;
    }
    let formsApi = new FormsApi();
    let res = await formsApi.post("/admin/district/new", contentObj);
    if (res === "Error") {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: "Some Network error",
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
            snackBarMessage: "Some Error Papa",
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
  };

  // form location submit
  const form_location_submit = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "Please Wait....",
        snackBarStatus: "info",
        snackBarOpen: true,
      },
    });
    let formDataInstance = new FormData(e.target);
    let contentObj = {};
    formDataInstance.forEach((v, i) => {
      contentObj[i] = v;
    });
    if (state.active_location) {
      contentObj["_id"] = state.active_location._id;
      contentObj["edit"] = true;
    }
    let formsApi = new FormsApi();
    let res = await formsApi.post("/admin/location/new", contentObj);
    if (res === "Error") {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage: "Some Network error",
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
            snackBarMessage: "Some Error papa",
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
  };

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
            <SideNav active="manage" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>Districts &amp; Locations</h2>
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
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <h4 style={{ marginBlock: 5 }}>Districts</h4>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Search Districts Here"
                      name="district_query"
                      onChange={(e) => {
                        setState({ ...state, district_query: e.target.value });
                      }}
                    />
                  </div>
                  <div className="manage-tbl-ctr">
                    <table>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Name</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.districts.length === 0 ? (
                          <tr>
                            <td>...</td>
                          </tr>
                        ) : state.district_query ? (
                          state.districts
                            .filter((el) =>
                              el.district_name
                                .toLowerCase()
                                .includes(state.district_query.toLowerCase())
                            )
                            .slice(0, 10)
                            .map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.district_name}</td>
                                  <td>
                                    <Button
                                      onClick={() => {
                                        setState({
                                          ...state,
                                          active_district: v,
                                        });
                                      }}
                                    >
                                      Edit
                                    </Button>
                                  </td>
                                </tr>
                              );
                            })
                        ) : (
                          state.districts.slice(0, 30).map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{v.district_name}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      setState({
                                        ...state,
                                        active_district: v,
                                      });
                                    }}
                                  >
                                    Edit
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
                <div className="manage-comp-ctr">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    {/* <h4 style={{ marginBlock: 5 }}>Locations</h4> */}
                    <FormControl style={{ width: "200px" }}>
                      <InputLabel id="select-district-locations-label">
                        Select a District
                      </InputLabel>
                      <Select
                        labelId="select-district-locations-label"
                        value={state.temp_district_filter_locations}
                        label="Select a District"
                        onChange={changeSelectDistrictFilterLocatons}
                      >
                        {state.districts.length === 0 ? (
                          <MenuItem value="">No Districts</MenuItem>
                        ) : (
                          state.districts.map((v, i) => (
                            <MenuItem key={i} value={v.district_name}>
                              {v.district_name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Search Locations Here"
                      name="location_query"
                      onChange={(e) => {
                        setState({
                          ...state,
                          location_query: e.target.value,
                        });
                      }}
                    />
                  </div>
                  <div>
                    <div className="manage-tbl-ctr">
                      <table>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>District</th>
                            <th>Location</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.locations.length === 0 ? (
                            <tr>
                              <td>....</td>
                            </tr>
                          ) : !state.temp_district_filter_locations ? (
                            <tr>
                              <td>...</td>
                            </tr>
                          ) : state.location_query ? (
                            state.locations
                              .filter((el) =>
                                el.location_name
                                  .toLowerCase()
                                  .includes(state.location_query.toLowerCase())
                              )
                              .slice(0, 30)
                              .filter(
                                (v) =>
                                  v.district_name ==
                                  state.temp_district_filter_locations
                              )
                              .map((v, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{v.district_name}</td>
                                    <td>{v.location_name}</td>
                                    <td>
                                      <Button
                                        onClick={(e) => {
                                          setState({
                                            ...state,
                                            active_location: v,
                                            selected_district: v.district_name,
                                          });
                                        }}
                                      >
                                        Edit
                                      </Button>
                                    </td>
                                  </tr>
                                );
                              })
                          ) : (
                            state.locations
                              .slice(0, 25)
                              .filter(
                                (v) =>
                                  v.district_name ==
                                  state.temp_district_filter_locations
                              )
                              .map((v, i) => {
                                return (
                                  <tr key={i}>
                                    <td>{i + 1}</td>
                                    <td>{v.district_name}</td>
                                    <td>{v.location_name}</td>
                                    <td>
                                      <Button
                                        onClick={(e) => {
                                          setState({
                                            ...state,
                                            active_location: v,
                                            selected_district: v.district_name,
                                          });
                                        }}
                                      >
                                        Edit
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
              <div>
                <div className="manage-comp-ctr">
                  <div style={{ marginBlock: 10 }}>New District</div>
                  <form
                    className="manage-comp-ctr-fields"
                    onSubmit={form_district_submit}
                  >
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="District Name"
                      name="district_name"
                      onChange={(e) => {
                        if (state.active_district) {
                          setState({
                            ...state,
                            active_district: {
                              ...state.active_district,
                              district_name: e.target.value,
                            },
                          });
                        } else {
                          setState({
                            ...state,
                            temp_district: e.target.value,
                          });
                        }
                      }}
                      value={
                        state.active_district
                          ? state.active_district.district_name
                          : state.temp_district
                      }
                      required
                    />

                    <Button variant="outlined" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
                <div className="manage-comp-ctr">
                  <div style={{ marginBlock: 10 }}>New Location</div>

                  <form
                    className="manage-comp-ctr-fields"
                    onSubmit={form_location_submit}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="select-district-label">
                        Select District
                      </InputLabel>
                      <Select
                        labelId="select-district-label"
                        value={state.selected_district}
                        label="Select District"
                        onChange={changeSelectDistrict}
                        name="district_name"
                        required
                      >
                        {state.districts.length === 0 ? (
                          <MenuItem value="">No Districts</MenuItem>
                        ) : (
                          state.districts.map((v, i) => (
                            <MenuItem key={i} value={v.district_name}>
                              {v.district_name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Location Name"
                      name="location_name"
                      required
                      onChange={(e) => {
                        if (state.active_location) {
                          setState({
                            ...state,
                            active_location: {
                              ...state.active_location,
                              location_name: e.target.value,
                            },
                          });
                        } else {
                          setState({
                            ...state,
                            temp_location: e.target.value,
                          });
                        }
                      }}
                      value={
                        state.active_location
                          ? state.active_location.location_name
                          : state.temp_location
                      }
                    />

                    <Button variant="outlined" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
