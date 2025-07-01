import { InputLabel, TextField } from '@mui/material'
import React from 'react'

function InputArea({title, value, onChange}) {
    return (
        <div>
            <InputLabel
                id="input"
                sx={{ mt: 1, mb: 0.5, fontWeight: 600, fontFamily: "Poppins", color: "#000", fontSize: 14 }}>
                {title}
            </InputLabel>
            <textarea
                style={{ borderColor: "lightgray", borderWidth: 1, borderRadius: 6, width: "100%", height: 200, padding: 4 }}
                id="outlined-multiline-flexible"
                label="Multiline"
                rows={4}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default InputArea