// services/blogService.js
export const dynamic = "force-dynamic";
export async function getBlogData(page = 1, limit, search = "") {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog?page=${page}&limit=${limit}&search=${search}`,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { blogList: [] };
  }
}
