import { useEffect } from "react";

import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { 
    addToFavorites, 
    removeFromFavorites, 
    setFavorite
    } from "../../redux/featuers/auth/favorites/favoriteSlice";
import { addFavoriteToLocalStorage, getFavoritedFromLocalStorage, removeFavoriteFromLocalStorage } from "../../Utils/localStorage";


const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorites) || [];
    const isFavorite = favorites.some((p) => p._id === product._id);


    useEffect(() => {
        const favoriteFromLocalStorage = getFavoritedFromLocalStorage();
        dispatch(setFavorite(favoriteFromLocalStorage));
    }, [])


    const toggleFavorites = () => {
        if (isFavorite) {
            dispatch(removeFromFavorites(product));
            // remove the product from localstorage as well
            removeFavoriteFromLocalStorage(product._id);
        } else {
            dispatch(addToFavorites(product));
            // add the product to localstorage as well
            addFavoriteToLocalStorage(product);
        }
    }

    return (
        <div 
        className="absolute top-2 right-5 cursor-pointer"
        onClick= {toggleFavorites} 
        >
            {isFavorite ? (
                <FaHeart className="text-pink-500" />
                ) : (
                <FaRegHeart  className="text-red-600" />
                )}
        </div>
    )
}

export default HeartIcon