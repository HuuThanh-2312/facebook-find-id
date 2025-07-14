import { IdExtractorForm } from "@/components/id-extractor-form";
import { Slideshow } from "@/components/slideshow";
import { slideshowImages } from "@/lib/slideshow-images";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ExpandableContent } from "@/components/expandable-content";
import type { Metadata } from "next";

// --- START: ALL METADATA IS HANDLED HERE ---
export const metadata: Metadata = {
  title: "Facebook Post ID Finder - Instantly Get Any Post ID | Seedingvn.vn",
  description: "A free tool to find the numeric ID of any public Facebook post, video, or reel. Just paste the post's URL to get the Post ID for ads, tracking, or APIs.",
  keywords: [
    "facebook post id", "get post id", "find facebook post id", "facebook post id finder", "facebook post url to id", "facebook video id", "facebook reel id"
  ],
  openGraph: {
    title: "Facebook Post ID Finder - Instantly Get Any Post ID | Seedingvn.vn",
    description: "A free tool to find the numeric ID of any public Facebook post, video, or reel. Just paste the post's URL to get the Post ID for ads, tracking, or APIs.",
    images: [
      {
        url: "/get-facebook-post-id.png", // TODO: Replace with your actual OG image
        width: 1200,
        height: 630,
        alt: "Facebook Post ID Finder - Seedingvn.vn"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Facebook Post ID Finder - Instantly Get Any Post ID | Seedingvn.vn",
    description: "A free tool to find the numeric ID of any public Facebook post, video, or reel. Just paste the post's URL to get the Post ID for ads, tracking, or APIs.",
    images: ["/get-facebook-post-id.png"], // TODO: Replace with your actual Twitter image
  },
  other: {
    "application-ld+json": JSON.stringify([
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How do I get the direct link to a specific Facebook post?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The easiest way is to find the post on Facebook and simply click on the date or time it was published (e.g., \"July 14 at 10:30 AM\"). This action will take you to the post's unique URL."
            }
          },
          {
            "@type": "Question",
            "name": "Will this work for posts in private or closed groups?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Generally, no. For posts in private groups or on restricted profiles, our system cannot access the content to retrieve the ID. This tool works best for public posts."
            }
          },
          {
            "@type": "Question",
            "name": "Is a video or reel ID the same as a Post ID?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. For technical and API purposes, Facebook treats videos and reels as types of \"posts\". You can use this tool to get the ID for regular posts, photos, videos, and reels."
            }
          }
        ]
      },
      {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Facebook Post ID Finder - Seedingvn.vn",
        "operatingSystem": "Web",
        "applicationCategory": "DeveloperTool",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "reviewCount": "351"
        }
      }
    ])
  }
};
// --- END: METADATA SECTION ---

export default function GetFacebookPostIdPage() {
  return (
    <section className="flex flex-col items-start space-y-12 w-full">
      <div className="max-w-full text-left space-y-4">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
          Facebook Post ID Finder
        </h1>
        <p className="text-sm md:text-base text-muted-foreground max-w-4xl">
          Easily find the ID or UID of any public Facebook post, video, or reel. Our tool at Seedingvn.vn helps you get the unique identifier you need in seconds.
        </p>
      </div>
      <IdExtractorForm type="post" />
      <div className="w-full mt-8 flex justify-center">
        <Slideshow images={slideshowImages} interval={6000} />
      </div>
      <div className="w-full space-y-6">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              How do I get the direct link to a specific Facebook post?
            </AccordionTrigger>
            <AccordionContent>
              The easiest way is to find the post on Facebook and simply click on the date or time it was published (e.g., "July 14 at 10:30 AM"). This action will take you to the post's unique URL.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Will this work for posts in private or closed groups?
            </AccordionTrigger>
            <AccordionContent>
              Generally, no. For posts in private groups or on restricted profiles, our system cannot access the content to retrieve the ID. This tool works best for public posts.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger className="text-base md:text-lg font-semibold">
              Is a video or reel ID the same as a Post ID?
            </AccordionTrigger>
            <AccordionContent>
              Yes. For technical purposes, Facebook treats videos and reels as types of "posts". You can use this tool to get the ID for regular posts, photos, videos, and reels.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div className="w-full">
        <ExpandableContent
          title="What is a Facebook Post ID?"
          content={`<h2 class='text-xl font-bold mt-4 mb-2'>What is a Facebook Post ID?</h2>
<p>Every piece of content published on Facebook, whether it's a status update, a photo, a video, or a reel, is assigned a unique numerical identifier called a Post ID. This ID ensures that every post can be uniquely identified by Facebook's systems and third-party applications.</p>

<h2 class='text-xl font-bold mt-6 mb-2'>How to Find a Post ID on Facebook?</h2>
<p>Our tool makes it simple to get the ID for any post. Follow these three easy steps:</p>
<ol class='list-decimal pl-6'>
  <li><strong>Step 1: Find & Copy the Post's URL:</strong> The most reliable way is to click on the post's timestamp (e.g., "5h ago" or "July 14"). This will open the post on its own dedicated page. Copy the URL from your browser's address bar.</li>
  <li><strong>Step 2: Paste the URL into the Finder:</strong> Return to this page and paste the link into the input box above.</li>
  <li><strong>Step 3: Get the Post ID:</strong> Click the "Find ID" button. The accurate Post ID will be displayed instantly for you to copy.</li>
</ol>

<h2 class='text-xl font-bold mt-6 mb-2'>Why Do You Need to Get a Post ID?</h2>
<p>Finding a post's ID is essential for many marketing and development tasks:</p>
<ul class='list-disc pl-6'>
  <li><strong>For Facebook Ads:</strong> To run a "Post Engagement" campaign on an existing, high-performing post instead of creating a new ad from scratch.</li>
  <li><strong>For Website Embedding:</strong> To display a specific Facebook post directly on your website or blog.</li>
  <li><strong>For Data Analytics:</strong> To use a post's ID with third-party tools to track its performance, comments, and reactions.</li>
  <li><strong>For Development:</strong> To fetch specific data about a post (like comments or reactions) using the Facebook Graph.</li>
</ul>
`}
          className="shadow-lg border border-border"
          readMoreText="Read More"
          collapseText="Collapse Content"
        />
      </div>
    </section>
  );
} 