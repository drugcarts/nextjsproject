export async function GetSubCategoryUrlService(url) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-category/catname/${url}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    if (!response.ok) {
      throw new Error("Failed to fetch subcategory data");
    }
    return await response.json();
  } catch (error) {
    console.error("Subcategory fetch error:", error);
    return [];
  }
}
