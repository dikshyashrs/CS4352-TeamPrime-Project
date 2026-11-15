/**
 * PRODUCT PAGE LAYOUT  (wraps /menu/[productId])
 * Wraps the product page in a <section>. It adds no visible UI of its own;
 * the screen itself is built in ./page.tsx.
 */
export default async function ProductLayout({
    children,
    params,
  }: {
    children: React.ReactNode
    params: Promise<{ productId: string }>
  }) {
    const { productId } = await params;
    return <section>{children}</section>
  }