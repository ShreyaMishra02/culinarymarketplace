import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Minus, Plus, ShoppingCart, AlertTriangle, ArrowLeft, Check, Heart, ChevronDown, ChevronUp, Star, CalendarIcon, MapPin, Clock } from "lucide-react";
import { format } from "date-fns";
import { products, categories, ProductOption } from "@/data/mockData";
import { useCart } from "@/context/CartContext";
import { useFavorites } from "@/context/FavoritesContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

const badgeStyles: Record<string, string> = {
  bestseller: "bg-foreground text-background",
  featured: "bg-primary text-primary-foreground",
  new: "bg-success text-success-foreground",
  discount: "bg-destructive text-destructive-foreground",
  "great-deals": "bg-[hsl(38,92%,50%)] text-secondary",
};
const badgeLabels: Record<string, string> = { bestseller: "Best Seller", featured: "Featured", new: "New Product", discount: "Discount", "great-deals": "Great Deals" };

const OptionRow = ({ option, product }: { option: ProductOption; product: typeof products[0] }) => {
  const [expanded, setExpanded] = useState(false);
  const [qty, setQty] = useState(1);
  const [date, setDate] = useState<Date>();
  const [showModal, setShowModal] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAdd = () => {
    addToCart(product, qty, option, date ? format(date, "yyyy-MM-dd") : undefined);
    setShowModal(true);
  };

  return (
    <>
      <div className="border rounded-xl overflow-hidden">
        <button onClick={() => setExpanded(!expanded)} className="w-full flex items-center justify-between p-4 hover:bg-accent/50 transition-colors text-left">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">{option.title}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{option.description}</p>
          </div>
          <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="font-semibold text-primary text-sm">{option.points.toLocaleString()} pts</span>
            {expanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </div>
        </button>
        {expanded && (
          <div className="border-t p-4 bg-muted/30 space-y-3">
            {option.requiresDate && (
              <div>
                <label className="text-xs font-medium text-foreground mb-1.5 block">Select Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className={cn("w-full sm:w-[240px] justify-start text-left text-sm font-normal", !date && "text-muted-foreground")}>
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={date} onSelect={setDate} disabled={(d) => d < new Date()} initialFocus className="p-3 pointer-events-auto" />
                  </PopoverContent>
                </Popover>
              </div>
            )}
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg bg-card">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-accent transition-colors rounded-l-lg"><Minus className="h-3.5 w-3.5" /></button>
                <span className="px-3 text-sm font-medium min-w-[32px] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-accent transition-colors rounded-r-lg"><Plus className="h-3.5 w-3.5" /></button>
              </div>
              <Button onClick={handleAdd} size="sm" className="gap-2" disabled={option.requiresDate && !date}>
                <ShoppingCart className="h-3.5 w-3.5" />
                Add – {(option.points * qty).toLocaleString()} pts
              </Button>
            </div>
          </div>
        )}
      </div>
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center"><Check className="h-4 w-4 text-success" /></div>
              Product added to cart
            </DialogTitle>
          </DialogHeader>
          <div className="flex items-center gap-3 py-3">
            <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
            <div>
              <p className="text-sm font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground">{option.title}</p>
              <p className="text-sm text-muted-foreground">Qty: {qty} · {(option.points * qty).toLocaleString()} pts</p>
            </div>
          </div>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Keep Shopping</Button>
            <Button className="flex-1" onClick={() => { setShowModal(false); navigate("/cart"); }}>Go to Cart</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ReviewCard = ({ review }: { review: { author: string; rating: number; date: string; comment: string } }) => (
  <div className="bg-card border rounded-xl p-4 min-w-[280px] shrink-0">
    <div className="flex items-center gap-2 mb-2">
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className={`h-3.5 w-3.5 ${i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
        ))}
      </div>
      <span className="text-xs text-muted-foreground">{review.date}</span>
    </div>
    <p className="text-sm text-foreground mb-1 font-medium">{review.author}</p>
    <p className="text-sm text-muted-foreground">{review.comment}</p>
  </div>
);

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find(p => p.id === id);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [qty, setQty] = useState(1);
  const [showModal, setShowModal] = useState(false);

  if (!product) {
    return (
      <div className="container-main py-20 text-center">
        <h1 className="text-2xl font-semibold">Product not found</h1>
        <Link to="/" className="text-primary mt-4 inline-block">Go home</Link>
      </div>
    );
  }

  const category = categories.find(c => c.id === product.categoryId);
  const isExperience = product.type === "experience" || product.type === "multi-option";
  const hasOptions = product.type === "multi-option" || (product.type === "experience" && product.options && product.options.length > 0);

  const handleAdd = () => {
    addToCart(product, qty);
    setShowModal(true);
  };

  return (
    <div className="container-main py-6 sm:py-10">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
        <span>/</span>
        {category && (
          <>
            <Link to={`/category/${category.slug}`} className="hover:text-foreground transition-colors">{category.name}</Link>
            <span>/</span>
          </>
        )}
        <span className="text-foreground truncate max-w-[200px]">{product.name}</span>
      </nav>

      <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
        <ArrowLeft className="h-4 w-4" /> Results
      </button>

      {/* Experience-style header for experience/multi-option */}
      {isExperience && (
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">{product.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-muted-foreground">
            {product.location && (
              <span className="flex items-center gap-1"><MapPin className="h-4 w-4" />{product.location}</span>
            )}
            {product.duration && (
              <span className="flex items-center gap-1"><Clock className="h-4 w-4" />{product.duration}</span>
            )}
            {product.rating && (
              <span className="flex items-center gap-1">
                <Star className="h-4 w-4 text-primary fill-primary" /> {product.rating}
              </span>
            )}
          </div>
          {hasOptions && (
            <div className="flex items-center gap-2 mt-3">
              <span className="text-muted-foreground text-sm">From</span>
              <span className="text-2xl font-bold text-foreground">{Math.min(...(product.options?.map(o => o.points) || [product.points])).toLocaleString()}</span>
              <span className="text-lg text-foreground">points</span>
            </div>
          )}
        </div>
      )}

      <div className={isExperience ? "" : "grid lg:grid-cols-2 gap-8 lg:gap-12"}>
        {/* Image section */}
        <div>
          {!isExperience && (
            <div className="relative aspect-square rounded-xl overflow-hidden bg-muted">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              {product.badges.length > 0 && (
                <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                  {product.badges.map(b => (
                    <Badge key={b} className={badgeStyles[b]}>{badgeLabels[b]}</Badge>
                  ))}
                </div>
              )}
              <button onClick={() => toggleFavorite(product.id)} className="absolute top-3 right-3 h-10 w-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center hover:bg-card transition-colors">
                <Heart className={`h-5 w-5 ${isFavorite(product.id) ? "fill-destructive text-destructive" : "text-muted-foreground"}`} />
              </button>
            </div>
          )}

          {/* Horizontal image gallery for experiences */}
          {isExperience && product.images && product.images.length > 0 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {product.images.map((img, i) => (
                <img key={i} src={img} alt={`${product.name} ${i + 1}`} className="h-40 sm:h-52 rounded-xl object-cover shrink-0 border-2 border-transparent hover:border-primary cursor-pointer transition-colors" />
              ))}
            </div>
          )}
          {isExperience && (
            <p className="text-xs text-muted-foreground text-center mt-2 italic">Images are for representation only.</p>
          )}
        </div>

        {/* Info */}
        <div className={isExperience ? "mt-6" : ""}>
          {!isExperience && (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wide">{product.brand}</p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground mt-1">{product.name}</h1>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Product Code: {product.productCode}</p>
              {product.modelNumber && <p className="text-sm text-muted-foreground">Model: {product.modelNumber}</p>}
              <p className="text-3xl font-bold text-primary mt-4">{product.points.toLocaleString()} pts</p>
            </>
          )}

          {product.alert && (
            <div className="flex items-start gap-2 bg-destructive/10 text-destructive p-3 rounded-lg mt-4 text-sm">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              {product.alert}
            </div>
          )}

          {/* Overview */}
          {isExperience && product.overview && (
            <div className="border rounded-xl p-6 mt-4">
              <h3 className="text-lg font-semibold text-foreground mb-3">Overview</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{product.overview}</p>
            </div>
          )}

          {/* Multi-option: Purchasable options */}
          {hasOptions && product.options && (
            <div className="border-t mt-6 pt-6">
              <h3 className="text-lg font-semibold text-foreground mb-3">Available Bookings</h3>
              <div className="space-y-2">
                {product.options.map(opt => (
                  <OptionRow key={opt.id} option={opt} product={product} />
                ))}
              </div>
            </div>
          )}

          {/* Accordion sections for experience products */}
          {isExperience && (
            <Accordion type="multiple" className="mt-6">
              {product.inclusions && product.inclusions.length > 0 && (
                <AccordionItem value="inclusions">
                  <AccordionTrigger className="text-base font-semibold">Inclusions</AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1.5">
                      {product.inclusions.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="h-3.5 w-3.5 text-success shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              )}
              {product.additionalInfo && (
                <AccordionItem value="additional">
                  <AccordionTrigger className="text-base font-semibold">Additional Information</AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{product.additionalInfo}</p>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          )}

          {/* Experience Policies */}
          {isExperience && product.experiencePolicies && (
            <div className="border rounded-xl p-6 mt-6 bg-muted/30">
              <h3 className="text-lg font-semibold text-foreground mb-3">Experience Policies</h3>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">{product.experiencePolicies}</p>
            </div>
          )}

          {/* Standard info sections */}
          {!isExperience && (
            <div className="border-t mt-6 pt-6 space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Description</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Delivery</h3>
                <p className="text-sm text-muted-foreground">{product.deliveryInfo}</p>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-foreground mb-1">Cancellation Policy</h3>
                <p className="text-sm text-muted-foreground">{product.cancellationPolicy}</p>
              </div>
            </div>
          )}

          {/* Standard product: quantity + add to cart */}
          {!hasOptions && (
            <div className="border-t mt-6 pt-6">
              <div className="flex items-center gap-4 mb-4">
                <span className="text-sm font-medium text-foreground">Quantity</span>
                <div className="flex items-center border rounded-lg">
                  <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-2 hover:bg-accent transition-colors rounded-l-lg"><Minus className="h-4 w-4" /></button>
                  <span className="px-4 text-sm font-medium min-w-[40px] text-center">{qty}</span>
                  <button onClick={() => setQty(qty + 1)} className="p-2 hover:bg-accent transition-colors rounded-r-lg"><Plus className="h-4 w-4" /></button>
                </div>
              </div>
              <Button onClick={handleAdd} className="w-full h-12 rounded-lg text-sm font-medium gap-2">
                <ShoppingCart className="h-4 w-4" />
                Add to Cart – {(product.points * qty).toLocaleString()} pts
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {isExperience && product.reviews && product.reviews.length > 0 && (
        <div className="border-t mt-10 pt-8">
          <div className="flex items-center gap-6 mb-6">
            <div>
              <div className="text-4xl font-bold text-foreground">{product.rating || "4.0"}</div>
              <div className="text-sm text-muted-foreground">Stars</div>
              <div className="text-xs text-muted-foreground">{product.reviews.length} Reviews</div>
              <div className="flex mt-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < (product.rating || 4) ? "text-primary fill-primary" : "text-muted-foreground/30"}`} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
            {product.reviews.map((review, i) => (
              <ReviewCard key={i} review={review} />
            ))}
          </div>
        </div>
      )}

      {/* Standard added-to-cart modal */}
      {!hasOptions && (
        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-success/10 flex items-center justify-center"><Check className="h-4 w-4 text-success" /></div>
                Product added to cart
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center gap-3 py-3">
              <img src={product.image} alt={product.name} className="h-16 w-16 rounded-md object-cover" />
              <div>
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-muted-foreground">Qty: {qty} · {(product.points * qty).toLocaleString()} pts</p>
              </div>
            </div>
            <div className="flex gap-3 mt-2">
              <Button variant="outline" className="flex-1" onClick={() => setShowModal(false)}>Keep Shopping</Button>
              <Button className="flex-1" onClick={() => { setShowModal(false); navigate("/cart"); }}>Go to Cart</Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ProductDetail;
