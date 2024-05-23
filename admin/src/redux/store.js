import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {
    persistStore, 
    persistReducer, 
    FLUSH,
    REHYDRATE, 
    PAUSE, 
    PURGE, 
    REGISTER, 
    PERSIST,
} from 'redux-persist';
import storage from "redux-persist/lib/storage";
import userReducer from "./userRedux";
import productReducer from "./productRedux";


const persistConfig = {
    key: "root",
    version: 1,
    storage,
}

const rootReducer = combineReducers({ 
    user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer)


export const store = configureStore({ 
    reducer:  {
        user: persistedReducer,
        product: productReducer
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});


const persistor = persistStore(store);

export { persistor };