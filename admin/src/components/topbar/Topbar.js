import React, { useState } from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";
import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material';
import { useLogout } from "../../redux/apiCalls";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useSelector} from "react-redux"



  
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



const Topbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { handleLogout } = useLogout();
  const [open, setOpen] = useState(false);
  const currentUser = useSelector((state) => state.user?.user?.currentUser);

  
  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);

  };

       
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  
  const handleClick = async () => {
    // invoke log-out action
    await handleLogout();
    setOpen(false);
  };



  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topleft">
        <Link className="logo-link" to="/"> 
          <span className="logo">
              Luxel<span>i</span>
          </span>
        </Link> 
        </div>
        <div className="topright">
          <div className="topbarIconContainer">
            <NotificationsNoneIcon />
            <span className="topIconBadge">2</span>
          </div>  
          <div className="topbarIconContainer">
            <LanguageIcon />
          </div>  
          <div className="topbarIconContainer">
            <SettingsIcon />
          </div>
          <div className="topAvatarContainer">
            <img
              src={currentUser.img || "https://th.bing.com/th/id/R.064a17bab0f7d2a0f8d50e290cabc300?rik=tvO3cskOSIoniQ&pid=ImgRaw&r=0"}
              alt="" 
              className="topAvatar"
            />
          </div>
          <div className="dropdown" onClick={handleDropdownToggle}>
            {!dropdownOpen ? 
              (<ArrowDropDownRounded style={{ marginTop: "12px", fontSize: "30px"}} />) :
              (<ArrowDropUpRounded style={{ marginTop: "12px", fontSize: "30px"}} />
            )}
            {dropdownOpen && (
              <div className="dropdownMenu">
                <span  className="dropdownItem">{currentUser.username}</span>
                <span  className="dropdownItem" onClick={handleClickOpen}>Logout</span>
              </div>
             )} 
         </div>
        </div>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        sx={{
             '& .MuiDialog-paper': {
              width: '450px', 
              maxWidth: 'none',
            },
        }}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        >
        <DialogTitle style={{color: "#64748b", fontSize: "18px"}}>{"EXIT CONFIRMATION"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description"  style={{color: "#1e293b"}}>
                {"Are you sure you want to Log out?"}
            </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>CANCEL</Button>
          <Button  onClick={handleClick}>LOG OUT</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default Topbar;