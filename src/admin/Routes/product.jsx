/**
 *
 * imports for react..
 */
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/**
 *
 * Defined components
 *
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";
import FileUpload from "../../api/files";
import { storage } from "../../api/firebase";

/**
 *
 * imports for mateial ui
 */
import { Button, TextField, Snackbar, IconButton } from "@material-ui/core";
import {
  Alert as MuiAlert,
  Slide,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";

/**
 *
 * imports for css and other styling..
 */

import "./designs/products.css";

/**
 *
 * creates alert from material ui
 */

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const ConfirmProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  /**
   *
   * initial state for the component
   */

  const [state, setState] = useState({
    product: {},
    seller: {},
    files: [],
    filesChanged: false,
    categories: [],
    sub_categories: [],
    selected_category: "",
    selected_sub_category: "",
    mui: {
      snackBarOpen: false,
      snackBarMessage: "",
      snackBarStatus: "info",
      snackBarPosition: { vertical: "top", horizontal: "right" },
    },
  });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/product/${params.id}`);
      const categories = await new FormsApi().get("/category/all");
      if (res !== "Error" && categories !== "Error") {
        if (res.status !== false && categories.status !== false) {
          setState({
            ...state,
            product: res.result.product || {},
            seller: res.result.seller || {},
            categories: categories.result,
          });
        }
      }
    })();

    return () => {
      setState({
        product: {},
        seller: {},
        files: [],
        filesChanged: false,
        categories: [],
        sub_categories: [],
        selected_category: "",
        selected_sub_category: "",
        mui: {
          snackBarOpen: false,
          snackBarMessage: "",
          snackBarStatus: "info",
          snackBarPosition: { vertical: "top", horizontal: "right" },
        },
      });
    };
  }, []);

  /**
   *
   * fetch sub-categories for a selected category
   *
   *
   */

  const changeSelectCategory = async (e) => {
    const sub_categories = await new FormsApi().get(
      `/category/${e.target.value}/sub_categories`
    );
    if (sub_categories !== "Error") {
      if (sub_categories.status !== false) {
        setState({
          ...state,
          selected_category: e.target.value,
          sub_categories: sub_categories.result,
        });
      }
    }
    // fetchSubCategories();
  };
  const changeSelectSubCategory = (e) => {
    setState({ ...state, selected_sub_category: e.target.value });
  };

  /**
   *
   * Product confirmation
   */
  const submitProduct = async (e) => {
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
    let form_contents = {};
    formDataInstance.forEach((el, i) => {
      form_contents[i] = el;
    });
    form_contents["confirmed"] = true;
    let res = await new FormsApi().put(
      `/product/edit/${params.id}`,
      form_contents
    );
    if (res !== "Error") {
      if (res.status !== false) {
        setState({
          ...state,
          mui: {
            ...state.mui,
            snackBarMessage: "Product Confirmed....",
            snackBarStatus: "success",
            snackBarOpen: true,
          },
        });
        setTimeout(() => {
          navigate("/products");
        }, 2000);
      } else {
        setState({
          ...state,
          mui: {
            ...state.mui,
            snackBarMessage: "Product Confirmation Failed, Server Error....",
            snackBarStatus: "warning",
            snackBarOpen: true,
          },
        });
      }
    } else {
      setState({
        ...state,
        mui: {
          ...state.mui,
          snackBarMessage:
            "Product Confirmation Failed, Check your internet....",
          snackBarStatus: "warning",
          snackBarOpen: true,
        },
      });
    }
  };

  /**
   *
   * Delete Prduct
   */
  const deleteProduct = async (e) => {
    setState({
      ...state,
      mui: {
        ...state.mui,
        snackBarMessage: "Deleting, You wait...  Stupid.",
        snackBarStatus: "info",
        snackBarOpen: true,
      },
    });

    /**
     * delete files loop
     */
    let fileUrls = state.product.product_images;
    let deleteFiles = false;

    /**
     * get file name
     */

    for (let i = 0; i < fileUrls.length; i++) {
      // let fileRef = storage.refFromURL(fileUrls[i]);
      // console.log(getFileName(fileUrls[i]));
      // fileRef
      //   .delete()
      //   .then(function () {
      //     if (i + 1 === fileUrls.length) {
      //       deleteFiles = true;
      //     }
      //   })
      //   .catch(function (error) {
      //     console.log("Error occurred:", error);
      //   });
    }

    // if (deleteFiles) {
    //   let res = await new FormsApi().delete(`/product/${params.id}`);
    //   if (res !== "Error") {
    //     if (res.status !== false) {
    //       setState({
    //         ...state,
    //         mui: {
    //           ...state.mui,
    //           snackBarMessage: "Product Deleted, Redirecting....",
    //           snackBarStatus: "success",
    //           snackBarOpen: true,
    //         },
    //       });
    //       setTimeout(() => {
    //         navigate("/products");
    //       }, 1500);
    //     } else {
    //       setState({
    //         ...state,
    //         mui: {
    //           ...state.mui,
    //           snackBarMessage: "Product Deletion Failed, Server Error....",
    //           snackBarStatus: "warning",
    //           snackBarOpen: true,
    //         },
    //       });
    //     }
    //   } else {
    //     setState({
    //       ...state,
    //       mui: {
    //         ...state.mui,
    //         snackBarMessage: "Product Deletion Failed, Check your internet....",
    //         snackBarStatus: "warning",
    //         snackBarOpen: true,
    //       },
    //     });
    //   }
    // }
  };

  //mui
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setState({
      ...state,
      mui: { ...state.mui, snackBarMessage: "", snackBarOpen: false },
    });
  };

  return (
    <>
      <Snackbar
        open={state.mui.snackBarOpen}
        anchorOrigin={state.mui.snackBarPosition}
        autoHideDuration={5000}
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
            <SideNav active="products" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>Update Product</h2>
              </div>
              <div>
                <Link to="/products">
                  <Button variant="outlined" color="primary">
                    Back
                  </Button>
                </Link>
                {/* <Button
                  variant="outlined"
                  color="secondary"
                  style={{ marginLeft: 20 }}
                  onClick={deleteProduct}
                >
                  Delete Product
                </Button> */}
              </div>
            </div>
            <div className="pdts-form-ctr">
              <form onSubmit={submitProduct} className="new_product_form">
                <div className="inputs_ctr">
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Product Information
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="inputs_ctr_flex">
                      <input
                        type="hidden"
                        name="product_id"
                        value={state.product.id || " "}
                        onChange={() => {}}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Name"
                        name="product_name"
                        style={{ width: "45%" }}
                        value={state.product.product_name || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_name: e.target.value,
                            },
                          });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Price"
                        name="product_price"
                        style={{ width: "45%" }}
                        value={state.product.product_price || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_price: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Description"
                        name="product_description"
                        style={{ width: "100%" }}
                        value={state.product.product_description || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_description: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Discount"
                        name="product_discount"
                        style={{ width: "45%" }}
                        value={state.product.product_discount || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_discount: e.target.value,
                            },
                          });
                        }}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Brand"
                        name="product_brand"
                        style={{ width: "45%" }}
                        value={state.product.product_brand || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_brand: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Product Details"
                        multiline
                        name="product_details"
                        style={{ width: "100%" }}
                        value={state.product.product_details || " "}
                        onChange={(e) => {
                          setState({
                            ...state,
                            product: {
                              ...state.product,
                              product_details: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <FormControl style={{ width: "45%" }}>
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
                      <FormControl style={{ width: "45%" }}>
                        <InputLabel id="select-sub-category-label">
                          {state.sub_categories.length === 0
                            ? "Select Category"
                            : "Select Sub Category"}
                        </InputLabel>
                        <Select
                          labelId="select-sub-category-label"
                          value={state.selected_sub_category}
                          label="Select Category"
                          onChange={changeSelectSubCategory}
                          name="sub_category_id"
                          required
                        >
                          {state.sub_categories.length === 0 ? (
                            <MenuItem value="">
                              Failed to Fetch Subcategories
                            </MenuItem>
                          ) : (
                            state.sub_categories.map((v, i) => (
                              <MenuItem key={i} value={v.id}>
                                {v.sub_category_name}
                              </MenuItem>
                            ))
                          )}
                        </Select>
                      </FormControl>
                    </div>
                    <div className="inputs_ctr_halfwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        label="Shipping Fee"
                        name="product_shipping_fee"
                        required
                        type="number"
                        style={{ width: "45%" }}
                      />
                    </div>
                  </div>
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Seller Info
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Seller Name"
                        name="seller_name"
                        style={{ width: "45%" }}
                        value={state.seller.seller_name || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Location"
                        name="seller_location"
                        style={{ width: "45%" }}
                        value={state.seller.seller_location || " "}
                      />
                    </div>
                    <div className="inputs_ctr_fullwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Business Name"
                        name="seller_business_name"
                        style={{ width: "100%" }}
                        value={state.seller.seller_business_name || " "}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Email Address"
                        name="seller_email"
                        style={{ width: "45%" }}
                        value={state.seller.seller_email || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Phone Number"
                        name="seller_phone"
                        style={{ width: "45%" }}
                        value={state.seller.seller_phone || " "}
                      />
                    </div>
                  </div>
                </div>
                <div className="inputs_ctr">
                  {state.filesChanged ? (
                    <FileUpload product={params.id} confirming={true} />
                  ) : (
                    <>
                      <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                        Product Images
                      </div>
                      <div className="inputs_ctr_border">
                        <div className="new_pdt_btn_refs_ctr">
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() =>
                              setState({ ...state, filesChanged: true })
                            }
                          >
                            Change Images
                          </Button>
                        </div>

                        <div className="images__preview_ctr">
                          {state.product.product_images
                            ? JSON.parse(state.product.product_images)
                                .length === 0
                              ? "No Files Chosen"
                              : JSON.parse(state.product.product_images).map(
                                  (v, i) => {
                                    return (
                                      <div key={i}>
                                        <img src={v} alt="PlusProductImage" />
                                      </div>
                                    );
                                  }
                                )
                            : "No Product Images"}
                        </div>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          marginTop: 20,
                        }}
                      >
                        <Button
                          variant="outlined"
                          color="primary"
                          type="submit"
                        >
                          Submit Product
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmProduct;
