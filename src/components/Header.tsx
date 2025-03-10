import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wine, Search, Menu, X, Beer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from "sonner";
import { cn } from '@/lib/utils';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/aanbiedingen?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    } else {
      toast.error("Voer een zoekopdracht in");
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-40 backdrop-blur-lg bg-background/80 border-b border-border/40">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <Link to="/" className="flex items-center gap-2">
              <Wine className="w-8 h-8 text-accent" />
              <span className="font-bold text-xl">DrankDeals</span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1 md:gap-2">
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
              <Link to="/likeur" className="text-foreground font-medium hover:text-accent transition-colors">
                Likeur
              </Link>
              <Link to="/aanbiedingen" className="text-foreground font-medium hover:text-accent transition-colors">
                <Badge variant="outline" className="bg-accent/10 hover:bg-accent/20 text-accent font-medium">
                  Aanbiedingen
                </Badge>
              </Link>
              <Link to="/faq" className="text-foreground font-medium hover:text-accent transition-colors">
                FAQ
              </Link>
              <Link
                to="/scraper"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-foreground/80",
                  "px-3 py-2 rounded-md hover:bg-accent/20"
                )}
              >
                Verificatie Tool
              </Link>
            </nav>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                type="search" 
                placeholder="Zoek dranken..." 
                className="pl-10 w-[200px] focus:w-[300px] transition-all duration-300"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>

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
      </div>

      <div className={`
        md:hidden fixed inset-0 bg-background/95 backdrop-blur-sm z-40 transition-all duration-300 
        ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}>
        <div className="container px-4 mx-auto pt-20 flex flex-col gap-6 animate-fade-in">
          <form onSubmit={handleSearch} className="relative mx-auto w-full max-w-md mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              type="search" 
              placeholder="Zoek dranken..." 
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          
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
              to="/likeur" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Likeur
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
            <Link 
              to="/faq" 
              className="text-foreground font-medium hover:text-accent transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              FAQ
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
