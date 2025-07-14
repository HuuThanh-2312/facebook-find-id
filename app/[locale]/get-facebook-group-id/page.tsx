import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

// --- START: ALL METADATA IS HANDLED HERE ---
export const metadata: Metadata = {
  title: "Facebook Group ID Finder - Find Any Group ID | Seedingvn.vn",
  description: "Easily find the numeric ID of any public or closed Facebook Group. Paste the group's URL into our free tool to get the Group ID for marketing or community management.",
  keywords: [
    "facebook group id", "find facebook group id", "get group id", "facebook group id finder", "how to get facebook group id"
  ],
  openGraph: {
    title: "Facebook Group ID Finder - Find Any Group ID | Seedingvn.vn",
    description: "Easily find the numeric ID of any public or closed Facebook Group. Paste the group's URL into our free tool to get the Group ID for marketing or community management.",
    images: [
      {
        url: "/get-facebook-group-id.png", // TODO: Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Facebook Group ID Finder - Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Group ID Finder - Find Any Group ID | Seedingvn.vn",
    description: "Easily find the numeric ID of any public or closed Facebook Group. Paste the group's URL into our free tool to get the Group ID for marketing or community management.",
    images: ["/get-facebook-group-id.png"], // TODO: Replace with your actual Twitter image
  },
  other: {
    "application-ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I find the ID of a closed or private group?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our tool can find the ID of both public and closed groups, provided that you are a member of that closed group. If you are not a member, our system cannot access it to retrieve the ID due to Facebook's privacy policies."
            }
          },
          {
            "@type": "Question",
            "name": "Why is the ID I got not working?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Please make sure you copied the URL of the group's main page (e.g., facebook.com/groups/GroupName...), not the URL of a specific post within the group. If you need to get a post ID, please use our dedicated Post ID Finder tool."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Facebook Group ID Finder - Seedingvn.vn",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperTool",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.7",
          "reviewCount": "195"
        }
      }
    ])
  }
};
// --- END: METADATA SECTION ---

export default function GetFacebookGroupIdPage() {
  return (
    <section className="flex flex-col items-start space-y-12 w-full">
      <div className="max-w-full text-left space-y-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
          Facebook Group ID Finder
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Find the unique numeric ID of any Facebook Group, whether it's public or closed. Seedingvn.vn's tool provides the accurate Group ID you need to manage and grow your community.
        </p>
      </div>
      <IdExtractorForm type="group" />
      <div className="w-full mt-8 flex justify-center">
        <Slideshow images={slideshowImages} interval={6000} />
      </div>
      <div className="w-full space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              How do I find the ID of a closed or private group?
            </AccordionTrigger>
            <AccordionContent>
              Our tool can find the ID of both public and closed groups, provided that you are a member of that closed group. If you are not a member, our system cannot access it to retrieve the ID due to Facebook's privacy policies.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Why is the ID I got not working?
            </AccordionTrigger>
            <AccordionContent>
              Please make sure you copied the URL of the group's main page (e.g., facebook.com/groups/GroupName...), not the URL of a specific post within the group. If you need to get a post ID, please use our dedicated Post ID Finder tool.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full">
        <ExpandableContent
          title="What is a Facebook Group ID?"
          content={`<h2 class='text-xl font-bold mt-4 mb-2'>What is a Facebook Group ID?</h2>
<p>Every Facebook Group is assigned a unique numerical identifier, known as the Group ID. This number is a permanent identifier for the community. Even if the group's name or custom URL changes, its ID will always remain the same.</p>

<h2 class='text-xl font-bold mt-6 mb-2'>Why Do You Need a Facebook Group ID?</h2>
<p>Getting a group's ID is a common requirement for community managers and marketers. Key use cases include:</p>
<ul class='list-disc pl-6'>
  <li><strong>Community Management:</strong> Many third-party tools require a Group ID to automate post approvals, filter members, or analyze group activity.</li>
  <li><strong>Marketing & Advertising:</strong> The ID can be used with supporting tools to create custom audiences from group members for targeted Facebook ad campaigns.</li>
  <li><strong>Community Analytics:</strong> Use the ID to track a community's growth, engagement rates, and other important metrics.</li>
</ul>

<h2 class='text-xl font-bold mt-6 mb-2'>How to Get a Facebook Group ID?</h2>
<p>Looking for <strong>how to get a group id</strong>? Our tool makes it incredibly simple. Just follow these 3 steps:</p>
<ol class='list-decimal pl-6'>
  <li><strong>Step 1: Copy the Group's URL:</strong> Navigate to the main page of the Facebook group you want the ID for. Copy the full URL from your browser's address bar.</li>
  <li><strong>Step 2: Paste the URL into the Tool:</strong> Return to this page and paste the copied URL into the input box above.</li>
  <li><strong>Step 3: Get the Group ID:</strong> Click the "Find ID" button. The correct Group ID will be displayed instantly.</li>
</ol>
`}
          className="shadow-lg border border-border"
          readMoreText="Read More"
          collapseText="Collapse Content"
        />
      </div>
    </section>
  );
} 