import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find My Facebook ID (Page & Profile) - Free ID Finder | Seedingvn.vn",
  description: "Need to find your Facebook ID? Paste any FB Page or Profile URL to get the numeric ID instantly. Our free Facebook ID lookup tool is fast, accurate, and requires no login.",
  openGraph: {
    title: "Find My Facebook ID (Page & Profile) - Free ID Finder | Seedingvn.vn",
    description: "Need to find your Facebook ID? Paste any FB Page or Profile URL to get the numeric ID instantly. Our free Facebook ID lookup tool is fast, accurate, and requires no login.",
    images: [
      {
        url: "/get-facebook-page-id.png", // TODO: Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Find My Facebook ID (Page & Profile) - Free ID Finder | Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Find My Facebook ID (Page & Profile) - Free ID Finder | Seedingvn.vn",
    description: "Need to find your Facebook ID? Paste any FB Page or Profile URL to get the numeric ID instantly. Our free Facebook ID lookup tool is fast, accurate, and requires no login.",
    images: ["/get-facebook-page-id.png"] // TODO: Replace with your actual Twitter image
  },
  other: {
    "application-ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How is a Facebook ID different from a username?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "A username is a public, custom name you can set (e.g., facebook.com/YourName) and it can be changed. A Facebook ID is a permanent, numeric identifier (e.g., 10000123456789) that never changes and is used by Facebook's system. Our tool finds this permanent numeric ID."
            }
          },
          {
            "@type": "Question",
            "name": "Can I perform a Facebook ID search by name?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "To ensure 100% accuracy, our tool works with URLs instead of names. Searching by name can be unreliable as many people share the same name. The best way is to find the person's or page's profile URL and paste it here."
            }
          },
          {
            "@type": "Question",
            "name": "Does this tool work for Groups and Posts too?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "This specific tool is optimized for finding the ID of Facebook Pages and personal Profiles. To find an ID for a Group or a specific Post, please use our dedicated tools for those purposes to get the best results."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Facebook ID Finder (Page & Profile) - Seedingvn.vn",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperTool",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.9",
          "reviewCount": "218"
        }
      }
    ])
  }
};

export default function GetFacebookPageIdPage() {
  return (
    <section className="flex flex-col items-start space-y-12 w-full">
      <div className="max-w-full text-left space-y-4">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground">
          Find Your Facebook ID (for Pages & Profiles)
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Whether you need to find your own Facebook ID or the ID of a specific Page or personal Profile, our simple tool has you covered. Just paste a link to get the unique numeric ID you need for your projects.
        </p>
      </div>
      <IdExtractorForm type="page" />
      <div className="w-full mt-8 flex justify-center">
        <Slideshow images={slideshowImages} interval={6000} />
      </div>
      <div className="w-full space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              How is a Facebook ID different from a username?
            </AccordionTrigger>
            <AccordionContent>
              A username is a public, custom name you can set (e.g., facebook.com/YourName) and it can be changed. A Facebook ID is a permanent, numeric identifier (e.g., 10000123456789) that never changes and is used by Facebook's system. Our tool finds this permanent numeric ID.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Can I perform a Facebook ID search by name?
            </AccordionTrigger>
            <AccordionContent>
              To ensure 100% accuracy, our tool works with URLs instead of names. Searching by name can be unreliable as many people share the same name. The best way is to find the person's or page's profile URL and paste it here.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Does this tool work for Groups and Posts too?
            </AccordionTrigger>
            <AccordionContent>
              This specific tool is optimized for finding the ID of Facebook Pages and personal Profiles. To find an ID for a Group or a specific Post, please use our dedicated tools for those purposes to get the best results.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full">
        <ExpandableContent
          title="What is a Facebook ID?"
          content={`<h2 class='text-xl font-bold mt-4 mb-2'>What is a Facebook ID?</h2>
<p>A Facebook ID is a unique number assigned to every object on the platform, including personal Profiles, Pages, Groups, and Posts. This ID acts as a permanent identifier. Even if you change your name or username, your numeric Facebook ID will always stay the same. It's the primary way developers and applications interact with specific Facebook objects.</p>

<h2 class='text-xl font-bold mt-6 mb-2'>How Can I Find My Facebook ID With This Tool?</h2>
<p>We've made the process incredibly simple. Here's <b>how to get your Facebook ID</b> in just a few seconds:</p>
<ol class='list-decimal pl-6'>
  <li><b>Step 1: Get the URL:</b> Go to the Facebook Page or personal Profile you want to find the ID for. Copy the full URL from your browser's address bar.</li>
  <li><b>Step 2: Paste the URL:</b> Paste the copied link into the input box above.</li>
  <li><b>Step 3: Get Your ID:</b> Click the "Find ID" button. Our <b>facebook id search</b> tool will instantly process the link and display the correct numeric ID.</li>
</ol>

<h2 class='text-xl font-bold mt-6 mb-2'>Common Uses for a Facebook ID</h2>
<p>Getting a Facebook ID is often the first step for many technical and marketing tasks:</p>
<ul class='list-disc pl-6'>
  <li><b>For Developers:</b> Using the Graph API, integrating social plugins (like comments or like boxes), and setting up Facebook Login for apps.</li>
  <li><b>For Marketers:</b> Setting up specific ad campaigns, creating custom audiences, or using third-party analytics tools that require a Page ID.</li>
  <li><b>For App Integrations:</b> Connecting your Facebook account to other applications or services that require your unique identifier.</li>
</ul>
<hr class='my-6' />
<div class='text-xs text-muted-foreground mt-4'>
  <b>Reference keywords:</b> find my facebook id, get facebook id, facebook id finder, facebook page id finder, facebook id lookup, how to find facebook id, get my fb id, facebook id search, fb id checker.
</div>
`}
          className="shadow-lg border border-border"
          readMoreText="Read More"
          collapseText="Collapse Content"
        />
      </div>
    </section>
  );
}