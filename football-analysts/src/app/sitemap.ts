import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://football-analysts.example";
  return [
    { url: `${baseUrl}/`, changeFrequency: "daily", priority: 0.8 },
    { url: `${baseUrl}/matches`, changeFrequency: "daily", priority: 0.7 },
    { url: `${baseUrl}/teams`, changeFrequency: "weekly", priority: 0.6 },
    { url: `${baseUrl}/players`, changeFrequency: "weekly", priority: 0.6 },
  ];
}

