import { hours, restaurant } from "@/lib/restaurant";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    name: restaurant.name,
    description: restaurant.blurb,
    servesCuisine: "Mediterranean",
    priceRange: "$$$",
    telephone: "+55-51-3072-2882",
    address: {
      "@type": "PostalAddress",
      streetAddress: "R. Sarmento Leite, 969",
      addressLocality: "Porto Alegre",
      addressRegion: "RS",
      postalCode: restaurant.cep,
      addressCountry: "BR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -30.037,
      longitude: -51.224,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: restaurant.rating,
      reviewCount: restaurant.reviewCount,
    },
    openingHoursSpecification: hours
      .filter((h) => h.time !== "Fechado")
      .map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.day,
        opens: "19:00",
        closes: "00:00",
      })),
    acceptsReservations: true,
    hasMenu: restaurant.menuLink,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
