
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import FeedbackForm from '../FeedbackForm';

interface ProductFeedbackDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productId: string;
  productName: string;
}

const ProductFeedbackDialog = ({ 
  open, 
  onOpenChange, 
  productId, 
  productName 
}: ProductFeedbackDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Meld een probleem</DialogTitle>
          <DialogDescription>
            Help ons de juistheid van onze aanbiedingen te verbeteren.
          </DialogDescription>
        </DialogHeader>
        <FeedbackForm productId={productId} productName={productName} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductFeedbackDialog;
