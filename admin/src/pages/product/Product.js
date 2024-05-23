import * as React from 'react';
import { useState } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';
import { Add, Publish } from "@mui/icons-material";
import "./product.css";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { useUpdateProduct } from '../../redux/apiCalls';
import { Alert, CircularProgress } from "@mui/material";

const uData = [40000, 30000, 20000, 27800, 18900, 23900];
const xLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

const Product = () => {

  // STATES CONTROLLER
  const location = useLocation();
  const productId = location.pathname.split('/')[2];
  const product = useSelector((state) => state.product.products.find((product) => product._id === productId));
  const [inputs, setInputs] = useState({
    title: product.title || '',
    desc: product.desc || '',
    categories: product.categories || [],
    price: product.price || '',
    size: product.size || '',
    color: product.color || '',
    inStock: product.inStock || true,
  });
  const [file, setFile] = useState(null); // Separate file state
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState(null);
  const { updateProduct, error, success, loadingSpinner} = useUpdateProduct();
  



  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // If it's a checkbox, handle multiple selections as an array
    if (type === 'checkbox') {
      if (checked) {
        setInputs((prev) => ({
          ...prev,
          categories: [...prev.categories, value], // Add the value to the categories array
        }));
      } else {
        setInputs((prev) => ({
          ...prev,
          categories: prev.categories.filter((category) => category !== value), // Remove the value from the categories array
        }));
      }
    } else {
      // For other input types, update the state normally
      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  }



  const handleClick = async (e) => {
    e.preventDefault();
  
  
    const updatedProduct = {
      ...product,
      ...inputs,
    };
  
    const handleUploadCompletion = async (uploadTask) => {
      const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      updatedProduct.img = downloadURL;
      await updateProduct(product._id, updatedProduct, dispatch);
      
    }
  
    if (file) {
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
      // No file selected, update product without modifying the image
      await updateProduct(product._id, updatedProduct, dispatch);
    }
  };
  

  return (
    <div className="product">
      {loadingSpinner && (
        <div className="loading-spinner-overlay">
          <CircularProgress className="loading-spinner"  />
        </div>
      )}
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link className="product-link" to="/newproduct">
          <button className="productAddButton">
            <Add className="productAddButtonIcon" />
            create
          </button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <h3 className='productChartTitle'>Sales Performance</h3>
          <LineChart
            width={500}
            height={170}
            series={[{ data: uData, label: 'Sales Revenue', area: true, showMark: false, color: "#14b8a6" }]}
            xAxis={[{ scaleType: 'point', data: xLabels }]}
            sx={{
              '.MuiLineElement-root': 
              {
                  display: 'none',
              },
            }}
          />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Price:</span>
              <span className="productInfoValue">₦{product.price}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">In-stock:</span>
              <span className="productInfoValue">{inputs.inStock.toString()}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Active:</span>
              <span className="productInfoValue">Yes</span>
            </div>
          </div>
        </div>
       </div>
       <div className="productBottom">
          <form className="productForm">
            <div className="productFormLeft">
              <label>Product Name</label>
              <input type="text" name="title" value={inputs.title} onChange={handleChange} />
              <label>Product Description</label>
              <textarea name="desc" id="desc" cols="40" rows="4" value={inputs.desc} onChange={handleChange}></textarea>
              <label>Categories</label>
              <div className="check">
                <label>
                  <input
                    type="checkbox"
                    name="categories"  
                    checked={inputs.categories.includes('Men')}  
                    value="Men"  
                    onChange={handleChange}  
                  /> Men
                </label> 
                <label>
                  <input 
                    type="checkbox" 
                    name="categories"   
                    checked={inputs.categories.includes('Women')}   
                    value="Women"  
                    onChange={handleChange}  
                  /> Women
                </label> 
                <label>
                  <input 
                    type="checkbox" 
                    name="categories"  
                    checked={inputs.categories.includes('All')}  
                    value="All"   
                    onChange={handleChange}  
                  /> All
                </label>
              </div>                    
              <label>Price</label>
              <input type="text" name='price' value={inputs.price} onChange={handleChange} />
              <label>Size</label>
              <input type="text" name='size' value={inputs.size} onChange={handleChange} />
              <label>Color</label>
              <input type="text" name='color' value={inputs.color} onChange={handleChange} />
              <label>In Stock</label>
              <select name="inStock" id="inStock"  value={inputs.inStock.toString()} onChange={handleChange}>
                <option value="true">true</option>
                <option value="false">false</option>
              </select>
            </div>
            <div className="productFormRight">
              <div className="productUpload">
                <img src={product.img} alt="" className="productUploadImg" />
                <label htmlFor="file">
                  <Publish />
                </label>
                <input type="file" name='file' id="file" style={{ display: "none" }} onChange={handleFileChange} />
              </div>
              <button onClick={handleClick} className="productButton">Update</button>
            </div>
          </form>
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
  );
}

export default Product;
