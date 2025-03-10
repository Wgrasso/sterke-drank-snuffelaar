
interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  className?: string;
}

const ProductPrice = ({ price, originalPrice, className = "" }: ProductPriceProps) => {
  const hasDiscount = originalPrice && originalPrice > price;
  
  return (
    <div className={`flex items-baseline ${className}`}>
      <span className="text-lg font-semibold">€{price.toFixed(2)}</span>
      {hasDiscount && (
        <span className="ml-2 text-sm text-muted-foreground line-through">
          €{originalPrice?.toFixed(2)}
        </span>
      )}
    </div>
  );
};

export default ProductPrice;
