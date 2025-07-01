import { InputLabel, TextField } from '@mui/material'
import React from 'react'

function TextInput({ title, value, type, onChange, helperText, error, inputProps, disabled = false }) {
    return (
        <div>
            <InputLabel
                id="input"
                sx={{ mt: 1, mb: 0.5, fontWeight: 600, fontFamily: "Poppins", color: "#000", fontSize: 14 }}>
                {title}
            </InputLabel>
            <TextField
                id={value}
                value={value}
                onChange={onChange}
                size="small"
                variant="outlined"
                type={type}
                fullWidth
                helperText={helperText}
                error={error}
                inputProps={inputProps}
                disabled={disabled}
            />
        </div>
    )
}

export default TextInput