export default {
  storeFavorite (favorite) {
    const favoriteStr = JSON.stringify(favorite)
    localStorage.setItem('favoriteProduct', favoriteStr)
  },
  getFavorite () {
    return JSON.parse(localStorage.getItem('favoriteProduct'))
  }
}
