"use client"
import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

function DropSpinner() {
    return (

        <Backdrop
            sx={(theme) => ({ color: '#fff', background: "#0000"})}
            open={true}
        >
            <CircularProgress color="secondary" />
        </Backdrop>
    );
}

export default DropSpinner