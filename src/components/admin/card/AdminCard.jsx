"use client"
import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import WorkIcon from '@mui/icons-material/Work';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { Button, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

const CardItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    borderRadius: 12,
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));

const CardIcon = styled(Paper)(({ theme }) => ({
    background: '#001d35',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    borderRadius: 30,
    // marginTop: -4,
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
}));


function AdminCard() {
    const { countList } = useSelector((state) => state.countData)

    return (
        <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={6} sx={{ backgroundColor: "#007bff" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={500}
                            fontSize={16}
                            color='#fff'
                            sx={{ flexGrow: 1 }}
                        >
                            Total Orders
                        </Typography>
                        <CardIcon>
                            <WorkIcon sx={{ color: "#fff" }} />
                        </CardIcon>
                    </Box>
                    <Typography variant="body1" fontFamily={"Poppins"} color='#fff' fontWeight="bold" fontSize={20} sx={{ marginTop: -4 }}>{countList?.orders}</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={6} sx={{ backgroundColor: "#f35205" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={500}
                            fontSize={16}
                            color='#fff'
                            sx={{ flexGrow: 1 }}
                        >
                            Total Products
                        </Typography>
                        <CardIcon>
                            <AccountTreeIcon sx={{ color: "#fff" }} />
                        </CardIcon>
                    </Box>
                    <Typography variant="body1" fontFamily={"Poppins"} color='#fff' fontWeight="bold" fontSize={20} sx={{ marginTop: -4 }}>{countList?.products}</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={6} sx={{ backgroundColor: "#cb2d3c" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={500}
                            fontSize={16}
                            color='#fff'
                            sx={{ flexGrow: 1 }}
                        >
                            Total Staff
                        </Typography>
                        <CardIcon>
                            <GroupsIcon sx={{ color: "#fff" }} />
                        </CardIcon>
                    </Box>
                    <Typography variant="body1" fontFamily={"Poppins"} color='#fff' fontWeight="bold" fontSize={20} sx={{ marginTop: -4 }}>{countList?.staff}</Typography>
                </CardItem>
            </Grid>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={6} sx={{ backgroundColor: "#7d5e69" }}>
                    <Box sx={{ display: 'flex' }}>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={500}
                            fontSize={16}
                            color='#fff'
                            sx={{ flexGrow: 1 }}
                        >
                            Total Users
                        </Typography>
                        <CardIcon>
                            <ShoppingCartIcon sx={{ color: "#fff" }} />
                        </CardIcon>
                    </Box>
                    <Typography variant="body1" fontFamily={"Poppins"} color='#fff' fontWeight="bold" fontSize={20} sx={{ marginTop: -4 }}>{countList?.customers}</Typography>
                </CardItem>
            </Grid>
        </Grid>
    )
}

export default AdminCard