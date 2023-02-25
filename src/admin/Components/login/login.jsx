//styles
import "./login.css";
import "../../../Designs/main.css";

//assets
import LOGO from "../../../assets/logos/lyte.png";
import SellerImg from "../../../assets/sell.jpg";

//material
import { TextField, CircularProgress, Button } from "@material-ui/core";

//api
import FormsApi from "../../../api/api";

//dependences
import { useState } from "react";

function Login() {
  const [apiFeedBackError, setApiFeedBackError] = useState(false);
  const [submit, setSubmit] = useState(false);

  const form_submit = async (e) => {
    e.preventDefault();
    setSubmit(true);
    const fd = new FormData(e.target);
    let _fcontent = {};
    fd.forEach((value, key) => {
      _fcontent[key] = value;
    });
    let api = new FormsApi();
    let res = await api.post("/admin/sign_in", _fcontent);
    if (res === "Error") {
      setApiFeedBackError(true);
      setSubmit(false);
      return;
    }
    if (res.status === false) {
      setApiFeedBackError(true);
      setSubmit(false);
    } else {
      sessionStorage.setItem("token", "admin");
      setSubmit(false);
      window.location.reload();
    }
  };
  return (
    <div className="login_ctr">
      <div>
        <div className="form_ctr card">
          <form onSubmit={form_submit} className="login_form">
            <div className="login-logo-ctr">
              <img src={LOGO} alt="LYTE" />
            </div>
            <div className="login-inputs-ctr">
              <TextField
                error={apiFeedBackError}
                helperText={
                  apiFeedBackError
                    ? "Put in correct things boss If you think password is correct, then check your internet"
                    : ""
                }
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                fullWidth
                style={{ margin: "20px 0px" }}
              />
            </div>

            <div className="login-btn-ctr">
              <Button
                color="primary"
                variant={submit ? "outlined" : "contained"}
                type="submit"
                style={{ width: "100%" }}
              >
                <CircularProgress
                  size={15}
                  thickness={10}
                  style={{
                    display: submit ? "inline-block" : "none",
                    marginRight: "20px",
                  }}
                />
                {submit ? "Please Wait..." : "Submit"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
