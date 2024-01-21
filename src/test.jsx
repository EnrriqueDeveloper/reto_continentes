import { useState } from "react";
import { useEffect } from "react";

const getImageUrl = async (pais, capital) => {
  const apiKey = "134TXEUBqjS54YE3Tez5hgjc67W2cArJv9Zxypl1ZazNIZGlA5KxfC7E";
  try {
    const query = `${pais}%20${capital}%20drone`;
    const response = await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
      headers: {
        Authorization: apiKey,
      },
    });

    console.log(response);
    const data = await response.json();
    console.log(data);
    if (data.photos && data.photos.length > 0) {
      // const randomIndex = Math.floor(Math.random() * data.photos.length);
      const image = data.photos[0];
      return image;
      // return data.photos[randomIndex];
    } else {
      throw new Error("no se econtraron imagene");
    }
  } catch (e) {
    console.log(e);
  }
};

export default function Test() {
  const [imageUrl, setImageUrl] = useState(null);
  useEffect(() => {
    (async () => {
      const image = await getImageUrl("Peru", "Lima");
      console.log(image);
      setImageUrl(image.src.original);
    })();
  }, []);
  return (
    <div>
      <img className="w-[200px] h-[100px] object-cover" src={imageUrl} alt="image" />
    </div>
  );
}
