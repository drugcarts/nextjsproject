import axios from 'axios'
import { IsLoading, showToast } from '../reduxToolkit/slices/commonSlice'
import Authorization from '../utils/authorization'
import { addProduct, getProducts, getProduct, getGenericProductUrl,getManufactuerProductUrl, getProductCategory, getProductName, GetProductCats, GetPersonalCareProduct, GetFitnessProduct, GetTreatmentProduct, GetProductTypes } from '../reduxToolkit/slices/productSlice'

const PostProductService = (data, resetForm) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const postData = await axios.post('/api/product', data, { headers: await Authorization() })
        dispatch(addProduct(postData.data))
        dispatch(GetProductIdService(postData.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Created Successfully!!!", severity: "success" }))
        resetForm()
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
        dispatch(showToast({ message: error?.response?.data?.error, severity: "error" }))
    }
}

const GetProductService = (page = 1, limit, search = "", generics = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product?page=${page}&limit=${limit}&search=${search}&generices=${generics}`, { headers: await Authorization() })
        dispatch(getProducts(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductNameService = (page = 1, limit, search = "", generics = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/name?page=${page}&limit=${limit}&search=${search}`, { headers: await Authorization() })
        dispatch(getProductName(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductCategoryService = (page = 1, limit = 20, subname = "", search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/category?page=${page}&limit=${limit}&subcat_name=${subname}&search=${search}`, { headers: await Authorization() })
        dispatch(getProductCategory(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}


const GetProductCatsService = (page = 1, limit = 4, cat_name = "", search = "") => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/categorys?page=${page}&limit=${limit}&cat_name=${cat_name}&search=${search}`, { headers: await Authorization() })
        dispatch(GetProductCats(getData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductPersonalCareService = (page = 1, limit = 4) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/categorys?page=${page}&limit=${limit}&cat_name=personal-care`, { headers: await Authorization() })
        dispatch(GetPersonalCareProduct(getData.data?.catproducts))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductFitnessService = (page = 1, limit = 4) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/categorys?page=${page}&limit=${limit}&cat_name=fitness-supplement`, { headers: await Authorization() })
        dispatch(GetFitnessProduct(getData.data?.catproducts))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductTreatmentService = (page = 1, limit = 4) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getData = await axios.get(`/api/product/categorys?page=${page}&limit=${limit}&cat_name=treatment`, { headers: await Authorization() })
        dispatch(GetTreatmentProduct(getData.data?.catproducts))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true));
        const getIdData = await axios.get(`/api/product/${url}`, {
            headers: await Authorization(),
        });
        dispatch(getProduct(getIdData.data));
        dispatch(IsLoading(false));
    } catch (error) {
        dispatch(IsLoading(false));
        console.log("error", error.message);
    }
};

const GetProductIdService = (id) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/product/${id}`, { headers: await Authorization() })
        dispatch(getProduct(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const PutProductService = (id, userData) => async (dispatch) => {
    await axios.put(`/api/product/${id}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getProduct(response.data))
        dispatch(GetProductIdService(id))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const PutGenericProductStockService = (generices, userData) => async (dispatch) => {
    dispatch(IsLoading(true))
    await axios.put(`/api/product/generices/${generices}`, userData, { headers: await Authorization() }).then((response) => {
        dispatch(getProduct(response.data?._id))
        dispatch(GetProductIdService(response.data?._id))
        dispatch(IsLoading(false))
        dispatch(showToast({ message: "Updated Successfully!!!", severity: "success" }))
    }).catch((error) => {
        console.log("error", error.message)
        dispatch(IsLoading(false))
    })
}

const DeleteProductService = (id) => async (dispatch) => {
    await axios.delete(`/api/product/${id}`, { headers: await Authorization() }).then(() => {
        dispatch(getProduct(id))
        // dispatch(GetProductService())
        window.location.reload()
    }).catch((error) => {
        console.log("error", error.message)
    })
}

const GetProductGeneticUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/product/generices?search=${url}`, { headers: await Authorization() })
        dispatch(getGenericProductUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductManufactuerUrlService = (url) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/product/manufact?search=${url}`, { headers: await Authorization() })
        dispatch(getManufactuerProductUrl(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

const GetProductTypeService = (page = 1, limit = 10, type = "", search = "" ) => async (dispatch) => {
    try {
        dispatch(IsLoading(true))
        const getIdData = await axios.get(`/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`, { headers: await Authorization() })
        console.log(getIdData.data,"URP DATA",getIdData);
        dispatch(GetProductTypes(getIdData.data))
        dispatch(IsLoading(false))
    } catch (error) {
        dispatch(IsLoading(false))
        console.log("error", error.message)
    }
}

async function getBestProductTypeData(page = 1, limit = 10, type = "Best Selling", search = "" ) {
  try {
    const res = await fetch(
      `/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { products: [] };
  }
}

async function getTrendingProductTypeData(page = 1, limit = 10, type = "Tranding", search = "" ) {
  try {
    const res = await fetch(
      `/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { products: [] };
  }
}

async function getFrequentlyProductTypeData(page = 1, limit = 10, type = "Frequently", search = "" ) {
  try {
    const res = await fetch(
      `/api/product/type?page=${page}&limit=${limit}&type=${type}&search=${search}`,
      { cache: "no-store" } // no-store or 'force-cache' if you want caching
    );
    return await res.json();
  } catch (error) {
    return { products: [] };
  }
}

export { PostProductService, GetProductService, GetProductNameService, GetProductCatsService, GetProductCategoryService, GetProductUrlService, GetProductIdService, PutProductService, DeleteProductService, GetProductGeneticUrlService,GetProductManufactuerUrlService, GetProductPersonalCareService, GetProductFitnessService, GetProductTreatmentService, PutGenericProductStockService, GetProductTypeService, getBestProductTypeData, getTrendingProductTypeData, getFrequentlyProductTypeData }
