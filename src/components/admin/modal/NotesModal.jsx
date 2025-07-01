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

function NotesModal({ open, setOpen }) {
    const { orderGetData } = useSelector((state) => state.orderData)
    const dispatch = useDispatch()
    const formik = useFormik({
        initialValues: {
            notes: "",
        },
        validationSchema: yup.object({
            notes: yup.string().required("Notes is required"),
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
                    <DialogTitle fontFamily={"Poppins"} fontWeight={"bold"}>Notes:</DialogTitle>
                    <IconButton aria-label="delete" sx={{marginLeft: "auto"}} onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <DialogContent sx={{marginTop: -3}}>
                    <InputArea value={formik.values.notes} onChange={formik.handleChange("notes")} />
                    <FormHelperText error>{formik.touched.notes ? formik.errors.notes : null}</FormHelperText>
                </DialogContent>
                <DialogActions>
                    <Button variant='contained' color='error' type="submit" onClick={formik.handleSubmit}>Submit</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

export default NotesModal;