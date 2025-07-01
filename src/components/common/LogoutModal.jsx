'use client';
import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Avatar,
    Box,
} from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const LogoutModal = ({ open, onClose, onConfirm }) => {
    return (
        <Dialog open={open} maxWidth="lg">
            <Box display="flex" flexDirection="column" alignItems="center" pt={3}>
                <Avatar sx={{ bgcolor: '#b3004b', width: 56, height: 56 }}>
                    <ExitToAppIcon sx={{ width: 36, height: 36 }} />
                </Avatar>
                <DialogTitle sx={{ fontWeight: 'bold', textAlign: 'center' }}>
                    Are You Leaving ?
                </DialogTitle>
            </Box>

            <DialogContent sx={{ textAlign: 'center', marginTop: -2 }}>
                <Typography sx={{ mb: 1 }}>Are you sure want to logout ?</Typography>
                <Typography color="text.secondary">
                    All your unsaved data will be lost
                </Typography>
            </DialogContent>

            <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                <button
                    type="button"
                    className="text-white bg-bgcolor hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
                    onClick={onConfirm}
                >
                    Logout
                </button>
                <button
                    type="button"
                    className="text-black bg-gray-300 hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-5 py-1.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55"
                    onClick={onClose}
                >
                    Cancel
                </button>
            </DialogActions>
        </Dialog>
    );
};

export default LogoutModal;
