import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from './api/apiSlice';
import authReducer from './featuers/auth/authSlice';
import { setupListeners } from "@reduxjs/toolkit/query/react";
import favoritesReducer from './featuers/auth/favorites/favoriteSlice';
import cartSliceReducer from '../redux/featuers/auth/cart/cartSlice'
import { getFavoritedFromLocalStorage } from "../Utils/localStorage";
import cartSlice from "./featuers/auth/cart/cartSlice";
import shopReducer from '../redux/featuers/auth/shop/shopSlice';


const initialFavorites = getFavoritedFromLocalStorage() || []

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        favorites: favoritesReducer,
        cart: cartSliceReducer,
        shop: shopReducer,
        
    },

    preloadedState: {
        favorites: initialFavorites
    },

    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

setupListeners(store.dispatch)

export default store