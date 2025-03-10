
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wine, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-2 bg-background/80 backdrop-blur-md shadow-sm' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container px-4 mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 transition-all duration-300 hover:opacity-80">
          <Wine className="w-8 h-8 text-accent" />
          <span className="font-bold text-xl">DrankDeals</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-foreground font-medium hover:text-accent transition-colors">
            Home
          </Link>
          <Link to="/whisky" className="text-foreground font-medium hover:text-accent transition-colors">
            Whisky
          </Link>
          <Link to="/vodka" className="text-foreground font-medium hover:text-accent transition-colors">
            Vodka
          </Link>
          <Link to="/rum" className="text-foreground font-medium hover:text-accent transition-colors">
            Rum
          </Link>
          <Link to="/gin" className="text-foreground font-medium hover:text-accent transition-colors">
            Gin
          </Link>
          <Link to="/aanbiedingen" className="text-foreground font-medium hover:text-accent transition-colors">
            <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20 text-accent font-medium">
              Aanbiedingen
            </Badge>
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Zoek dranken..." 
              className="pl-10 w-[200px] focus:w-[300px] transition-all duration-300"
            />
          </div>
        </div>

        {/* Mobile menu button */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Sluit menu" : "Open menu"}
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      <div className={`
        md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="container px-4 mx-auto pt-20 flex flex-col gap-6 animate-fade-in">
          <div className="relative mx-auto w-full max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Zoek dranken..." 
              className="pl-10 w-full"
            />
          </div>
          
          <nav className="flex flex-col items-center gap-6 text-lg">
            <Link 
              to="/" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/whisky" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Whisky
            </Link>
            <Link 
              to="/vodka" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Vodka
            </Link>
            <Link 
              to="/rum" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Rum
            </Link>
            <Link 
              to="/gin" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Gin
            </Link>
            <Link 
              to="/aanbiedingen" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20 text-accent font-medium">
                Aanbiedingen
              </Badge>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
