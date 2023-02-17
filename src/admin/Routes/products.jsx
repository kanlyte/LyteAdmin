/**
 *
 * imports for react
 */
import react, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

/***
 *Imports for Defined components
 */
import TopBar from "../Components/Topbar/topbar";
import SideNav from "../Components/sidebar/sidebar";
import FormsApi from "../../api/api";

/**
 *
 * imports for material ui
 */
import { Button } from "@material-ui/core";

/**
 *
 * imports for css and other styling..
 */

import "./designs/products.css";
import "../../Designs/tablegrid.css";

export default () => {
  /**
   * initial state
   */
  const [state, setState] = useState({ pending_pdts: [], all_pdts: [] });
  useEffect(() => {
    (async () => {
      const res = await new FormsApi().get("/product/all");

      if (res === "Error") {
        console.log(res);
      } else {
        if (res.status) {
          let pending_pdts = [];
          let all_pdts = [];
          res.result.forEach((el) => {
            if (el.confirmed) {
              all_pdts.push(el);
            } else {
              pending_pdts.push(el);
            }
          });
          setState({ ...state, pending_pdts, all_pdts });
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
            <SideNav active="products" />
          </div>
          <div className="main-ctr card">
            <div className="pdts-header-btns">
              <div>
                <h2>Plus Products</h2>
              </div>
              <div>
                <Link to="/">
                  <Button
                    variant="outlined"
                    color="primary"
                    style={{ marginInline: 10 }}
                  >
                    Back
                  </Button>
                </Link>
              </div>
            </div>
            <div className="pdts-grid-ctr trending">
              <div>
                <span>
                  Pending Confirmation
                  {`(${state.pending_pdts.length})`}
                </span>
                <table>
                  <thead>
                    <tr>
                      <th>Pdt Name</th>
                      <th>Pdt Price</th>
                      <th>Pdt Discount</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.pending_pdts.length === 0 ? (
                      <tr>
                        <td>No Rows to display</td>
                      </tr>
                    ) : (
                      state.pending_pdts.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.product_name}</td>
                            <td>{v.product_price}</td>
                            <td>{v.product_discount}</td>
                            <td>{v.product_brand}</td>
                            <td>
                              <Link to={`/product/${v.id}`}>
                                <Button variant="outlined" color="primary">
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
                <span>Plus Products {`(${state.all_pdts.length})`}</span>
                <table>
                  <thead>
                    <tr>
                      <th>Pdt Name</th>
                      <th>Pdt Price</th>
                      <th>Pdt Discount</th>
                      <th>Brand</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {state.all_pdts.length === 0 ? (
                      <tr>
                        <td>No Rows to display</td>
                      </tr>
                    ) : (
                      state.all_pdts.map((v, i) => {
                        return (
                          <tr key={i}>
                            <td>{v.product_name}</td>
                            <td>{v.product_price}</td>
                            <td>{v.product_discount}</td>
                            <td>{v.product_brand}</td>
                            <td>
                              <Link to={`/product/${v.id}`}>
                                <Button variant="outlined" color="primary">
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
      </div>
    </>
  );
};
