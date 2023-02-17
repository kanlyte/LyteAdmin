/**
 *
 * imports for react..
 */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

/**
 *
 * Defined components
 *
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";

/**
 *
 * imports for mateial ui
 */
import {
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  CircularProgress,
} from "@material-ui/core";

/**
 *
 * imports for css and other styling..
 */

import "./designs/products.css";
import "./designs/home.css";

/**
 *
 * creates alert from material ui
 */

const ClearOrder = () => {
  const navigate = useNavigate();
  const params = useParams();

  /**
   *
   * initial state for the component
   */

  const [state, setState] = useState({
    order: {},
    client: {},
    editing: false,
  });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/orders/order/${params.id}`);
      if (res !== "Error" && res.status !== false) {
        setState({
          ...state,
          order: res.result.order,
          client: res.result.user,
        });
      }
    })();
  }, []);

  /**
   *
   * fetch sub-categories for a selected category
   *
   *
   */

  /**
   *
   * Order Clearence
   */
  const clear_order = async (e) => {
    e.preventDefault();
    setState({
      ...state,
      editing: true,
      edit_message: "Please Wait...",
    });
    let form_contents = {};
    new FormData(e.target).forEach((el, i) => {
      form_contents[i] = el;
    });
    let res = new FormsApi().put(
      `/orders/order/edit/${params.id}`,
      form_contents
    );
    if (res !== "Error") {
      if (res.status !== false) {
        setTimeout(() => {
          setState({
            ...state,
            editing: false,
          });
          navigate("/");
        }, 1500);
      } else {
        setState({
          ...state,
          edit_message: "Failed, Server Error....",
        });
      }
    } else {
      setState({
        ...state,
        edit_message: "Failed, Check your connection...",
      });
    }
  };

  return (
    <>
      <TopBar />
      <div className="ctr">
        <div className="main">
          <div className="side-ctr card">
            <SideNav active="products" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>Order: {state.order.order_number || " ... "}</h2>
              </div>
              <div>
                <Link to="/">
                  <Button variant="outlined" color="primary">
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div className="pdts-form-ctr">
              <form
                onSubmit={clear_order}
                className="new_product_form pdts-grid-ctr"
              >
                <div className="inputs_ctr">
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Order Info.
                  </div>
                  <div className="inputs_ctr_border">
                    <div className="inputs_ctr_flex">
                      <input
                        type="hidden"
                        name="order_id"
                        value={state.order.id || " "}
                        onChange={() => {}}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Number"
                        style={{ width: "45%" }}
                        value={state.order.order_number || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Status"
                        style={{ width: "45%" }}
                        value={state.order.order_status || " "}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Date Of Order"
                        style={{ width: "45%" }}
                        value={
                          state.order.order_date
                            ? `${
                                new Date(state.order.order_date).getDay() + 1
                              }-${
                                new Date(state.order.order_date).getMonth() + 1
                              }-${new Date(
                                state.order.order_date
                              ).getFullYear()}`
                            : " "
                        }
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Time"
                        style={{ width: "45%" }}
                        value={
                          state.order.order_date
                            ? `${new Date(
                                state.order.order_date
                              ).getHours()}:${new Date(
                                state.order.order_date
                              ).getMinutes()}`
                            : " "
                        }
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Urgent"
                        style={{ width: "45%" }}
                        value={state.order.order_urgent ? "Yes" : "No"}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Paid"
                        style={{ width: "45%" }}
                        value={state.order.order_paid ? "Yes" : "No"}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Order Payment Method"
                        style={{ width: "45%" }}
                        value={
                          state.order.order_payment_method
                            ? state.order.order_payment_method === "mm"
                              ? "Mobile Money"
                              : "Cash on Delivery"
                            : " "
                        }
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Pick Up Station"
                        style={{ width: "45%" }}
                        value={state.order.order_pickup_station || " "}
                      />
                    </div>
                    <div className="inputs_ctr_flex">
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Client's Name"
                        style={{ width: "45%" }}
                        value={state.client.user_name || " "}
                      />
                      <TextField
                        variant="outlined"
                        color="primary"
                        helperText="Client's Phone"
                        style={{ width: "45%" }}
                        value={state.client.user_phone || " "}
                      />
                    </div>
                    <div className="inputs_ctr_halfwidth">
                      <TextField
                        variant="outlined"
                        color="primary"
                        style={{ width: "45%" }}
                        value={state.client.user_email || " "}
                      />
                    </div>
                  </div>
                </div>
                <div className="inputs_ctr">
                  <div style={{ marginBlock: 10, fontWeight: "bold" }}>
                    Products Ordered
                  </div>
                  <div>
                    <table>
                      <thead>
                        <tr>
                          <th>Img</th>
                          <th>Pdt</th>
                          <th>Qty</th>
                          <th>Seller</th>
                          <th>Contact</th>
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        {state.order.order_products ? (
                          JSON.parse(state.order.order_products).length ===
                          0 ? (
                            <tr>
                              <td>No Products on order</td>
                            </tr>
                          ) : (
                            JSON.parse(state.order.order_products).map(
                              (v, i) => {
                                return (
                                  <OrderProduct
                                    key={i}
                                    pdt={v.product}
                                    qty={v.qty}
                                  />
                                );
                              }
                            )
                          )
                        ) : (
                          <tr>
                            <td>No Products on order</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                    <div
                      style={{
                        marginTop: 20,
                      }}
                    >
                      <FormControl>
                        <RadioGroup
                          defaultValue="confirmed"
                          name="change_order_status"
                          row
                        >
                          <FormControlLabel
                            value="confirmed"
                            control={<Radio color="default" />}
                            label="Confirm Order"
                          />
                          <FormControlLabel
                            value="canceled"
                            control={<Radio color="default" />}
                            label="Cancel Order"
                          />
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        marginTop: 20,
                      }}
                    >
                      <Button
                        variant="outlined"
                        color="primary"
                        type="submit"
                        disabled={state.editing}
                      >
                        {state.edit_message ? state.edit_message : "Done"}
                      </Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClearOrder;

const OrderProduct = ({ pdt, qty }) => {
  const [state, setState] = useState({ product: {}, seller: {} });

  useEffect(() => {
    (async () => {
      let res = await new FormsApi().get(`/product/${pdt}`);

      if (res !== "Error") {
        if (res.status !== false) {
          setState({
            ...state,
            product: res.result.product || {},
            seller: res.result.seller || {},
          });
        }
      }
    })();
    return () => {
      setState({
        ...state,
        product: {},
        seller: {},
      });
    };
  }, []);
  return (
    <tr>
      <td>
        {state.product.product_images ? (
          <img
            src={JSON.parse(state.product.product_images)[0]}
            height={50}
            width={50}
          />
        ) : (
          " "
        )}
      </td>
      <td>{state.product.product_name}</td>
      <td>{qty}</td>
      <td>{state.seller.seller_name || " "}</td>
      <td>{state.seller.seller_phone || " "}</td>
      <td>
        <Link to={`/product/${pdt}`}>
          <Button variant="outlined" color="primary">
            Go
          </Button>
        </Link>
      </td>
    </tr>
  );
};
