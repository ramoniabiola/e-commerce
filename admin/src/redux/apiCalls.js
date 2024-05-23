import { loginFailure, loginStart, loginSuccess } from "./userRedux";
import { publicRequest, userRequest } from "../requestMethod";
import { getProductFailure, getProductStart, getProductSuccess,
    deleteProductFailure, deleteProductStart, deleteProductSuccess, 
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure
} from "./productRedux";
import { getUserStart, getUserSuccess, getUserFailure,
    deleteUserStart,deleteUserSuccess, deleteUserFailure,
    addUserStart,addUserSuccess,addUserFailure,
    updateUserStart, updateUserSuccess, updateUserFailure
} from "./userRedux";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';



//// AUTHENTICATION SECTION -------------------------------------------------------------------


//  "Login" CUSTOMIZED HOOK
export const useLogin = () => {
    const [error, setError] = useState(null);
    const [loadingSpinner, setLoadingSpinner] = useState(false);
    const navigate = useNavigate();

  
    const login = async (dispatch, user) => {
        dispatch(loginStart());
        setLoadingSpinner(true);
    
        try {
            const response = await publicRequest.post("/auth/login", user);
    
            if (response.status >= 200 && response.status < 300) {
                dispatch(loginSuccess(response.data));
                setError(null);
                setLoadingSpinner(false);
                navigate('/');
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            setLoadingSpinner(false);
            dispatch(loginFailure(error.response.data.error))
        }      
    };
    
    return { login, error, loadingSpinner };
};




// "Logout" CUSTOMIZED HOOK








//// USER SECTION -----------------------------------------------------------------



// "Get Users" CUSTOMIZED HOOK 

export const useGetUsers = () => {
    const [error, setError] = useState(null);


    const getUsers = async (dispatch) => {
        dispatch(getUserStart());
 
 
        try {
           const response = await userRequest.get("/users"); 
            if (response.status >= 200 && response.status < 300) {
              dispatch(getUserSuccess(response.data));
              setError(null);
            } else{
              // If the response status is not in the success range, handle the error
              throw new Error(response.data.error);
            }
        } catch (error) {
           // If there's an error, set the error state to display on the webpage
           setError(error.response.data.error); // Assuming the error message is in response.data.error
           dispatch(getUserFailure(error.response.data.error))
        }      
    }

    return { getUsers, error };
}




// "Delete User" CUSTOMIZED HOOK 

export const useDeleteUser = () => {
    const [deleteError, setDeleteError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const deleteUser = async (id, dispatch) => {
        dispatch(deleteUserStart());
        setLoadingSpinner(true)
 
 
        try {
             const response = await userRequest.delete(`/users/${id}`);
           if (response.status >= 200 && response.status < 300) {
              dispatch(deleteUserSuccess(response.data));
              setLoadingSpinner(false)
              setSuccess(response.data)
              setDeleteError(null);
              setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
           } else {
              // If the response status is not in the success range, handle the error
              throw new Error(response.data.error);
           }
        } catch (error) {
            setLoadingSpinner(false)
           // If there's an error, set the error state to display on the webpage
           setDeleteError(error.response.data.error); // Assuming the error message is in response.data.error
           setTimeout(() => setDeleteError(false), 8000); // Hide deleteError message after 8 seconds
           dispatch(deleteUserFailure(error.response.data.error))
        }      
    }

    return { deleteUser, deleteError, success, loadingSpinner };
}




// "Update User" CUSTOMIZED HOOK
export const useUpdateUser = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const updateUser = async (id, updatedUser, dispatch) => {
       dispatch(updateUserStart());
       setLoadingSpinner(true)


        try {
            const response = await userRequest.put(`/users/${id}`, updatedUser); 
            if (response.status >= 200 && response.status < 300) {
                dispatch(updateUserSuccess(response.data));
                setError(null);
                setLoadingSpinner(false)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            dispatch(updateUserFailure(error.response.data.error))
            setLoadingSpinner(false)
        }      
    }

    return { updateUser, error, success, loadingSpinner };
}




// "Add User" CUSTOMIZED HOOK
export const useAddUser = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const addUser = async (user, dispatch) => {
       dispatch(addUserStart());
       setLoadingSpinner(true)


        try {
            const response = await userRequest.post("/auth/register", user);
            if (response.status >= 200 && response.status < 300) {
                dispatch(addUserSuccess(response.data));
                setError(null);
                setLoadingSpinner(false)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            dispatch(addUserFailure(error.response.data.error))
            setLoadingSpinner(false)
        }      
    }

    return { addUser, error, success, loadingSpinner };
}






//// PRODUCT FUNCTION ----------------------------------------------------------------


// "Get Products" CUSTOMIZED HOOK 

export const useGetProducts = () => {
    const [error, setError] = useState(null);


    const getProducts = async (dispatch) => {
        dispatch(getProductStart());
 
 
        try {
           const response = await userRequest.get("/products"); 
           if (response.status >= 200 && response.status < 300) {
              dispatch(getProductSuccess(response.data));
              setError(null);
           } else {
              // If the response status is not in the success range, handle the error
              throw new Error(response.data.error);
           }
        } catch (error) {
           // If there's an error, set the error state to display on the webpage
           setError(error.response.data.error); // Assuming the error message is in response.data.error
           dispatch(getProductFailure(error.response.data.error))
        }      
    }

    return { getProducts, error };
}



// "Delete Product" CUSTOMIZED HOOK 

export const useDeleteProduct = () => {
    const [deleteError, setDeleteError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const deleteProduct = async (id, dispatch) => {
        dispatch(deleteProductStart());
        setLoadingSpinner(true)
 
 
        try {
             const response = await userRequest.delete(`/products/${id}`);
           if (response.status >= 200 && response.status < 300) {
              dispatch(deleteProductSuccess(response.data));
              setLoadingSpinner(false)
              setSuccess(response.data)
              setDeleteError(null);
              setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
           } else {
              // If the response status is not in the success range, handle the error
              throw new Error(response.data.error);
           }
        } catch (error) {
            setLoadingSpinner(false)
           // If there's an error, set the error state to display on the webpage
           setDeleteError(error.response.data.error); // Assuming the error message is in response.data.error
           setTimeout(() => setDeleteError(false), 8000); // Hide deleteError message after 8 seconds
           dispatch(deleteProductFailure(error.response.data.error))
        }      
    }

    return { deleteProduct, deleteError, success, loadingSpinner };
}






// "Update Product" CUSTOMIZED HOOK
export const useUpdateProduct = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const updateProduct = async (id, updatedProduct, dispatch) => {
       dispatch(updateProductStart());
       setLoadingSpinner(true)


        try {
            const response = await userRequest.put(`/products/${id}`, updatedProduct); 
            if (response.status >= 200 && response.status < 300) {
                dispatch(updateProductSuccess(response.data));
                setError(null);
                setLoadingSpinner(false)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            dispatch(updateProductFailure(error.response.data.error))
            setLoadingSpinner(false)
        }      
    }

    return { updateProduct, error, success, loadingSpinner };
}



// "Add Product" CUSTOMIZED HOOK
export const useAddProduct = () => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false); // State for success alert
    const [loadingSpinner, setLoadingSpinner] = useState(false)


    const addProduct = async (product, dispatch) => {
       dispatch(addProductStart());
       setLoadingSpinner(true)


        try {
            const response = await userRequest.post("/products", product);
            if (response.status >= 200 && response.status < 300) {
                dispatch(addProductSuccess(response.data));
                setError(null);
                setLoadingSpinner(false)
                setSuccess(true)
                setTimeout(() => setSuccess(false), 5000); // Hide success message after 5 seconds
            } else {
                // If the response status is not in the success range, handle the error
                throw new Error(response.data.error);
            }
        } catch (error) {
            // If there's an error, set the error state to display on the webpage
            setError(error.response.data.error); // Assuming the error message is in response.data.error
            dispatch(addProductFailure(error.response.data.error))
            setLoadingSpinner(false)
        }      
    }

    return { addProduct, error, success, loadingSpinner };
}