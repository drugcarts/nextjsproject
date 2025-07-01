"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { Button, Typography } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { GetContractUserProductService } from '@/services/contractService';

const CardItem = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    borderRadius: 12,
    marginTop: 2,
    cursor: "pointer",
    "&:hover": {
        backgroundColor: "#ae0e49",
        ...theme.typography.body2,
        padding: theme.spacing(2),
        borderRadius: 12,
    },
}));

function UserCard() {
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const { contractUserProducts } = useSelector((state) => state.contractData);
    const router = useRouter();

    const fetchUser = async () => {
        try {
            const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
            if (!token) return;

            const res = await fetch('/api/adminlogin', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                next: { cache: 'no-store' },
            });

            if (!res.ok) throw new Error("Failed to fetch user");

            const data = await res.json();
            setUser(data);
            dispatch(GetContractUserProductService(1, 0, "", data?.id));
        } catch (error) {
            console.error("Fetch user error:", error);
        }
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <Grid container mt={2} mb={8} spacing={2}>
            <Grid size={{ xs: 12, sm: 5, md: 3, lg: 3, xl: 3 }}>
                <CardItem elevation={6} sx={{ backgroundColor: "#00a65a" }} onClick={() => router.push(`/admin/contractwork/${user?.id}`)}>
                    <Box>
                        <Typography
                            variant="body1"
                            fontFamily={"Poppins"}
                            fontWeight={500}
                            fontSize={16}
                            color='#fff'
                            textTransform="capitalize"
                            sx={{ flexGrow: 1 }}
                        >
                            {user?.username}
                        </Typography>
                    </Box>
                    <Typography variant="body1" fontFamily={"Poppins"} color='#fff' fontWeight="bold" fontSize={20}>
                        {contractUserProducts?.pagination?.totalItems}
                    </Typography>
                </CardItem>
            </Grid>
        </Grid>
    );
}

export default UserCard;
