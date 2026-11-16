/**
 * PRODUCT PAGE LAYOUT  (wraps /menu/[productId])
 * Wraps the product page in a <section>. It adds no visible UI of its own;
 * the screen itself is built in ./page.tsx.
 * generateStaticParams() pre-builds one product page per menu item at build time,
 * so the pages load instantly and the production build (e.g. on Vercel) succeeds.
 */
import { Suspense } from "react";
import { foodItems } from "@/data/menu";

export function generateStaticParams() {
  return Object.values(foodItems)
    .flat()
    .map((item) => ({ productId: item.name }));
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  // Suspense lets the page read the item name from the URL in the browser (useParams)
  // without breaking the production build.
  return (
    <section>
      <Suspense>{children}</Suspense>
    </section>
  );
}
