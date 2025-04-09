import { configureStore } from "@reduxjs/toolkit";
import api from "./api"; //Brings in puppyApi from api.js

// TODO: configure the store to use the API slice's auto-generated reducer and custom middleware.
const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer, //Adds API's reducer to Redux state
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(api.middleware), //Adds API's middleware for cache/refresh
});

export default store;
