"use client";
import { useDispatch, useSelector } from "react-redux";
import { hideToast } from "@/reduxToolkit/slices/commonSlice";
import { Snackbar, Alert } from "@mui/material";

const ToastMessage = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state) => state.common);

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={() => dispatch(hideToast())}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={() => dispatch(hideToast())} severity={severity} variant="filled">
                {message}
            </Alert>
        </Snackbar>
    );
};

export default ToastMessage;
