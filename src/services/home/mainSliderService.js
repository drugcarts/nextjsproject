// services/mainSliderService.js
export async function getMainSliderData(url) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/mainslider/view/${url}`,
    {
      cache: "no-store", // Optional: for SSR instead of static
    }
  );

  if (!res.ok) return [];
  const data = await res.json();
  return data;
}
