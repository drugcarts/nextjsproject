export async function GetGenericUrlService(url) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/generic/subname?search=${url}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Generic data");
    }
    return await response.json();
  } catch (error) {
    console.error("Generic fetch error:", error);
    return [];
  }
}
