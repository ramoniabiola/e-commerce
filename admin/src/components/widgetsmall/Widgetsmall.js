import React, { useEffect, useState } from 'react'
import "./widgetsmall.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethod";
import { Link } from 'react-router-dom';

const Widgetsmall = () => {
  const [users, setUsers] = useState([]);


  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await userRequest.get("users/?new=true")
        setUsers(res.data);
      } catch (error) {
        console.log(error)
      }
    };
    getUsers();
  }, [])
  return (
    <div className='widgetSmall'>
      <span className="widgetSmallTitle">New Members</span>
      <ul className="widgetSmallList">
        {users.map(user => (
          <li className="widgetSmallListItem" key={user._id}>
            <img src={user.img || "https://th.bing.com/th/id/OIP.PwEh4SGekpMaWT2d5GWw0wHaHt?rs=1&pid=ImgDetMain"} alt="" className="widgetSmallImage" />
            <div className="widgetSmallUser">
              <span className="widgetSmallUsername">{user.username}</span>
            </div> 
            <Link className="widgetSmall-link" to={`/user/${user._id}`}>
              <button className='widgetSmallButton'>
                <Visibility className='widgetSmallIcon'/>
                View
              </button>
            </Link>  
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Widgetsmall;