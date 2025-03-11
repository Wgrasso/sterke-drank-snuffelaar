
import { motion } from 'framer-motion';

const stores = [
  {
    id: 'gall',
    name: 'Gall & Gall',
    logo: 'https://www.gall.nl/on/demandware.static/Sites-gall-nl-Site/-/default/dw1c28ad01/images/gall-logo.svg'
  },
  {
    id: 'ah',
    name: 'Albert Heijn',
    logo: 'https://www.ah.nl/favicon.ico'
  },
  {
    id: 'jumbo',
    name: 'Jumbo',
    logo: 'https://www.jumbo.com/dam/jcr:3a89625b-174f-4603-b340-6eaa3c3d7917/jumbo-logo-torch.png'
  },
  {
    id: 'dirk',
    name: 'Dirk',
    logo: 'https://www.dirk.nl/assets/images/dirk-logo.svg'
  },
  {
    id: 'drankdozijn',
    name: 'Drankdozijn',
    logo: 'https://www.drankdozijn.nl/static/version1686820612/frontend/Laco/default/nl_NL/images/logo.svg'
  }
];

const StoreLogos = () => {
  return (
    <div className="my-16 py-10 bg-muted/20">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-8">
          <h3 className="text-lg text-muted-foreground mb-1">We vergelijken prijzen van</h3>
          <h2 className="text-2xl font-bold">Toonaangevende dranksupermarkten</h2>
        </div>
        
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {stores.map((store, index) => (
            <motion.div
              key={store.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <img 
                src={store.logo} 
                alt={store.name} 
                className="max-w-full max-h-full object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreLogos;
