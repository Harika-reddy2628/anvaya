import type { MetadataRoute } from "next";
import { practices } from "./lib/site";

// Static so the GitHub Pages export can include it.
export const dynamic = "force-static";

const site = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "") + (process.env.NEXT_PUBLIC_BASE_PATH || "");
const pages: [string, number][] = [["/", 1], ["/pricing", .9], ["/services", .9], ["/project", .8], ["/work", .7], ["/about", .6], ["/studio", .6], ["/blog", .5], ["/terms", .3], ["/privacy", .3]];

/** Every public page; service pages use their slugs (the id aliases point at the same content). */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...pages.map(([path, priority]) => ({ url: site + path, changeFrequency: "monthly" as const, priority })),
    ...practices.map(p => ({ url: `${site}/services/${p.slug}`, changeFrequency: "monthly" as const, priority: p.comingSoon ? .4 : .8 })),
  ];
}
