
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: Gebruiker probeerde niet-bestaande route te openen:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="container px-4 max-w-md mx-auto text-center">
          <h1 className="text-8xl font-bold text-accent mb-6">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Pagina niet gevonden</h2>
          <p className="text-muted-foreground mb-8">
            De pagina die je probeert te bezoeken bestaat niet of is verplaatst.
          </p>
          <Button size="lg" asChild>
            <Link to="/">Terug naar homepagina</Link>
          </Button>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default NotFound;
