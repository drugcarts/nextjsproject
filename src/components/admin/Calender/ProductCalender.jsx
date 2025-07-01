'use client';

import React, { useEffect, useState } from "react";
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, Box, Typography,
  InputLabel, Select, MenuItem, useMediaQuery, Grid2
} from "@mui/material";

import axios from "axios";

const rowText = {
  color: '#fff',
  fontFamily: "Poppins",
  fontWeight: 600,
};

const ProductCalendar = () => {
  const matches = useMediaQuery('(min-width:600px)');
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [data, setData] = useState([]);
  const daysInMonth = new Date(year, month, 0).getDate();

  useEffect(() => {
    const fetchCalendarData = async () => {
      try {
        const res = await axios.get(`/api/product-calendar?month=${month}&year=${year}`);
        setData(res.data);
      } catch (err) {
        console.error("Failed to fetch calendar data:", err);
      }
    };

    fetchCalendarData();
  }, [month, year]);
  console.log('user', data);

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" fontFamily={"Poppins"} fontWeight="bold" align="center" gutterBottom>
        User Product Count | {year}-{month.toString().padStart(2, "0")}
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: "center", gap: 3, flexWrap: "wrap" }}>
        <Grid2>
          <InputLabel sx={{ fontWeight: 600, fontFamily: "Poppins", mb: 0.5 }}>Month</InputLabel>
          <Select size="small" value={month} onChange={(e) => setMonth(e.target.value)} sx={{ width: 100 }}>
            {[...Array(12)].map((_, i) => (
              <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
            ))}
          </Select>
        </Grid2>

        <Grid2>
          <InputLabel sx={{ fontWeight: 600, fontFamily: "Poppins", mb: 0.5 }}>Year</InputLabel>
          <Select size="small" value={year} onChange={(e) => setYear(e.target.value)} sx={{ width: 120 }}>
            {[2024, 2025, 2026].map((y) => (
              <MenuItem key={y} value={y}>{y}</MenuItem>
            ))}
          </Select>
        </Grid2>
      </Box>

      <TableContainer component={Paper} sx={{ marginTop: 4 }}>
        <Table>
          <TableHead sx={{ backgroundColor: '#00a65a' }}>
            <TableRow>
              <TableCell style={rowText}>Date</TableCell>
              {matches && [...Array(daysInMonth)].map((_, i) => (
                <TableCell key={i + 1} align="center" style={rowText}>
                  {i + 1}
                </TableCell>
              ))}
              <TableCell align="center" style={rowText}>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.users?.map((user) => (
              <TableRow key={user?.userId}>
                <TableCell sx={{ backgroundColor: '#00a65a', color: "#fff", fontWeight: 600 }}>
                  {user.username}
                </TableCell>
                {matches && [...Array(daysInMonth)].map((_, i) => (
                  <TableCell key={i + 1} align="center">
                    {user.dailyCounts[i + 1] || 0}
                  </TableCell>
                ))}
                <TableCell align="center" sx={{ fontWeight: 600 }}>
                  {user.total}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Typography variant="h5" align="right" sx={{ my: 3, color: "#ae0e49" }}>
        Overall Product Count This Month: {data?.overallTotal}
      </Typography>
    </Box>
  );
};

export default ProductCalendar;
