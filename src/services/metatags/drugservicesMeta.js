export const dynamic = "force-dynamic";

export async function GetDrugServicesMeta(url) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/service/service-view/${url}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}
