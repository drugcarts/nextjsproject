// services/categoryService.js

// export async function getCategoryData(page = 1, limit = 8, search = "") {
//   const res = await fetch(
//     `http://localhost:3000/api/category/first-letter?search=${search}&page=${page}&limit=${limit}&cat_type=prescriptions`,
//     {
//       headers: {
//         "User-Agent": "Mozilla/5.0",
//         Accept: "application/json",
//       },
//       next: { revalidate: 60 }, // ISR
//     }
//   );

//   if (!res.ok) throw new Error("Failed to fetch category data");

//   return res.json();
// }
// services/categoryService.js
export const dynamic = "force-dynamic";

export async function getCategoryData(search, page, limit) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/first-letter?search=${search}&page=${page}&limit=${limit}&cat_type=prescriptions`,
      { cache: "force-cache" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { categories: [] };
  }
}

export async function getMedicineBannerData(url) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/pagebannerlist/view/${url}`,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return error;
  }
}

// export async function GetCategoryUrlService(url) {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/cateurl/${url}`,
//       {
//         next: { revalidate: 60 }, // optional: cache control
//       }
//     );
//     if (!response.ok) {
//       throw new Error("Failed to fetch subcategory data");
//     }
//     return await response.json();
//   } catch (error) {
//     console.error("Subcategory fetch error:", error);
//     return [];
//   }
// }
