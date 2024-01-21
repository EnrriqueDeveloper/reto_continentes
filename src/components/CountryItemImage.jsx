import React, { useEffect, useState, lazy, Suspense } from "react";
import { getImageUrl } from "../image";

const LazyImage = lazy(() => import("./LazyImage")); // Ajusta la ruta según la ubicación real de tu componente de imagen

const CountryItemImage = ({ name, capital }) => {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const query = `${name}%20${capital}%20drone`;
      const cachedImage = localStorage.getItem(query);

      if (cachedImage) {
        setImageUrl(cachedImage);
      } else {
        // Fetch from API and store in cache
        const image = await getImageUrl(query);
        if (image) {
          localStorage.setItem(query, image.src.original);
          setImageUrl(image.src.original);
        }
      }
    };

    fetchData();
  }, [name, capital]);

  if (!imageUrl) {
    return <div className="bg-white w-full h-[100px]"></div>;
  }

  return (
    <Suspense fallback={<div className="bg-white w-full h-[100px]"></div>}>
      <LazyImage imageUrl={imageUrl} />
    </Suspense>
  );
};

export default CountryItemImage;
