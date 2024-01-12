import Navbar from "@/components/Navbar";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import React from "react";

interface pageProps {}

const page: React.FC<pageProps> = ({}) => {
    return (
        <main className="flex min-h-screen flex-col items-center">
            <Navbar />
            <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How do I submit a kill?
                    </AccordionTrigger>
                    <AccordionContent>
                        Text a picture of the kill with your name to +1 917-346-6948.
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </main>
    )
};

export default page;
