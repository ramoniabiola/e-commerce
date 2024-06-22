import * as React from 'react';
import { useState, useEffect } from 'react';
import "./productlist.css";
import { DataGrid } from '@mui/x-data-grid';
import { DeleteOutline } from "@mui/icons-material";
import {Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteProduct, useGetProducts } from '../../redux/apiCalls';
import { Alert, CircularProgress, Box,Typography  } from "@mui/material";
import { PostAdd } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';





const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});



const ProductList = () => {
  const dispatch = useDispatch();
  const myProducts = useSelector((state) => state.product.products);
  const { getProducts, error, isLoading } = useGetProducts();
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // Initialize with null or appropriate initial value
  const { deleteProduct, deleteError, success, loadingSpinner } = useDeleteProduct();


  
  const handleClickOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product) // Set the selected product when the delete button is clicked
  };

  const handleClose = () => {
    setOpen(false);
  };


  
  useEffect(() => {
    getProducts();
    
  }, [getProducts]);


  
  const handleDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct._id, dispatch);
      setOpen(false);
    }
};



  const columns = [
    { field: '_id', headerName: 'ID', width: 250 },
    { field: 'product', headerName: 'Product', width: 250, renderCell: (params) => {
      return (
        <div className='productListItem'>
          <img className='productListImg' src={params.row.img} alt="" />
          {params.row.title}
        </div>
      )
    }},
    { field: 'inStock', headerName: ' In-stock', width: 180},
    {
      field: 'price',
      headerName: 'Price',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 200,
      renderCell: (params) => { 
        return (
          <> 
            <Link to={"/product/"+params.row._id}>
              <button className='productListEdit'>Edit</button>
            </Link>
            <DeleteOutline 
              className='productListDelete' 
              onClick={() => handleClickOpen(params.row)} // Pass the entire product object
            />
          </> 
        );
      }
    },
  ];  


  return (
    <div className='productList'>
      {isLoading && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          flexDirection="column"
          marginBottom="12px"
        >
          <CircularProgress  style={{ color: "#38bdf8", marginBottom: "14px" }} size={34} />
          <Typography variant="h6" color="#9ca3af">Loading...</Typography>
        </Box>
      )}
      {error && (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minHeight="80vh"
          flexDirection="column"
          marginBottom="8px"
        >
          <PostAdd style={{ fontSize: 90, marginBottom: "10px", color: "#9ca3af" }} />
          <Typography variant="h5" color="#9ca3af">{error}</Typography>
        </Box>
      )}
      {!isLoading && !error && (
        <>
          {loadingSpinner && (
            <div className="loading-spinner-overlay">
              <CircularProgress className="loading-spinner"  />
            </div>
          )}
          <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            >
            <DialogTitle style={{color: "#991b1b", fontSize: "18px"}}>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description"  style={{color: "#0c0a09"}}>
                    {selectedProduct && `Are you sure you want to delete "${selectedProduct.title}"?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} style={{color: "#9ca3af", fontWeight: '600'}}>Cancel</Button>
              <Button  onClick={handleDelete} style={{color: "#e11d48", fontWeight: '600'}}>Delete</Button>
            </DialogActions>
          </Dialog>
          <DataGrid
            rows={myProducts}
            getRowId={row => row._id}
            columns={columns}
            disableRowSelectionOnClick
            initialState={{
              pagination:
              {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            pageSizeOptions={[10, 20]}
            checkboxSelection
          />
          {success && (
            <Alert severity="success" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
              {success}
            </Alert>
          )}
          {deleteError && (
            <Alert severity="error" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
              {deleteError}
            </Alert>
          )}
        </>
      )}
    </div> 
  )
}

export default ProductList;