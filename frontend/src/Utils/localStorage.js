// Add a product to localStorage
export const addFavoriteToLocalStorage = (product) => {
    const favorites = getFavoritedFromLocalStorage();
    if (!favorites.some((p) => p._id === product._id)) {
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
};

// Remove a product from localStorage
export const removeFavoriteFromLocalStorage = (productId) => {
    const favorites = getFavoritedFromLocalStorage();
    const updatedFavorites = favorites.filter(
        (product) => product._id !== productId
    );
    localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
};

// Retrieve products from localStorage
export const getFavoritedFromLocalStorage = () => {
    const favoritesJson = localStorage.getItem('favorites');
    return favoritesJson ? JSON.parse(favoritesJson) : [];
};
