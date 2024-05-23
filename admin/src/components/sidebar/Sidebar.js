import React from 'react'
import "./sidebar.css";
import {
  AutoAwesomeMotionOutlined, BarChartOutlined, 
  HomeOutlined, MailOutline, MessageOutlined, Person2Outlined, Report, 
  StorefrontOutlined, Timeline, TrendingUp, WorkOutline
} from "@mui/icons-material";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNairaSign } from '@fortawesome/free-solid-svg-icons';


const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
          <Link className="sidebar-link" to="/">
              <li className="sidebarListItem active">
                <HomeOutlined className='sidebarIcons'/>
                Home
              </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className='sidebarIcons'/>
              Analytics
            </li>
            <li className="sidebarListItem">
              <TrendingUp className='sidebarIcons'/>
              Sales
            </li>
          </ul>
        </div>    
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link className="sidebar-link" to="/users">
              <li className="sidebarListItem">
                <Person2Outlined className='sidebarIcons'/>
                Users
              </li>
            </Link>
            <Link to="/products"  className="sidebar-link" >
             <li className="sidebarListItem">
               <StorefrontOutlined className='sidebarIcons'/>
               Products
             </li>
            </Link> 
            <li className="sidebarListItem">
              <span className='sidebarIcons naira'><FontAwesomeIcon icon={faNairaSign} /></span>
              Transactions
            </li>
            <li className="sidebarListItem">
              <BarChartOutlined className='sidebarIcons'/>
              Reports
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <MailOutline className='sidebarIcons'/>
              Mail
            </li>
            <li className="sidebarListItem">
              <AutoAwesomeMotionOutlined className='sidebarIcons'/>
              Feedback
            </li>
            <li className="sidebarListItem">
              <MessageOutlined className='sidebarIcons'/>
              Messages
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Staff</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <WorkOutline className='sidebarIcons'/>
              Manage
            </li>
            <li className="sidebarListItem">
              <Timeline className='sidebarIcons'/>
              Analytics
            </li>
            <li className="sidebarListItem">
              <Report className='sidebarIcons'/>
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;