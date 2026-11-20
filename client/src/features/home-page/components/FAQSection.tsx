import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger
} from "@/components/ui/accordion";
import SectionHeading from "./SectionHeading";

const faqs = [
    {
        question: "Do I need an account to try EventSphere AI?",
        answer:
            "No, you can try EventSphere AI instantly as a guest without creating an account or providing a credit card.",
    },
    {
        question: "What can guests do?",
        answer:
            "Guests can create and edit events, manage attendee lists, and check guests in during an event.",
    },
    {
        question: "Do my attendees need to sign up?",
        answer:
            "No. Attendees can be added to your guest list without creating an EventSphere AI account.",
    },
    {
        question: "Can I undo a check-in?",
        answer:
            "Yes. You can undo a check-in if an attendee was checked in by mistake.",
    },
    {
        question: "What does AI Analytics show?",
        answer:
            "AI Analytics provides attendance insights, arrival patterns, turnout statistics, and plain-language summaries of your event.",
    },
];

export default function FAQSection() {
    return (
        <section className="gray-container landing-section lg:border-t">
            <div className="landing-container">

                <SectionHeading
                    title="Frequently asked questions"
                    description="Clear answers about using EventSphere AI for your next gathering."
                />

                <Accordion
                    defaultValue={["faq-0"]}
                    className="mx-auto max-w-3xl space-y-3"
                >

                    {faqs.map((faq, index) => (
                        <AccordionItem
                            key={faq.question}
                            value={`faq-${index}`}
                            className="rounded-lg border bg-card px-5 shadow-sm last:border-b"
                        >
                            <AccordionTrigger className="body-medium py-5 text-left hover:no-underline">
                                {faq.question}
                            </AccordionTrigger>

                            <AccordionContent className="body-regular pb-5 leading-relaxed text-muted-foreground">
                                {faq.answer}
                            </AccordionContent>
                        </AccordionItem>
                    ))}

                </Accordion>
            </div>
        </section>
    );
}