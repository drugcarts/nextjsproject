import axios from "axios";
import { IsLoading, showToast } from "../reduxToolkit/slices/commonSlice";
import Authorization from "../utils/authorization";
import {
  addOrderprescription,
  getOrderprescriptionList,
  getOrderprescription,
} from "../reduxToolkit/slices/orderPrescriptionSlice";

const PostOrderprescriptionService = (data, resetForm) => async (dispatch) => {
  try {
    dispatch(IsLoading(true));
    const postData = await axios.post("/api/orderprescription", data, {
      headers: await Authorization(),
    });
    dispatch(addOrderprescription(postData.data));
    dispatch(getOrderprescription(postData.data));
    dispatch(IsLoading(false));
    dispatch(
      showToast({ message: "Submitted Successfully!!!", severity: "success" })
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

const GetOrderprescriptionService =
  (page = 1, limit, search = "") =>
  async (dispatch) => {
    try {
      dispatch(IsLoading(true));
      const getData = await axios.get(
        `/api/orderprescription?page=${page}&limit=${limit}&search=${search}`,
        { headers: await Authorization() }
      );
      dispatch(getOrderprescriptionList(getData.data));
      dispatch(IsLoading(false));
    } catch (error) {
      dispatch(IsLoading(false));
      console.log("error", error.message);
    }
  };

const DeleteOrderprescriptionService = (id) => async (dispatch) => {
  await axios
    .delete(`/api/orderprescription/${id}`, { headers: await Authorization() })
    .then(() => {
      dispatch(getOrderprescription(id));
      dispatch(GetOrderprescriptionService());
    })
    .catch((error) => {
      console.log("error", error.message);
    });
};

export {
  PostOrderprescriptionService,
  GetOrderprescriptionService,
  DeleteOrderprescriptionService,
};
