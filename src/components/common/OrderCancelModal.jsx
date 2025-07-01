'use client';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { PutOrderService } from '@/services/orderService';
import InputArea from '@/components/admin/input/InputArea';

function OrderCancelModal({ open, setOpen }) {
  const dispatch = useDispatch();
  const { orderGetData } = useSelector((state) => state.orderData);
  const [showOther, setShowOther] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
        ...orderGetData,
        reason: "",
        cancelItem: "Active",
        cancelUser: "Customer",
        trackingInfo: {
            ...orderGetData?.trackingInfo,
            orderStatus: "Cancelled"
        }
    },
    validationSchema: yup.object({
      reason: yup.string().required('Reason is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      await dispatch(PutOrderService(orderGetData?.orderId, values));
      resetForm();
      setOpen(false);
    },
  });

  const handleRadioChange = (e) => {
    const value = e.target.value;
    if (value === 'Others') {
      setShowOther(true);
      formik.setFieldValue('reason', '');
    } else {
      setShowOther(false);
      formik.setFieldValue('reason', value);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog fullWidth open={open}>
      <Stack direction="row">
        <DialogTitle fontFamily="Poppins" fontWeight="bold">
          Cancel Order Reason:
        </DialogTitle>
        <IconButton aria-label="close" sx={{ marginLeft: 'auto' }} onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <DialogContent sx={{ marginTop: -3 }}>
          <RadioGroup
            name="reason"
            value={showOther ? 'Others' : formik.values.reason}
            onChange={handleRadioChange}
          >
            <FormControlLabel value="Bought item from outside" control={<Radio />} label="Bought item from outside" />
            <FormControlLabel value="Price issue" control={<Radio />} label="Price issue" />
            <FormControlLabel value="Delivery time issue" control={<Radio />} label="Delivery time issue" />
            <FormControlLabel value="Want delivery immediately" control={<Radio />} label="Want delivery immediately" />
            <FormControlLabel value="Others" control={<Radio />} label="Others" />
          </RadioGroup>

          {showOther && (
            <InputArea
              placeholder="Enter custom reason"
              value={formik.values.reason}
              onChange={formik.handleChange("reason")}
            />
          )}
          <FormHelperText error>
            {formik.touched.reason && formik.errors.reason ? formik.errors.reason : ''}
          </FormHelperText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="error" type="submit">
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default OrderCancelModal;
