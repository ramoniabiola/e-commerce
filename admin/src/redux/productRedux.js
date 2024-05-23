import { createSlice } from "@reduxjs/toolkit";


export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isFetching: false,
        error: false,
    },

    
    reducers: {

        // GET ALL PRODUCT FROM DATABASE

        getProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        }, 

        getProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = action.payload;
        },

        getProductFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },



        // DELETE PRODUCT FROM DATABASE
        
        deleteProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        }, 

        deleteProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = state.products.filter(item => item._id !== action.payload.id);
        },

        deleteProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },



        // UPDATE PRODUCT IN DATABASE
   
        updateProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        }, 

        updateProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = state.products.map((item) =>
                item._id === action.payload.id ? action.payload.product : item
            );
        },
        

        updateProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        },


     // CREATE A NEW PRODUCT 
  
        addProductStart: (state) => {
            state.isFetching = true;
            state.error = false;
        }, 

        addProductSuccess: (state, action) => {
            state.isFetching = false;
            state.products = [...state.products, action.payload];
        },

        addProductFailure: (state) => {
            state.isFetching = false
            state.error = true
        } 

    },
})

export const {
    getProductStart, getProductSuccess, getProductFailure,
    deleteProductStart, deleteProductSuccess, deleteProductFailure,
    updateProductStart, updateProductSuccess, updateProductFailure,
    addProductStart, addProductSuccess, addProductFailure
} = productSlice.actions;

export default productSlice.reducer;