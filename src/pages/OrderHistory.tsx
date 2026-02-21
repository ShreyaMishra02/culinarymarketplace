import { useState } from "react";
import { sampleOrders, Order } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ClipboardList } from "lucide-react";

const statusStyles: Record<string, string> = {
  Processing: "bg-primary/10 text-primary",
  Shipped: "bg-success/10 text-success",
  Delivered: "bg-success text-success-foreground",
  Cancelled: "bg-destructive/10 text-destructive",
};

const OrderHistory = () => {
  const [selected, setSelected] = useState<Order | null>(null);

  return (
    <div className="container-main py-6 sm:py-10">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardList className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Order History</h1>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="text-left p-4 font-medium text-muted-foreground">Order ID</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Date</th>
                <th className="text-left p-4 font-medium text-muted-foreground hidden sm:table-cell">Products</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Points</th>
                <th className="text-left p-4 font-medium text-muted-foreground">Status</th>
              </tr>
            </thead>
            <tbody>
              {sampleOrders.map(order => (
                <tr
                  key={order.id}
                  onClick={() => setSelected(order)}
                  className="border-b last:border-0 hover:bg-accent/50 cursor-pointer transition-colors"
                >
                  <td className="p-4 font-medium text-primary">{order.id}</td>
                  <td className="p-4 text-muted-foreground">{new Date(order.date).toLocaleDateString()}</td>
                  <td className="p-4 text-muted-foreground hidden sm:table-cell">
                    {order.products.map(p => p.name).join(", ")}
                  </td>
                  <td className="p-4 font-medium">{order.totalPoints.toLocaleString()} pts</td>
                  <td className="p-4">
                    <Badge className={statusStyles[order.status]}>{order.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Sheet open={!!selected} onOpenChange={() => setSelected(null)}>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Order {selected?.id}</SheetTitle>
          </SheetHeader>
          {selected && (
            <div className="mt-6 space-y-4">
              <div className="text-sm">
                <p className="text-muted-foreground">Date</p>
                <p className="font-medium">{new Date(selected.date).toLocaleDateString()}</p>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground">Status</p>
                <Badge className={statusStyles[selected.status]}>{selected.status}</Badge>
              </div>
              <div className="text-sm">
                <p className="text-muted-foreground mb-2">Products</p>
                {selected.products.map((p, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b last:border-0">
                    <span>{p.name}</span>
                    <span className="text-muted-foreground">×{p.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="text-sm border-t pt-3">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span className="text-primary">{selected.totalPoints.toLocaleString()} pts</span>
                </div>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default OrderHistory;
