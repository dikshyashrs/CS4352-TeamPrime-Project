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