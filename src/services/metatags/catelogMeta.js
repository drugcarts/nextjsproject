export const dynamic = "force-dynamic";

export async function GetCatelogMeta(url) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/cateurl/${url}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}
