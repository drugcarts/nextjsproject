import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid2 from "@mui/material/Grid2";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextInput from "@/components/admin/input/TextInput";
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import SearchField from "@/components/admin/AutoComplete/SearchField";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import ImageInput from "@/components/admin/input/ImageInput";
import { PutOrderService } from '@/services/orderService';
import { addTrackingNo } from '@/utils/textFormat';

function TrackingModal({ open, setOpen }) {
    const { orderGetData } = useSelector((state) => state.orderData)
    const { courierList } = useSelector((state) => state.courierData)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues: {
            trackingno: "",
            shippingcompany: "",
            shippingweb: "",
            tracksenddate: "",
            trackenddate: "",
            trackingimg: "",
            orderStatus: "Dispatched"
        },
        validationSchema: yup.object({
            shippingcompany: yup.string().required("shipping company is required"),
            shippingweb: yup.string().required("shipping website is required"),
            trackingno: yup.string().required("tracking no is required"),
            trackingimg: yup.string().required("Image is required"),
            tracksenddate: yup.date()
                .required("Start date is required")
                .max(yup.ref("trackenddate"), "Start date must be before End date"),
            trackenddate: yup.date()
                .required("End date is required")
                .min(yup.ref("tracksenddate"), "End date must be after Start date"),
        }),
        onSubmit: async (data, { resetForm }) => {
            const statusChange = {
                ...orderGetData,
                trackingInfo: {
                    ...data
                }
            };
            await dispatch(PutOrderService(orderGetData?.orderId, statusChange));
            resetForm()
            setOpen(false);
        },
    });
    const handleImage = (event) => {
        const file = event.target.files[0];
        formik.setFieldValue("trackingimg", URL.createObjectURL(file));
    };

    const handleClose = () => {
        setOpen(false);
    };

    const uniqueData = Array.from(new Set(courierList?.couriers?.map(item => item?.couriername || item?._id)));
    const websiteData = Array.from(new Set(courierList?.couriers?.map(item => item?.website || item?.id)));

    return (
        <React.Fragment>
            <Dialog fullWidth open={open}>
                <Stack direction="row">
                    <DialogTitle fontFamily={"Poppins"} fontWeight={"bold"}>Order Tracking No:</DialogTitle>
                    <IconButton aria-label="delete" sx={{ marginLeft: "auto" }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent sx={{ marginTop: -3 }}>


                    <SearchField
                        title="Shipping Company"
                        data={uniqueData}
                        value={formik.values.shippingcompany}
                        getOptionLabel={(option) => (typeof option === "string" ? option : option?.couriername || "")}
                        onInputChange={(event, newValue) => formik.setFieldValue("shippingcompany", newValue)}
                        helperText={
                            formik.touched.shippingcompany ? formik.errors.shippingcompany : null
                        }
                        error={
                            formik.touched.shippingcompany ? formik.errors.shippingcompany : null
                        }
                    />
                    <SearchField
                        title="Shipping Website"
                        data={websiteData}
                        value={formik.values.shippingweb}
                        getOptionLabel={(option) => (typeof option === "string" ? option : option?.website || "")}
                        onInputChange={(event, newValue) => formik.setFieldValue("shippingweb", newValue)}
                        helperText={
                            formik.touched.shippingweb ? formik.errors.shippingweb : null
                        }
                        error={
                            formik.touched.shippingweb ? formik.errors.shippingweb : null
                        }
                    />
                    <Grid2 container spacing={2} marginTop={2}>
                        <Grid2 xs={12} md={6}>
                            <TextInput
                                type="date"
                                name="startDate"
                                title="Start Date"
                                value={formik.values.tracksenddate || ""}
                                onChange={(e) => {
                                    formik.setFieldValue("tracksenddate", e.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.tracksenddate && Boolean(formik.errors.tracksenddate)}
                                helperText={formik.touched.tracksenddate ? formik.errors.tracksenddate : ""}
                            />
                        </Grid2>
                        <Grid2 xs={12} md={6}>
                            <TextInput
                                type="date"
                                name="endDate"
                                title={"End Date"}
                                value={formik.values.trackenddate || ""}
                                onChange={(e) => {
                                    formik.setFieldValue("trackenddate", e.target.value);
                                }}
                                onBlur={formik.handleBlur}
                                error={formik.touched.trackenddate && Boolean(formik.errors.trackenddate)}
                                helperText={formik.touched.trackenddate ? formik.errors.trackenddate : ""}
                                inputProps={{ min: formik.values.tracksenddate || "" }}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <TextInput
                                title={"Tracking No"}
                                value={formik.values.trackingno}
                                onChange={formik.handleChange("trackingno")}
                                helperText={
                                    formik.touched.trackingno ? formik.errors.trackingno : null
                                }
                                error={
                                    formik.touched.trackingno ? formik.errors.trackingno : null
                                }
                            />
                        </Grid2>
                        <Grid2 xs={12} md={6}>
                            <ImageInput
                                title={"Image"}
                                image={formik.values.trackingimg}
                                onChange={handleImage}
                                error={
                                    formik.touched.trackingimg
                                        ? formik.errors.trackingimg
                                        : null
                                }
                            />
                        </Grid2>
                    </Grid2>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' type="submit" onClick={formik.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default TrackingModal