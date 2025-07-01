export const dynamic = "force-dynamic";
export async function getProductsByType(page = 1, limit = 8, type) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/type?page=${page}&limit=${limit}&type=${type}`,
      { cache: "no-store" } // or 'force-cache' if you want caching
    );
    console.log(res, "RESSSS");
    return await res.json();
  } catch (error) {
    return { products: [] };
  }
}

// export async function GetProductTypeServiceSSR(page = 1, limit = 8, type) {
//   try {
//     const res = await fetch(
//       `http://localhost:3000/api/product/type?page=${page}&limit=${limit}&type=${type}`,
//       { cache: 'no-store' } // or 'force-cache' if you want caching
//     );
//     console.log(res, 'SSSS');
//     return await res.json();
//   } catch (error) {
//     console.error('SSR fetch failed:', error);
//     return { products: [] };
//   }
// }

// services/productService.js
// export const GetProductTypeService = (page, limit, type) => async (dispatch) => {
//   try {
//     dispatch({ type: 'PRODUCT_TYPE_FETCH_START' });

//     const response = await axios.get(
//       `http://localhost:3000/api/product/type?page=${page}&limit=${limit}&type=${type}`
//     );

//     dispatch({
//       type: 'PRODUCT_TYPE_FETCH_SUCCESS',
//       payload: response.data,
//     });

//     // Important: Return response here
//     return response.data;
//   } catch (error) {
//     dispatch({
//       type: 'PRODUCT_TYPE_FETCH_FAIL',
//       payload: error.message,
//     });
//     return null; // or throw error
//   }
// };

// export const GetProductTypeService = (page, limit, type) => async (dispatch) => {

// export async function GetProductTypeService(page, limit, type, dispatch) {
//   try {
//     dispatch({ type: 'FETCH_PRODUCT_TYPE_START' });
//     const res = await axios.get(
//       `http://localhost:3000/api/product/type?page=${page}&limit=${limit}&type=${type}`
//     );
//     dispatch({ type: 'FETCH_PRODUCT_TYPE_SUCCESS', payload: res.data });
//     return res.data; // so you can await it
//   } catch (error) {
//     dispatch({ type: 'FETCH_PRODUCT_TYPE_ERROR', payload: error });
//   }
// }
// services/productService.js

// export async function GetProductTypeServiceSSR(page = 1, limit = 8, type, search = '') {
//   const res = await fetch(
//     `/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
//     {
//       headers: {
//         method: 'GET',
//         'User-Agent': 'Mozilla/5.0',
//         Accept: 'application/json',
//       },
//       next: { revalidate: 60 }, // ISR
//     }
//   );

//   if (!res.ok) throw new Error('Failed to fetch category data');

//   return res.json();
// }

// services/productService.js
// import axios from 'axios';

// export const GetProductTypeService = async (page = 1, limit = 8, type) => {
//   try {
//     const res = await axios.get(
//       `http://localhost:3000/api/product/type?page=${page}&limit=${limit}&type=${type}`
//     );
//     console.log(res, 'DATA 232', type);
//     return res.data; // return just the data for SSR
//   } catch (error) {
//     console.error('SSR Product Fetch Error:', error);
//     return { products: [] }; // or handle fallback
//   }
// };

// how to include Access-Control-Allow-Origin in below code
// export async function GetProductTypeService(page, limit, type, search) {
//   try {
//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
//       { cache: "no-store", next: { revalidate: 60 } }
//       //no-store or 'force-cache' if you want caching
//     );
//     return await res.json();
//   } catch (error) {
//     console.error("SSR fetch failed:", error);
//     return { products: [] };
//   }
// }

export async function GetProductTypeService(
  page = 1,
  limit = 8,
  type = "Popular",
  search = ""
) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
      {
        next: { revalidate: 60 }, // optional: cache control
      }
    );
    console.log(response, "DATAAA");
    return await response.json();
  } catch (error) {
    console.error("Product Type fetch error:", error);
    return [];
  }
}
// type = "Best Selling"
