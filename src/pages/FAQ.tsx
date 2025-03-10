
import { useState } from 'react';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FeedbackForm from '@/components/FeedbackForm';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, CheckCircle, Search, ShieldCheck, ThumbsUp } from 'lucide-react';

const FAQ = () => {
  const [openFeedback, setOpenFeedback] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container px-4 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Veelgestelde vragen</h1>
              <p className="text-muted-foreground mb-8">
                Ontdek hoe Sterke Drank Snuffelaar werkt en vind antwoorden op veelgestelde vragen.
              </p>
              
              <Accordion type="single" collapsible className="mb-8">
                <AccordionItem value="item-1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <Search className="w-5 h-5 text-accent" />
                      <span>Hoe werkt Sterke Drank Snuffelaar?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Sterke Drank Snuffelaar verzamelt en vergelijkt dagelijks de prijzen van alcoholische dranken bij verschillende Nederlandse winkels, waaronder:</p>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                      <li>Gall & Gall</li>
                      <li>Albert Heijn</li>
                      <li>Jumbo</li>
                      <li>Dirk</li>
                      <li>Drankdozijn</li>
                    </ul>
                    <p>We tonen vervolgens de beste aanbiedingen zodat jij kunt besparen op je favoriete drankjes.</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-accent" />
                      <span>Hoe worden de prijzen gevalideerd?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">We zorgen ervoor dat de prijzen die we tonen altijd accuraat zijn door:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Dagelijkse automatische updates van alle prijzen</li>
                      <li>Directe links naar de officiële productpagina's</li>
                      <li>Een gebruikersfeedback systeem om foutieve prijzen te melden</li>
                      <li>Handmatige controles op grote aanbiedingen</li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-accent" />
                      <span>Hoe kan ik feedback geven over onjuiste informatie?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-2">Je kunt op verschillende manieren feedback geven:</p>
                    <ul className="list-disc pl-5 mb-2 space-y-1">
                      <li>Via het feedbackformulier onderaan deze pagina</li>
                      <li>Direct op de productpagina via de "Meld onjuiste informatie" knop</li>
                      <li>Via e-mail naar info@sterkedranksnuffelaar.nl</li>
                    </ul>
                    <p>We waarderen je feedback en gebruiken het om onze service te verbeteren!</p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-accent" />
                      <span>Verkopen jullie zelf alcohol?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Nee, wij verkopen zelf geen alcohol. Sterke Drank Snuffelaar is een onafhankelijke vergelijkingswebsite. We sturen je door naar de officiële webshops van de winkels waar je de drank kunt kopen. We ontvangen mogelijk een kleine commissie wanneer je via onze links een aankoop doet, maar dit beïnvloedt niet de prijs die je betaalt.
                    </p>
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem value="item-5">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-accent" />
                      <span>Is het gebruik van deze website veilig?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p>
                      Absoluut! We verzamelen minimale gebruikersgegevens en delen deze nooit met derden. We gebruiken veilige verbindingen (HTTPS) en slaan geen betalingsgegevens op. Als je via onze links een aankoop doet, gebruik je de beveiligde betalingssystemen van de officiële winkels.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              
              <div className="border-t pt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Nog vragen of feedback?</h2>
                  <button 
                    onClick={() => setOpenFeedback(!openFeedback)}
                    className="text-accent hover:underline"
                  >
                    {openFeedback ? 'Verbergen' : 'Feedback geven'}
                  </button>
                </div>
                
                {openFeedback && (
                  <div className="border rounded-lg p-6 mb-8">
                    <FeedbackForm />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FAQ;
