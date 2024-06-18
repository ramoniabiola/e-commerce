import React, { useEffect, useState } from 'react'
import "./widgetsmall.css";
import { Visibility } from "@mui/icons-material";
import { userRequest } from "../../requestMethod";
import { Link } from 'react-router-dom';
import { PostAdd } from '@mui/icons-material';
import { CircularProgress, Typography } from '@mui/material';


const Widgetsmall = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)



  useEffect(() => {
    const getUsers = async () => {
      setIsLoading(true);
      setError(null)

      try {
        const response = await userRequest.get("users/?new=true");
        if(response.status >= 200 && response.status < 300){
          setUsers(response.data);
          setError(null)
          setIsLoading(false)
        }  else {
          // If the response status is not in the success range, handle the error
          throw new Error(response.data.error);
        }
      } catch (error) {
        setIsLoading(false)    
        setError("No Data...") 
      }
    };

    getUsers();
  }, [])


  return (
    <div className='widgetSmall'>
      <h3 className="widgetSmallTitle">New Members</h3>
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
        {isLoading && (
          <div className='LoadingContainer'>
            <CircularProgress  style={{ color: "#38bdf8", marginBottom: "12px" }} size={30}  />
            <Typography variant="h6" color="#9ca3af">Loading...</Typography>
          </div>
        )}
        {error && (
          <div className='NoDataContainer'>
            <PostAdd style={{ fontSize: 70, marginBottom: "10px", color: "#9ca3af" }} />
            <Typography variant="h6" color="#9ca3af">{error}</Typography>
          </div>
        )}
      </ul>
    </div>
  )
}

export default Widgetsmall;