//react
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/**
 * components
 *
 */
import { UploadSingle } from "../../api/files";
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
    categories: [],
    sub_categories: [],
    selected_category: "",
    active_category: "",
    active_sub_category: "",
    category_button_active: false,
    sub_category_button_active: false,
    mui: { snackBarPosition: { vertical: "top", horizontal: "right" } },
    temp_category: "",
    temp_sub_category: "",
  });

  //for selecting a category
  const changeSelectCategory = (event) => {
    setState({ ...state, selected_category: event.target.value });
  };

  //load sub-categories and categories
  useEffect(() => {
    (async () => {
      const categories = await new FormsApi().get("/category/all");
      const sub_categories = await new FormsApi().get("/sub-category/all");
      if (categories !== "Error" && sub_categories !== "Error") {
        if (categories.status !== false && sub_categories.status !== false) {
          setState({
            ...state,
            categories: categories.result,
            sub_categories: sub_categories.result,
          });
        }
      }
    })();
  }, []);

  //for category submit
  const form_category_submit = async (e) => {
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
    if (state.active_category) {
      contentObj["id"] = state.active_category.id;
      contentObj["edit"] = true;
    }
    if (state.category_image) contentObj["image_url"] = state.category_image;
    let formsApi = new FormsApi();
    let res = await formsApi.post("/category/new", contentObj);
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
            snackBarMessage: res.data,
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
            snackBarMessage: res.data,
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

  // for sub-category submit
  const form_sub_category_submit = async (e) => {
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
    if (state.active_sub_category) {
      contentObj["id"] = state.active_sub_category.sub_category_id;
      contentObj["edit"] = true;
    }
    if (state.sub_category_image)
      contentObj["image_url"] = state.sub_category_image;

    let formsApi = new FormsApi();
    let res = await formsApi.post("/sub-category/new", contentObj);
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
            snackBarMessage: res.data,
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
            snackBarMessage: "Sub Category Added",
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

  //deleting sub-category
  const handleDeleteListItem = async (e) => {};

  /**
   *
   *
   * updates the for images upload
   */
  const updateButton = (type, url) => {
    if (type === "category") {
      setState({
        ...state,
        category_button_active: true,
        category_image: url,
      });
    } else {
      setState({
        ...state,
        sub_category_button_active: true,
        sub_category_image: url,
      });
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
                <h2>Application Manager</h2>
              </div>
              <div>
                <Button variant="outlined" color="primary">
                  Actions
                </Button>
              </div>
            </div>
            <div className="app-manager-ctr">
              <div>
                <div className="manage-comp-ctr">
                  <h4 style={{ marginBlock: 5 }}>Plus Categories</h4>
                  <div className="manage-tbl-ctr">
                    <table>
                      <thead>
                        <tr>
                          <th>No.</th>
                          <th>Category Name</th>
                          <th>Ranked</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.categories.length === 0 ? (
                          <tr>
                            <td>...</td>
                          </tr>
                        ) : (
                          state.categories.map((v, i) => {
                            return (
                              <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{v.category_name}</td>
                                <td>{v.home_page_rank}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      setState({
                                        ...state,
                                        active_category: v,
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
                  <h4 style={{ marginBlock: 5 }}>Plus Sub. Categories</h4>
                  <div>
                    <div className="manage-tbl-ctr">
                      <table>
                        <thead>
                          <tr>
                            <th>No.</th>
                            <th>Category</th>
                            <th>Sub Category</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {state.sub_categories.length === 0 ? (
                            <tr>
                              <td>....</td>
                            </tr>
                          ) : (
                            state.sub_categories.map((v, i) => {
                              return (
                                <tr key={i}>
                                  <td>{i + 1}</td>
                                  <td>{v.category}</td>
                                  <td>{v.sub_category_name}</td>
                                  <td>
                                    <Button
                                      onClick={(e) => {
                                        setState({
                                          ...state,
                                          active_sub_category: v,
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
                  <div style={{ marginBlock: 10 }}>New Catergory</div>
                  <UploadSingle
                    type="category"
                    onSuccess={updateButton}
                    image_url={state.active_category.category_image || null}
                  />
                  <form
                    className="manage-comp-ctr-fields"
                    onSubmit={form_category_submit}
                  >
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Catergory Name"
                      name="category_name"
                      onChange={(e) => {
                        setState({
                          ...state,
                          active_category: state.active_category
                            ? {
                                ...state.active_category,
                                category_name: e.target.value,
                              }
                            : "",
                        });
                      }}
                      value={
                        state.active_category
                          ? state.active_category.category_name
                          : ""
                      }
                      required
                    />
                    <TextField
                      type="number"
                      variant="outlined"
                      color="primary"
                      label="Home Page Rank"
                      name="home_page_rank"
                      onChange={(e) => {
                        state.active_category
                          ? setState({
                              ...state,
                              active_category: {
                                ...state.active_category,
                                home_page_rank: e.target.value,
                              },
                            })
                          : setState({
                              ...state,
                              temp_category: e.target.value,
                            });
                      }}
                      value={
                        state.active_category
                          ? state.active_category.home_page_rank
                          : state.temp_category
                      }
                      required
                    />

                    <Button variant="outlined" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
                <div className="manage-comp-ctr">
                  <div style={{ marginBlock: 10 }}>New Sub. Category</div>
                  <UploadSingle
                    type="sub_category"
                    onSuccess={updateButton}
                    image_url={
                      state.active_sub_category.sub_category_image || null
                    }
                  />
                  <form
                    className="manage-comp-ctr-fields"
                    onSubmit={form_sub_category_submit}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="select-category-label">
                        Select Category
                      </InputLabel>
                      <Select
                        labelId="select-category-label"
                        value={state.selected_category}
                        label="Select Category"
                        onChange={changeSelectCategory}
                        name="category_id"
                        required
                      >
                        {state.categories.length === 0 ? (
                          <MenuItem value="">No Categories</MenuItem>
                        ) : (
                          state.categories.map((v, i) => (
                            <MenuItem key={i} value={v.id}>
                              {v.category_name}
                            </MenuItem>
                          ))
                        )}
                      </Select>
                    </FormControl>
                    <TextField
                      variant="outlined"
                      color="primary"
                      label="Sub Catergory Name"
                      name="sub_category_name"
                      required
                      onChange={(e) => {
                        state.active_sub_category
                          ? setState({
                              ...state,
                              active_sub_category: {
                                ...state.active_sub_category,
                                subcategory: e.target.value,
                              },
                            })
                          : setState({
                              ...state,
                              temp_sub_category: e.target.value,
                            });
                      }}
                      value={
                        state.active_sub_category
                          ? state.active_sub_category.subcategory
                          : state.temp_sub_category
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
