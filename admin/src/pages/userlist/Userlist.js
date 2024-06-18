import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./userlist.css";
import { DeleteOutline } from "@mui/icons-material";
import {Link} from "react-router-dom";
import { useDeleteUser, useGetUsers } from '../../redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress } from "@mui/material";
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
  


const Userlist = () => {
    const dispatch = useDispatch();
    const myUsers = useSelector((state) => state.user?.user?.users) || [];
    const { getUsers, error } = useGetUsers();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); // Initialize with null or appropriate initial value
    const { deleteUser, success, deleteError, loadingSpinner } = useDeleteUser();


    const handleClickOpen = (user) => {
        setOpen(true);
        setSelectedUser(user) // Set the selected user when the delete button is clicked
    };
    
    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        const fetchUsers = async () => {
            await getUsers(dispatch);
        };
 
        fetchUsers();
    }, [dispatch, getUsers]);


    const handleDelete = () => {
        if (selectedUser) {
            deleteUser(selectedUser._id, dispatch);
            setOpen(false);
        }
    };


    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        { field: 'user', headerName: 'User', width: 250, renderCell: (params) => {
            return (
                <div className='userListUser'>
                    {params.row.img ?
                        (<img className='userListImg' src={params.row.img} alt="" />) : 
                        (<img className='userListImg' src="https://images.squarespace-cdn.com/content/v1/616855ce29e03d07eca7a169/1635364716434-7A1HG8LB7Q98R411TUON/Avatar+Logo+(1).png" alt="Default" />)
                    }
                    {params.row.username}
                </div>
            )
        }},
        {  field: 'isAdmin', headerName: "Admin", width: 120 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => { 
                return (
                    <> 
                        <Link to={"/user/"+params.row._id}>
                            <button className='userListEdit'>Edit</button>
                        </Link>
                        <DeleteOutline 
                            variant="outlined" onClick={() => handleClickOpen(params.row)} // Pass the entire user object
                            className='userListDelete' 
                        />
                    </> 
                );
            }
        },
    ];


    

    
      
  return (
    <div className='userList'>
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
            <DialogTitle>{"Confirm Delete"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {selectedUser && `Are you sure you want to delete "${selectedUser.username}"?`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button  onClick={handleDelete}>Delete</Button>
            </DialogActions>
        </Dialog>
        <DataGrid
            rows={myUsers}
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
        {error && (
            <Alert severity="error" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
              {error}
            </Alert>
        )}
        {deleteError && (
            <Alert severity="error" sx={{ position: 'fixed', bottom: 20, left: '50%', transform: 'translateX(-50%)', zIndex: 9999 }}>
              {deleteError}
            </Alert>
        )}
    </div>
  )
}

export default Userlist;