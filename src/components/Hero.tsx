
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const slides = [
  {
    title: "De beste drankdeals van Nederland",
    description: "Vergelijk prijzen van sterke drank bij alle grote winkels in Nederland en vind de beste aanbiedingen.",
    image: "https://images.unsplash.com/photo-1509807995916-c332365e2d9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    cta: "Bekijk aanbiedingen",
    link: "/aanbiedingen"
  },
  {
    title: "Premium whisky's voor minder",
    description: "Ontdek de beste whisky's tegen de scherpste prijzen. Altijd up-to-date met de nieuwste aanbiedingen.",
    image: "https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    cta: "Bekijk whisky deals",
    link: "/whisky"
  },
  {
    title: "Alles voor de perfecte cocktail",
    description: "Van premium gins tot exclusieve rums. Vind alle ingrediënten voor je favoriete cocktails tegen de beste prijzen.",
    image: "https://images.unsplash.com/photo-1596992644600-05ceadd0de2a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    cta: "Ontdek cocktail deals",
    link: "/cocktails"
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, []);
  
  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] overflow-hidden bg-muted/30 mb-16">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background z-20">
          <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => (
          currentSlide === index && (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              {/* Image Background */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                />
              </div>
              
              {/* Content */}
              <div className="relative z-10 h-full container mx-auto px-4 flex flex-col justify-center">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 md:mb-6">
                      {slide.title}
                    </h1>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <p className="text-white/90 text-lg md:text-xl mb-6 md:mb-8 max-w-2xl">
                      {slide.description}
                    </p>
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <Button 
                      size="lg" 
                      className="gap-2 bg-accent hover:bg-accent/90 text-white"
                      asChild
                    >
                      <a href={slide.link}>
                        {slide.cta}
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          )
        ))}
      </AnimatePresence>
      
      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Hero;
