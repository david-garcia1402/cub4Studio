import { restaurant } from "@/lib/data";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.description,
    telephone: "+55-51-99773-7548",
    priceRange: restaurant.priceRange,
    servesCuisine: ["Churrasco", "Gaúcha", "Buffet", "Pizza"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Rua José do Patrocínio, 122",
      addressLocality: "Canoas",
      addressRegion: "RS",
      postalCode: "92120-080",
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -29.94506,
      longitude: -51.1696,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating,
      reviewCount: restaurant.reviewCount,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "11:00",
      closes: "14:30",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
