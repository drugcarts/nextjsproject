// services/productsService.js

// export const dynamic = "force-dynamic";
export async function GetProductsUrlService(
  page = 1,
  limit,
  search = "",
  generics = ""
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product?page=${page}&limit=${limit}&search=${search}&generices=${generics}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Products with Url data fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

// category api
export async function GetCategoryService(page = 1, limit, url, search = "") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/categorys?page=${page}&limit=${limit}&cat_name=${url}&search=${search}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Products with Url data fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetSubCateProductsService(page, limit, url, search = "") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/category?page=${page}&limit=${limit}&subcat_name=${url}&search=${search}`,
      {
        next: { revalidate: 60 },
        cache: "force-cache", // optional: cache control
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Products with Url data fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetSubCategoryUrlService(url) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sub-category/subcategory/${url}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Subcategory data fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetStorageIdService(storageid) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/storage/storageid/${storageid}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    // if (!response.ok) {
    //   throw new Error("Failed to fetch Storage data");
    // }
    return await response.json();
  } catch (error) {
    console.error("Storage fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetPackageIdService(packid) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/packagelist/packid/${packid}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    return await response.json();
  } catch (error) {
    console.error("Package data fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetManufactuerService(url) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/manufactuerlist/manufacturl/${url}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    // if (!response.ok) {
    //   throw new Error("Failed to fetch Manufactuer data");
    // }
    return await response.json();
  } catch (error) {
    console.error("ManufacturerService fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}

export async function GetSideeffectGenericsService(generic_name) {
  const encodedName = encodeURIComponent(generic_name);
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/sideeffect/generic/${encodedName}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    if (!response.ok) {
      throw new Error("Failed to fetch Sideeffect generic data");
    }
    return await response.json();
  } catch (error) {
    console.error("Sideeffect Generic fetch error:", error);
    // You can throw or return fallback here based on how your component handles it
    throw error;
  }
}
