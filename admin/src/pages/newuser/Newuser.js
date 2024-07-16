import "./newuser.css";
import app from "../../firebase";
import { useState } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  useAddUser } from "../../redux/apiCalls.js";
import { useDispatch } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import Footer from '../../components/footer/Footer.js'




const Newuser = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)
  const dispatch = useDispatch();
  const { addUser, error, success, loadingSpinner } = useAddUser();
  


  const handleChange = (e) => {
    const { name, value, type } = e.target;

     // Handle radio inputs separately
    if (type === "radio") {
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    } else {
      // For other input types like select and text input
      setInputs((prev) => ({
        ...prev,
        [name]: value
      }));
    }
  }




  const handleClick = (e) => {
    e.preventDefault();

    // Check if any required fields are empty
    const requiredFields = ["username", "full_name", "job", "date_of_birth", "email", "password", "phone_no", "address"];
    const emptyFields = requiredFields.filter(field => !inputs[field]);

    if (emptyFields.length > 0) {
     setErrorMessage("Fill all fields");
      return;
    }

    setErrorMessage(null)
  

    // Add user
    const addUserAndHandleResult = async (user) => {
    
      await addUser(user, dispatch);
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
          console.log("Upload failed...");
          setErrorMessage("Upload failed"); // Display error message
        },
        async () => { 
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          const user = { ...inputs, img: downloadURL };
          addUserAndHandleResult(user);
          setErrorMessage(null)
        }
      );
    } else {
      // No file selected, add user without image
      const user = { ...inputs };
      addUserAndHandleResult(user);
      setErrorMessage(null)
    }
  };




  return (
    <div className="newUser">
      {loadingSpinner && (
        <div className="loading-spinner-overlay">
          <CircularProgress className="loading-spinner"  />
        </div>
      )}
      <h1 className="newUserTitle">New User</h1>
      <form className="newUserForm">
           <div className="newUserFormItem">
            <label>Username</label>
            <input type="text" name="username" placeholder="olalekan" onChange={handleChange} />
          </div>
          <div className="newUserFormItem">
            <label>Full Name</label>
            <input type="text" name="full_name" placeholder ="ramoni olalekan" onChange={handleChange} />
          </div>
          <div className="newUserFormItem">
            <label>Job Description</label>
            <input type="text" name="job"  placeholder="Software Engr. " onChange={handleChange} />
         </div>
          <div className="newUserFormItem">
            <label>Date of Birth (MM-DD-YYYY)</label>
            <input type="date" id="dob" name="date_of_birth" className="error" pattern="\d{2}-\d{2}-\d{4}" placeholder="MM-DD-YYYY" onChange={handleChange} />
          </div> 
          <div className="newUserFormItem">
            <label>Email</label>
            <input type="text" name="email" placeholder="rolalekan172@yahoo.com" onChange={handleChange} />
         </div>
         <div className="newUserFormItem">
            <label>Password</label>
            <input type="password" name="password"  placeholder="*********" onChange={handleChange} />
         </div>    
         <div className="newUserFormItem">
            <label>Phone</label>
            <input type="text" name="phone_no"  placeholder="+234-8080-117-388" onChange={handleChange}/>
         </div>
         <div className="newUserFormItem">
            <label>Image</label>
            <input  type="file" name="img"  id="file" onChange={(e) => setFile(e.target.files[0])} />
         </div>
         <div className="newUserFormItem">
            <label>Address</label>
            <input type="text" name="address" placeholder="Abeokuta, Ogun State." onChange={handleChange}/>
         </div>
         <div className="newUserFormItem">
            <label>Active</label>
            <select className="newUserSelect" name="active" id="active" onChange={handleChange}>
              <option value="true">true</option>
              <option value="false">false</option>
            </select>    
         </div>
          <div className="newUserFormItem">
            <label>Admin</label>
            <select className="newUserSelect" name="isAdmin" id="isAdmin" onChange={handleChange} >
              <option value="true">true</option>
              <option value="false">false</option>
            </select>   
          </div>
          <div className="newUserFormItem">
            <label>Gender</label>
            <div className="newUserGender">
              <input type="radio" name="gender" id="male" value="male" onChange={handleChange} />
              <label htmlFor="male">Male</label>
              <input type="radio" name="gender" id="female" value="female" onChange={handleChange} />
              <label htmlFor="male">Female</label>
            </div>
          </div> 
         <button className="newUserButton" onClick={handleClick}>Create User</button>
      </form>
      <div className="newUserFooter">
        <Footer />
      </div> 
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          User created successfully...
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

export default Newuser; 