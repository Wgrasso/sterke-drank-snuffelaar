
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById, fetchProductsByCategory } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, ShoppingBag, ExternalLink } from 'lucide-react';

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const { data: product, isLoading: isProductLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(id!),
    enabled: !!id,
  });
  
  const { data: relatedProducts, isLoading: isRelatedLoading } = useQuery({
    queryKey: ['relatedProducts', product?.category],
    queryFn: () => fetchProductsByCategory(product!.category, 4),
    enabled: !!product,
  });
  
  if (isProductLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container px-4 mx-auto">
            <div className="animate-pulse">
              <div className="h-8 bg-muted rounded w-1/4 mb-12"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="aspect-square bg-muted rounded-lg"></div>
                <div className="space-y-4">
                  <div className="h-8 bg-muted rounded w-3/4"></div>
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-24 bg-muted rounded w-full mt-4"></div>
                  <div className="h-10 bg-muted rounded w-1/2 mt-6"></div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow pt-24 pb-12">
          <div className="container px-4 mx-auto text-center py-12">
            <h1 className="text-3xl font-bold mb-4">Product niet gevonden</h1>
            <p className="text-muted-foreground mb-8">
              Het product dat je zoekt bestaat niet of is niet meer beschikbaar.
            </p>
            <Button asChild>
              <Link to="/">Terug naar homepagina</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <div className="mb-8">
            <Button variant="ghost" asChild className="mb-6 -ml-3 gap-2">
              <Link to={`/${product.category.toLowerCase()}`}>
                <ArrowLeft className="w-4 h-4" />
                <span>Terug naar {product.category}</span>
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-muted/20 rounded-lg p-8 flex items-center justify-center">
              <div className="relative max-w-md w-full aspect-[3/4] image-blur-wrapper">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className={`w-full h-full object-contain transition-all duration-500 ease-out ${
                    imageLoaded ? "loaded" : "image-blur"
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <div className="flex items-start gap-3 mb-2">
                <Badge className="bg-accent/10 text-accent">
                  {product.category}
                </Badge>
                <Badge variant="outline">
                  {product.volume}
                </Badge>
                {hasDiscount && (
                  <Badge className="bg-accent text-white">
                    {product.discountPercentage}% Korting
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-3">{product.name}</h1>
              
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold">€{product.price.toFixed(2)}</span>
                  {hasDiscount && (
                    <span className="ml-2 text-muted-foreground line-through">
                      €{product.originalPrice?.toFixed(2)}
                    </span>
                  )}
                </div>
                
                <div className="flex items-center border-l border-muted pl-3">
                  <div className="h-6 w-6 rounded-full overflow-hidden bg-white mr-2">
                    <img 
                      src={product.store.logo} 
                      alt={product.store.name} 
                      className="h-full w-full object-contain p-0.5"
                    />
                  </div>
                  <span className="text-sm text-muted-foreground">{product.store.name}</span>
                </div>
              </div>
              
              <div className="mb-8">
                <p className="text-muted-foreground mb-4">
                  Dit product is nu in de aanbieding bij {product.store.name}. 
                  {hasDiscount && ` Je bespaart €${(product.originalPrice! - product.price).toFixed(2)} op de normale prijs.`}
                </p>
                
                <p className="text-muted-foreground">
                  De prijs is voor het laatst gecontroleerd en bijgewerkt op {new Date().toLocaleDateString('nl-NL')}. Prijzen kunnen variëren en aanbiedingen kunnen beperkt beschikbaar zijn.
                </p>
              </div>
              
              <Button size="lg" className="gap-2 w-full sm:w-auto" asChild>
                <a href={product.link} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Bekijk bij {product.store.name}</span>
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </Button>
            </div>
          </div>
          
          {/* Related Products */}
          {relatedProducts && relatedProducts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6">Vergelijkbare {product.category}</h2>
              
              {isRelatedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="bg-card animate-pulse rounded-lg h-[300px]"></div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  {relatedProducts.map((relatedProduct, index) => (
                    relatedProduct.id !== product.id && (
                      <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} />
                    )
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
