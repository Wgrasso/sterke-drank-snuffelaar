
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { fetchFeaturedProducts } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import ProductCard from '@/components/ProductCard';
import FeaturedCategories from '@/components/FeaturedCategories';
import StoreLogos from '@/components/StoreLogos';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Index = () => {
  const { data: featuredProducts, isLoading } = useQuery({
    queryKey: ['featuredProducts'],
    queryFn: () => fetchFeaturedProducts(8),
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-20">
        <Hero />
        
        <section className="my-16">
          <div className="container px-4 mx-auto">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold">Beste aanbiedingen</h2>
              <Button variant="ghost" asChild className="gap-1 group">
                <Link to="/aanbiedingen">
                  <span>Alle aanbiedingen</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="bg-card animate-pulse rounded-lg h-[300px]"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {featuredProducts?.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
        
        <FeaturedCategories />
        
        <StoreLogos />
        
        <section className="my-16">
          <div className="container px-4 mx-auto">
            <div className="bg-accent/5 rounded-xl p-6 md:p-10">
              <div className="max-w-3xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">Altijd op de hoogte van de nieuwste aanbiedingen</h2>
                  <p className="text-muted-foreground mb-8">
                    Wij updaten onze database elke dag met de laatste prijzen van sterke drank bij alle grote Nederlandse winkels. Zo ben je altijd zeker van de beste deal.
                  </p>
                  <Button size="lg" className="bg-accent text-white hover:bg-accent/90" asChild>
                    <Link to="/aanbiedingen">
                      Ontdek alle aanbiedingen
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
