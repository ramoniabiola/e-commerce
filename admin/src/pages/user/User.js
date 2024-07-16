import "./user.css";
import { 
  Add, CalendarTodayOutlined, LocationOnOutlined, MailOutline,
  PermIdentityOutlined, PhoneAndroidOutlined, Upload
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { Link, useLocation} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useUpdateUser } from '../../redux/apiCalls';
import { Alert, CircularProgress } from "@mui/material";
import Footer from "../../components/footer/Footer";




const User = () => {
  // STATES CONTROLLER
  const location = useLocation();
  const userId = location.pathname.split('/')[2];
  const user = useSelector((state) => state.user?.user?.users.find((user) => user._id === userId));
  const [inputs, setInputs] = useState({
    username: '',
    full_name: '',
    email: '',
    phone_no: '',
    address: '',  
  });
  const [file, setFile] = useState(null); // Separate file state
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { updateUser, error, loadingSpinner, success } = useUpdateUser()




  useEffect(() => {
    if (user) {
      setInputs({
        username: user.username || '',
        full_name: user.full_name || '',
        email: user.email || '',
        phone_no: user.phone_no || '',
        address: user.address || '',  
      });
    }
  }, [user]); // useEffect hook to update inputs when user data changes



  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }


  
  const handleClick = async (e) => {
    e.preventDefault();
  
  
    const updatedUser = {
      ...user,
      ...inputs,
    };
  
    const handleUploadCompletion = async (uploadTask) => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updatedUser.img = downloadURL;
      await updateUser(user._id, updatedUser, dispatch);
    };
  
    if (file) {
      // File selected, upload it
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Handle upload progress if needed
        },
        (error) => {
          console.log('Upload failed...');
          setErrorMessage('Upload failed'); // Display error message
        },
        () => {
          handleUploadCompletion(uploadTask);
        }
      );
    } else {
      // No file selected, update user without modifying the image
      await updateUser(user._id, updatedUser, dispatch);
    }
  };
    


  return (
    <div className="user">
      {loadingSpinner && (
        <div className="loading-spinner-overlay">
          <CircularProgress className="loading-spinner"  />
        </div>
      )}
      <div className="userTitleContainer">
        <h1 className="userTitle">Update User</h1>
        <Link className="user-Link" to="/newuser">
          <button className="userAddButton">
           <Add className="userAddButtonIcon" />
            create
          </button>
        </Link>
      </div>
      <div className="userContainer">
          <div className="userDisplay">
            <div className="userDisplayTop">
              <img
                src={ user.img ? user.img : "https://images.squarespace-cdn.com/content/v1/616855ce29e03d07eca7a169/1635364716434-7A1HG8LB7Q98R411TUON/Avatar+Logo+(1).png"}
                name="img"
                alt=""
                className="userDisplayImg"
              />
              <div className="userDisplayTopTitle">
                <span className="userDisplayUsername" name="full_name">{user.full_name}</span>
                <span className="userDisplayUserTitle" name="job" >{user.job}</span>
              </div>
            </div>
            <div className="userDisplayBottom">
              <span className="userDisplayTitle">Account Details</span>
              <div className="userDisplayInfo">
                <PermIdentityOutlined className="userDisplayIcon " />
                <span className="userDisplayInfoTitle" name="username">{user.username}</span>
              </div>
              <div className="userDisplayInfo">
                <CalendarTodayOutlined className="userDisplayIcon " />
                <span className="userDisplayInfoTitle" name="date_of_birth">{user.date_of_birth}</span>
              </div>
              <span className="userDisplayTitle">Contact Details</span>
              <div className="userDisplayInfo">
                <PhoneAndroidOutlined className="userDisplayIcon " />
                <span className="userDisplayInfoTitle" name="phone_no">{user.phone_no}</span>
              </div>
              <div className="userDisplayInfo">
                <MailOutline className="userDisplayIcon " />
                <span className="userDisplayInfoTitle" name="email">{user.email}</span>
              </div>
              <div className="userDisplayInfo">
                <LocationOnOutlined className="userDisplayIcon " />
                <span className="userDisplayInfoTitle" name="address">{user.address}</span>
              </div>
            </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit Your Profile</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username:</label>
                <input 
                 type="text"
                 name="username"
                 value={inputs.username} 
                 onChange={handleChange} 
                 className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name:</label>
                <input 
                 type="text"
                 name="full_name"
                 value={inputs.full_name} 
                 onChange={handleChange}
                 className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Email:</label>
                <input 
                 type="text"
                 name="email"
                 value={inputs.email}
                 onChange={handleChange} 
                 className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone:</label>
                <input  
                 type="text"
                 name="phone_no"
                 value={inputs.phone_no}
                 onChange={handleChange}
                 className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address:</label>
                <input 
                 type="text"
                 name="address"
                 value={inputs.address}
                 onChange={handleChange} 
                 className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  src={inputs.img || user.img || "https://images.squarespace-cdn.com/content/v1/616855ce29e03d07eca7a169/1635364716434-7A1HG8LB7Q98R411TUON/Avatar+Logo+(1).png"}
                  name="img"
                  alt=""
                  className="userUpdateImg"
                />
                <label htmlFor="file">
                  <Upload className="userUpdateIcon"/>
                </label>
                <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
              <button className="userUpdateButton"  onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
      <div className="userFooter">
        <Footer />
      </div> 
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          Update successful!
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {error}
        </Alert>
      )}
      {errorMessage && (
        <Alert severity="error" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          {errorMessage}
        </Alert>
      )}
    </div>
  )
}

export default User;

