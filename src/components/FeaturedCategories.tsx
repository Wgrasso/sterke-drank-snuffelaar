
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 'whisky',
    name: 'Whisky',
    description: 'De beste whisky aanbiedingen',
    image: 'https://images.unsplash.com/photo-1569529465841-dfecdab7503b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-500/60 to-amber-800/60',
    link: '/whisky'
  },
  {
    id: 'vodka',
    name: 'Vodka',
    description: 'Zuivere vodka voor minder',
    image: 'https://images.unsplash.com/photo-1607622750671-6cd9a99eabd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: 'from-blue-500/60 to-blue-800/60',
    link: '/vodka'
  },
  {
    id: 'rum',
    name: 'Rum',
    description: 'Exotische rum aanbiedingen',
    image: 'https://images.unsplash.com/photo-1514218953589-2d7d87fe578e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: 'from-amber-700/60 to-red-900/60',
    link: '/rum'
  },
  {
    id: 'gin',
    name: 'Gin',
    description: 'Speciale gin deals',
    image: 'https://images.unsplash.com/photo-1620223877391-f8a8b7d13504?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
    color: 'from-emerald-500/60 to-emerald-800/60',
    link: '/gin'
  }
];

const FeaturedCategories = () => {
  return (
    <div className="my-16">
      <div className="container px-4 mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Ontdek per categorie</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <Link to={category.link} className="block h-full">
                <div className="relative h-80 rounded-lg overflow-hidden group">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10" />
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0`} />
                  
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                    <h3 className="text-white text-2xl font-bold mb-2">{category.name}</h3>
                    <p className="text-white/80">{category.description}</p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
