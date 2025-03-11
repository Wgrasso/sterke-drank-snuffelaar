
import { Wine } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="mt-20 bg-muted/30 pt-12 pb-6">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Wine className="w-7 h-7 text-accent" />
              <span className="font-bold text-xl">DrankDeals</span>
            </div>
            <p className="text-muted-foreground mb-4">
              De beste prijzen voor sterke drank in Nederland. Wij vergelijken dagelijks prijzen zodat u altijd de beste deal vindt.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Dranken</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/whisky" className="text-muted-foreground hover:text-accent transition-colors">
                  Whisky
                </Link>
              </li>
              <li>
                <Link to="/vodka" className="text-muted-foreground hover:text-accent transition-colors">
                  Vodka
                </Link>
              </li>
              <li>
                <Link to="/rum" className="text-muted-foreground hover:text-accent transition-colors">
                  Rum
                </Link>
              </li>
              <li>
                <Link to="/gin" className="text-muted-foreground hover:text-accent transition-colors">
                  Gin
                </Link>
              </li>
              <li>
                <Link to="/likeuren" className="text-muted-foreground hover:text-accent transition-colors">
                  Likeuren
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Winkels</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Gall & Gall
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Jumbo
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Albert Heijn
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Dirk
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Dirk 3
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-accent transition-colors">
                  Drankdozijn
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Informatie</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/over-ons" className="text-muted-foreground hover:text-accent transition-colors">
                  Over Ons
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-muted-foreground hover:text-accent transition-colors">
                  Privacy Beleid
                </Link>
              </li>
              <li>
                <Link to="/voorwaarden" className="text-muted-foreground hover:text-accent transition-colors">
                  Algemene Voorwaarden
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-4 border-t border-border">
          <p className="text-center text-muted-foreground text-sm">
            © {new Date().getFullYear()} DrankDeals. Alle rechten voorbehouden. Drink met mate.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
