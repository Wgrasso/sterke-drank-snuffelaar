
import { useState } from 'react';

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  fallbackImageUrl?: string;
}

const ProductImage = ({ 
  imageUrl, 
  productName, 
  fallbackImageUrl = "/placeholder.svg" 
}: ProductImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true); // Stop showing loading spinner
  };

  return (
    <div className="relative w-full h-full image-blur-wrapper">
      {imageError ? (
        <div className="w-full h-full flex items-center justify-center bg-muted/40">
          <img
            src={fallbackImageUrl}
            alt={productName}
            className="w-2/3 h-2/3 object-contain opacity-50"
          />
        </div>
      ) : (
        <img
          src={imageUrl}
          alt={productName}
          className={`w-full h-full object-contain transition-all duration-500 ease-out ${
            imageLoaded ? "loaded" : "image-blur"
          }`}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      {!imageLoaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
