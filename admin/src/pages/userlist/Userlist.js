import * as React from 'react';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import "./userlist.css";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useDeleteUser, useGetUsers } from '../../redux/apiCalls';
import { useDispatch, useSelector } from "react-redux";
import { Alert, CircularProgress, Box,Typography } from "@mui/material";
import { PostAdd } from '@mui/icons-material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Footer from '../../components/footer/Footer';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
});

const Userlist = () => {
    const dispatch = useDispatch();
    const myUsers = useSelector((state) => state.user?.user?.users) || [];
    const { getUsers, error, isLoading } = useGetUsers();
    const [open, setOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null); 
    const { deleteUser, success, deleteError, loadingSpinner } = useDeleteUser();


    const handleClickOpen = (user) => {
        setOpen(true);
        setSelectedUser(user); 
    };


    const handleClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        getUsers();
     
    }, [getUsers]);

    
    const handleDelete = () => {
        if (selectedUser) {
            deleteUser(selectedUser._id, dispatch);
            setOpen(false);
        }
    };


    const columns = [
        { field: '_id', headerName: 'ID', width: 250 },
        {
            field: 'user', headerName: 'User', width: 250, renderCell: (params) => {
                return (
                    <div className='userListUser'>
                        {params.row.img ?
                            (<img className='userListImg' src={params.row.img} alt="" />) :
                            (<img className='userListImg' src="https://images.squarespace-cdn.com/content/v1/616855ce29e03d07eca7a169/1635364716434-7A1HG8LB7Q98R411TUON/Avatar+Logo+(1).png" alt="Default" />)
                        }
                        {params.row.username}
                    </div>
                )
            }
        },
        { field: 'isAdmin', headerName: "Admin", width: 120 },
        { field: 'email', headerName: 'Email', width: 250 },
        {
            field: 'action',
            headerName: 'Action',
            width: 200,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={"/user/" + params.row._id}>
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
                            <CircularProgress className="loading-spinner" />
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
                            <DialogContentText id="alert-dialog-slide-description"   style={{color: "#0c0a09"}} >
                                {selectedUser && `Are you sure you want to delete "${selectedUser.username}"?`}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} style={{color: "#9ca3af", fontWeight: '600'}}>Cancel</Button>
                            <Button onClick={handleDelete} style={{color: "#e11d48", fontWeight: '600'}}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                    <DataGrid
                        rows={myUsers}
                        getRowId={row => row._id}
                        columns={columns}
                        disableRowSelectionOnClick
                        style={{ height: '100vh' }} 
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
                    <div className="userListFooter">
                        <Footer />
                    </div>
                </>
            )}
        </div>
    )
}

export default Userlist;
