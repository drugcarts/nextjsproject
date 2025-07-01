export const dynamic = "force-dynamic";

export async function getProductDetails(url) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${url}`,
      {
        cache: "no-store", // SSR
      }
    );

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch product:", error);
    return null;
  }
}
