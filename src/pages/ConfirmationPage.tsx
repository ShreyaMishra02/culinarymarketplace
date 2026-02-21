import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const ConfirmationPage = () => (
  <div className="container-main py-16 sm:py-24 text-center max-w-lg mx-auto">
    <div className="h-16 w-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
      <CheckCircle className="h-8 w-8 text-success" />
    </div>
    <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
      Your order has been successfully placed
    </h1>
    <p className="text-muted-foreground mb-2">
      Thank you for your order! You'll receive a confirmation email shortly.
    </p>
    <p className="text-sm text-muted-foreground mb-8">
      Order ID: ORD-{Math.floor(10000 + Math.random() * 90000)}
    </p>
    <div className="flex flex-col sm:flex-row gap-3 justify-center">
      <Button asChild variant="outline" className="h-11 rounded-lg">
        <Link to="/order-history">View Order History</Link>
      </Button>
      <Button asChild className="h-11 rounded-lg gap-2">
        <Link to="/">Continue Shopping <ArrowRight className="h-4 w-4" /></Link>
      </Button>
    </div>
  </div>
);

export default ConfirmationPage;
