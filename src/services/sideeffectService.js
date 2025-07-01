import axios from "axios";
import { IsLoading, showToast } from "../reduxToolkit/slices/commonSlice";
import Authorization from "../utils/authorization";
import {
  addSideeffect,
  getSideeffects,
  getSideeffect,
  getSideeffectGeneric,
} from "../reduxToolkit/slices/sideeffectSlice";

const PostSideeffectService = (data, resetForm) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const postData = await axios.post("/api/sideeffect", data, {
      headers: await Authorization(),
    });
    dispatch(addSideeffect(postData.data));
    // dispatch(GetCategoryIdService(postData.data?._id))
    dispatch(IsLoading(false));
    dispatch(
      showToast({ message: "Created Successfully!!!", severity: "success" })
    );
    resetForm();
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
    dispatch(
      showToast({ message: error?.response?.data?.error, severity: "error" })
    );
  }
};

const GetSideeffectService =
  (page = 1, limit, search = "") =>
  async (dispatch) => {
    try {
      dispatch(IsLoading(true));
      const getData = await axios.get(
        `/api/sideeffect?page=${page}&limit=${limit}&search=${search}&cat_type=prescriptions`,
        { headers: await Authorization() }
      );
      dispatch(getSideeffects(getData.data));
      dispatch(IsLoading(false));
    } catch (error) {
      dispatch(IsLoading(false));
      console.log("error", error.message);
    }
  };

const GetSideeffectIdService = (id) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(`/api/sideeffect/${id}`, {
      headers: await Authorization(),
    });
    dispatch(getSideeffect(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const GetSideeffectGenericService = (generic_name) => async (dispatch) => {
  console.log(generic_name, "GENERIC SERVICE");
  try {
    dispatch(IsLoading(true));
    const getIdData = await axios.get(
      `/api/sideeffect/generic/${generic_name}`,
      { headers: await Authorization() }
    );
    dispatch(getSideeffectGeneric(getIdData.data));
    dispatch(IsLoading(false));
  } catch (error) {
    dispatch(IsLoading(false));
    console.log("error", error.message);
  }
};

const PutSideeffectService = (id, userData) => async (dispatch) => {
  await axios
    .put(`/api/sideeffect/${id}`, userData, { headers: await Authorization() })
    .then((response) => {
      dispatch(getSideeffect(response.data));
      dispatch(GetSideeffectIdService(id));
      dispatch(
        showToast({ message: "Updated Successfully!!!", severity: "success" })
      );
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

const DeleteSideeffectService = (id) => async (dispatch) => {
  await axios
    .delete(`/api/sideeffect/${id}`, { headers: await Authorization() })
    .then(() => {
      dispatch(getSideeffect(id));
      dispatch(GetSideeffectService());
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

export {
  PostSideeffectService,
  GetSideeffectService,
  GetSideeffectIdService,
  GetSideeffectGenericService,
  PutSideeffectService,
  DeleteSideeffectService,
};
