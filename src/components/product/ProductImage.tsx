
import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductImageProps {
  imageUrl: string;
  productName: string;
  fallbackImageUrl?: string;
}

const ProductImage = ({ 
  imageUrl, 
  productName, 
  fallbackImageUrl = "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
}: ProductImageProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const handleImageLoad = () => {
    setImageLoaded(true);
    setImageError(false);
  };
  
  const handleImageError = () => {
    console.log(`Image error loading: ${imageUrl}`);
    setImageError(true);
    setImageLoaded(true); // Stop showing loading spinner
  };

  return (
    <div className="relative w-full h-full image-blur-wrapper">
      {imageError ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full h-full flex items-center justify-center bg-muted/40"
        >
          <img
            src={fallbackImageUrl}
            alt={productName}
            className="w-2/3 h-2/3 object-contain opacity-80"
          />
        </motion.div>
      ) : (
        <img
          src={imageUrl}
          alt={productName}
          className={`w-full h-full object-contain transition-opacity duration-300 ${
            imageLoaded ? "opacity-100" : "opacity-0"
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
