import { useState } from "react";
import "./newproduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useAddProduct } from "../../redux/apiCalls.js";
import { useDispatch } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
import Footer from "../../components/footer/Footer.js";




const Newproduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [features, setFeatures] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch = useDispatch();
  const { addProduct, error, success, loadingSpinner } = useAddProduct();
  


  const handleChange = (e) => {
    setInputs((prev) => {
      return{
        ...prev, [e.target.name]: e.target.value
      }
    }) 
  }



  const handleArrays = (e) => {
    const { name, value } = e.target;
    setFeatures((prevFeatures) => ({
      ...prevFeatures,
      [name]: value.split(","),
    }));
  };

  

  const handleCategories = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      // If checkbox is checked, add category to the state
      setCategories(prev => [...prev, name]);
    } else {
      // If checkbox is unchecked, remove category from the state
      setCategories(prev => prev.filter(category => category !== name));
    }
  }



  const handleClick = async (e) => {
    e.preventDefault();

    const requiredFields = ["title", "desc", "price"];
    const requiredFields_2 = ["size", "color"];
    const emptyFields = requiredFields.filter((field) => !inputs[field]);
    const emptyFields_2 = requiredFields_2.filter((field) => !features[field])
  
    

    if (!file) {
      setErrorMessage("Select an image");
      return;
    }

    if (emptyFields.length > 0 || emptyFields_2.length > 0) {
      setErrorMessage("Fill all fields");
      return;
    }

    setErrorMessage(null);

    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Handle upload progress if needed
      },
      (error) => {
        console.log("Upload failed...");
        setErrorMessage("Upload failed");
      },
      async () => { 
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const product = { ...inputs, img: downloadURL, categories, size: features.size, color: features.color };
        await addProduct(product, dispatch);
        setErrorMessage(null)
      }
    );
  };



  return (
    <div className='newProduct'>
      {loadingSpinner && (
        <div className="loading-spinner-overlay">
          <CircularProgress className="loading-spinner"  />
        </div>
      )}
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input  type="file"  id="file" onChange={(e) => setFile(e.target.files[0])} />
        </div>
        <div className="addProductItem">
          <label>Product Title</label>
          <input name="title"   type="text"  placeholder="Nike T-shirt" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Product Description</label>
          <textarea name="desc"  id="desc" cols="40" rows="4" onChange={handleChange}></textarea>
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <div className="check">
            <label>
             <input type="checkbox" name="men"  value="men" checked={categories.includes("men")} onChange={handleCategories} /> Men
            </label> 
            <label>
             <input type="checkbox" name="women"  value="momen"  checked={categories.includes("women")} onChange={handleCategories}  /> Women
            </label> 
            <label>
             <input type="checkbox" name="all"  value="all" checked={categories.includes("all")}  onChange={handleCategories} /> All
            </label>
          </div>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input name="price"  type="number"  placeholder="N2,000" onChange={handleChange} />
        </div>
        <div className="addProductItem">
          <label>Size</label>
          <input name="size"  type="text"  placeholder="42, 43, 44" onChange={handleArrays} />
        </div>  
        <div className="addProductItem">
          <label>Color</label>
          <input name="color" type="text"  placeholder="red, blue, green" onChange={handleArrays} />
        </div>
        <div className="addProductItem">
          <label>In-stock</label>
          <select name="inStock" id="inStock" onChange={handleChange}>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button onClick={handleClick}  className="addProductButton">
          Create
        </button>
      </form>
      <div className="fottrrrContainer">
        <Footer />
      </div> 
      {success && (
        <Alert severity="success" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
          Product created successfully...
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

export default Newproduct;





