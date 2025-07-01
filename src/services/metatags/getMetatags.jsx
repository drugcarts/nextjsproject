// lib/getMetatags.jsx

export async function getMetatags(slug) {
  if (!slug) {
    throw new Error("Slug is required");
  }
  const url = `https://main.diinz06zqqfgz.amplifyapp.com/api/metatags/metatags-view/${slug}`;
  try {
    const res = await fetch(
      url,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { post: [] };
  }
}
