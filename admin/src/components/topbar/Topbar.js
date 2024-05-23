import React from "react";
import "./topbar.css";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LanguageIcon from '@mui/icons-material/Language';
import SettingsIcon from '@mui/icons-material/Settings';
import {Link} from "react-router-dom";



const Topbar = () => {
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
         <img src="https://th.bing.com/th/id/R.064a17bab0f7d2a0f8d50e290cabc300?rik=tvO3cskOSIoniQ&pid=ImgRaw&r=0" alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  )
}

export default Topbar;