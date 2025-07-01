export const dynamic = "force-dynamic";

export async function GetGenericIndexMeta(url) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-category/subcategory/${url}`,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}
