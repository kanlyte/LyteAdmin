import React, { useState } from "react";

/**
 * Defined
 */
import admin from "../../../app.config";
import { Logout } from "../../../Components/login/login";

import MenuIcon from "@material-ui/icons/Menu";
import "./topbar.css";

/**
 * assests
 */
import ProfileImage from "../../../assets/logos/plus_logo_color.png";

//material
import {
  Menu,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default () => {
  const [AnchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = React.useState(false);

  const handleOpenActions = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleCloseActions = () => {
    setAnchorEl(null);
  };

  const handleClickOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };
  return (
    <>
      <div className="topbar">
        <div className="topbar-ctr card">
          <div className="topbar-left-ctr">
            <input type="checkbox" hidden id="open_side_nav" />
            <label htmlFor="open_side_nav" className="open_side_nav">
              <MenuIcon fontSize="large" />
            </label>
            <div className="logo">Plus Seller</div>
          </div>
          <div className="topbar-right-ctr">
            <div className="topbar-icons">
              <div className="topbar-icon-wrapper">
                <img
                  src={ProfileImage}
                  height="36px"
                  width="36px"
                  style={{ borderRadius: "50%", cursor: "pointer" }}
                  alt="ADMIN"
                  aria-controls="profile-menu-opener"
                  aria-haspopup="true"
                  onClick={handleOpenActions}
                />
              </div>
              <div>
                <h3>Plus</h3>
                <span>Admin</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Menu
        id="profile-menu-opener"
        anchorEl={AnchorEl}
        keepMounted
        disableScrollLock={true}
        open={Boolean(AnchorEl)}
        onClose={handleCloseActions}
      >
        <MenuItem onClick={handleCloseActions}>
          <span style={{ fontSize: 24, marginRight: 10 }}>
            <i className="las la-user-alt"></i>
          </span>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClickOpenDialog}>
          <span style={{ fontSize: 24, marginRight: 10 }}>
            <i className="las la-sign-out-alt"></i>
          </span>
          Log out
        </MenuItem>
      </Menu>

      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Log Out</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Want to Log Out. Click 'Stay' to close, Log Out to Continue
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Stay
          </Button>
          <Button
            variant="contained"
            color="primary"
            autoFocus
            onClick={() => {
              Logout();
            }}
          >
            Log Out
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
