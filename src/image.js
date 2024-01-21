export const getImageUrl = async (query) => {
  const apiKey = "134TXEUBqjS54YE3Tez5hgjc67W2cArJv9Zxypl1ZazNIZGlA5KxfC7E"; //agregar la api key de pexels
  try {
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}&per_page=1`, {
      headers: {
        Authorization: apiKey,
      },
    });

    const data = await response.json();
    if (data.photos && data.photos.length > 0) {
      // const randomIndex = Math.floor(Math.random() * data.photos.length);
      const image = data.photos[0];
      return image;
      // return data.photos[randomIndex];
    } else {
      throw new Error("no se econtraron imagenes");
    }
  } catch (e) {
    return null;
  }
};
