import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputArea from '@/components/admin/input/InputArea';
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector, useDispatch } from 'react-redux';
import { FormHelperText } from '@mui/material';
import { PutOrderService } from '@/services/orderService';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useRole } from '@/hooks/useRole';

function CancelModal({ open, setOpen }) {
    const { orderGetData } = useSelector((state) => state.orderData)
    const { role } = useRole()
    const dispatch = useDispatch()
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            ...orderGetData,
            reason: "",
            cancelItem: "Active",
            cancelUser: role || "",
            trackingInfo: {
                ...orderGetData?.trackingInfo,
                orderStatus: "Cancelled"
            }
        },
        validationSchema: yup.object({
            reason: yup.string().required("Reason is required"),
        }),
        onSubmit: async (data, { resetForm }) => {
            console.log(data);
            await dispatch(PutOrderService(orderGetData?.orderId, data));
            resetForm()
            setOpen(false);
        },
    });


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Dialog
                fullWidth
                open={open}
            >
                <Stack direction="row">
                    <DialogTitle fontFamily={"Poppins"} fontWeight={"bold"}>Cancel Order:</DialogTitle>
                    <IconButton aria-label="delete" sx={{ marginLeft: "auto" }} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent sx={{ marginTop: -3 }}>
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue=""
                        name="radio-buttons-group"
                        value={formik.values.reason}
                        onChange={formik.handleChange("reason")}
                    >
                        <FormControlLabel value="Invalid Prescription" control={<Radio />} label="Invalid Prescription" />
                        <FormControlLabel value="Prescription not attached" control={<Radio />} label="Prescription not attached" />
                        <FormControlLabel value="Out of Stock" control={<Radio />} label="Out of Stock" />
                        <FormControlLabel value=" MRP changed" control={<Radio />} label="MRP changed" />
                        <FormControlLabel value="Pincode service not available" control={<Radio />} label="Pincode service not available" />
                        <FormControlLabel value="Only online payment for this product" control={<Radio />} label="Only online payment for this product" />
                        <FormControlLabel value="No cash on delivery available for this product" control={<Radio />} label="Only online payment for this product" />
                        <FormControlLabel value="Product packing changed" control={<Radio />} label="Product packing changed" />
                        <FormControlLabel value="Customer not pick the call for order confirmation" control={<Radio />} label="Customer not pick the call for order confirmation" />
                        <FormControlLabel value="Incomplete address" control={<Radio />} label="Incomplete address" />
                        <FormControlLabel value="Pincode not mentioned" control={<Radio />} label="Pincode not mentioned" />
                        <FormControlLabel value="Phone not reachable" control={<Radio />} label="Phone not reachable" />
                        <FormControlLabel value="Phone switched off" control={<Radio />} label="Phone switched off" />
                        <FormControlLabel value="Customer wants to cancel the order" control={<Radio />} label="Customer wants to cancel the order" />
                        <FormControlLabel value="Customer wrongly placed the order" control={<Radio />} label="Customer wrongly placed the order" />
                        <FormControlLabel value="Customer not interested" control={<Radio />} label="Customer not interested" />
                        <FormControlLabel value="Prescription not attached & Out of Stock" control={<Radio />} label="Prescription not attached & Out of Stock" />
                        <FormControlLabel value="Sold Out" control={<Radio />} label="Sold Out" />
                    </RadioGroup>
                    <FormHelperText error>{formik.touched.reason ? formik.errors.reason : null}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' type="submit" onClick={formik.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default CancelModal;