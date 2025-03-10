
import { useState } from 'react';
import { toast } from "sonner";
import { motion } from 'framer-motion';
import { Send, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FeedbackFormProps {
  productId?: string;
  productName?: string;
}

const FeedbackForm = ({ productId, productName }: FeedbackFormProps) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [type, setType] = useState<'general' | 'error' | 'suggestion'>('general');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Hier zou in een echte implementatie de feedback naar de server worden gestuurd
    console.log('Feedback verstuurd:', { 
      name, 
      email, 
      message, 
      type, 
      productId, 
      productName 
    });

    toast.success("Bedankt voor je feedback!");
    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
      setType('general');
      setIsSubmitted(false);
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {isSubmitted ? (
        <div className="text-center py-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 mb-4">
            <Check className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Feedback ontvangen!</h3>
          <p className="text-muted-foreground">
            Bedankt voor je bijdrage aan de verbetering van onze website.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {productName && (
            <div className="p-3 bg-muted rounded-md text-sm">
              <span className="font-medium">Product feedback voor:</span> {productName}
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Naam</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Jouw naam"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jouw@email.nl"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="type">Type feedback</Label>
            <div className="flex flex-wrap gap-2">
              <Button
                type="button"
                variant={type === 'general' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType('general')}
              >
                Algemeen
              </Button>
              <Button
                type="button"
                variant={type === 'error' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType('error')}
                className={type === 'error' ? 'bg-destructive text-destructive-foreground' : ''}
              >
                <AlertTriangle className="w-3 h-3 mr-1" /> 
                Foutieve info
              </Button>
              <Button
                type="button"
                variant={type === 'suggestion' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setType('suggestion')}
              >
                Suggestie
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="message">Bericht</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={type === 'error' ? "Beschrijf welke informatie niet klopt..." : "Jouw feedback..."}
              required
              rows={5}
            />
          </div>
          
          <Button type="submit" disabled={isSubmitting} className="w-full mt-4">
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Versturen...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Feedback versturen
              </span>
            )}
          </Button>
        </form>
      )}
    </motion.div>
  );
};

export default FeedbackForm;
