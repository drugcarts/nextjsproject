import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function DDInput({ data, value, onChange, fullWidth = false }) {
    return (
        <FormControl size='small'>
            <Select
                labelId="demo-simple-select-autowidth-label"
                id={value}
                value={value}
                onChange={onChange}
                autoWidth
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {data.map((item, i) => <MenuItem key={i} value={item}>{item}</MenuItem>)}
            </Select>
        </FormControl>
    );
}

export default DDInput