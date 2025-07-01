import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import SortSharpIcon from '@mui/icons-material/SortSharp';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useTheme } from '@mui/material';

function SearchInput({ filterOption, rowCount, value, onChange, Submit, placeholder = "Search" }) {
    const theme = useTheme()
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    return (
        <Paper
            component="form"
            elevation={3}
            sx={{
                p: '0px 0px',
                display: 'flex',
                alignItems: 'center',
                // width: 300, 
                borderColor: "gray",
                borderWidth: 1,
                marginTop: 2
            }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1, fontFamily: "Poppins" }}
                placeholder={placeholder}
                inputProps={{ 'aria-label': 'search' }}
                value={value}
                onChange={onChange}
            />
            <>
                <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions" aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={Submit}>
                    <SearchIcon />
                </IconButton>
            </>
        </Paper>
    );
}

export default SearchInput