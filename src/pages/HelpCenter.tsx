import { useState } from "react";
import { Search, HelpCircle, Mail, Phone } from "lucide-react";
import { faqs } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HelpCenter = () => {
  const [search, setSearch] = useState("");

  const filtered = faqs.filter(
    f => f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container-main py-6 sm:py-10 max-w-3xl">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h1 className="text-2xl font-bold text-foreground">Help Center</h1>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search for help..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="pl-11 h-12 text-base rounded-lg"
        />
      </div>

      <section className="mb-10">
        <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions</h2>
        <Accordion type="single" collapsible className="bg-card border rounded-lg overflow-hidden">
          {filtered.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-b last:border-0">
              <AccordionTrigger className="px-4 py-3 text-sm text-left hover:no-underline hover:bg-accent/50">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground py-8">No results found for "{search}"</p>
        )}
      </section>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-2">Terms & Conditions</h3>
          <p className="text-sm text-muted-foreground">View our complete terms of service and usage policies.</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-2">Privacy Policy</h3>
          <p className="text-sm text-muted-foreground">Learn how we protect and handle your data.</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <h3 className="font-semibold text-foreground mb-2">Cookie Policy</h3>
          <p className="text-sm text-muted-foreground">Information about how we use cookies.</p>
        </div>
        <div className="bg-card border rounded-lg p-6">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground">Contact Us</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-1">support@culinarymarket.com</p>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Phone className="h-3.5 w-3.5" /> 1-800-CULINARY
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
