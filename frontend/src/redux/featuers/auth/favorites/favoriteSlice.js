import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: [],
    reducers: {
        addToFavorites: (state, action) => {
            // Check if the product is already in the favorites
            if (!state.some((product) => product._id === action.payload._id)) {
                state.push(action.payload);
            }
        },

        removeFromFavorites: (state, action) => {
            // Remove the product from the favorites
            return state.filter((product) => product._id !== action.payload._id);
    },

        setFavorite: (state, action) => {
            // set the favorites from localStorage
            return action.payload
        }
    }
})



export const { addToFavorites, removeFromFavorites, setFavorite } = favoriteSlice.actions;
export const selectFavoriteProduct = (state) => state.favorites
export default favoriteSlice.reducer