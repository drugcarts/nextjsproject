import { useState } from "react";
import { TextField, Autocomplete, InputLabel } from "@mui/material";

function SelectField({ title, size = "small", data, getOptionLabel, value, helperText, error, onInputChange, onChange }) {
    // console.log(value);

    return (
        <div>
            <InputLabel
                id="input"
                sx={{
                    mt: 1,
                    mb: 0.5,
                    fontWeight: 600,
                    fontFamily: "Poppins",
                    color: "#000",
                    fontSize: 14,
                }}
            >
                {title}
            </InputLabel>
            <Autocomplete
                size={size}
                noOptionsText="No Data Found"
                options={data || []}
                getOptionKey={(option) => option.key}
                getOptionLabel={(option) => option?.value || ""}
                value={data?.find((d) => d.key === value) || null}
                onChange={(e, newValue) => {
                    onChange?.(newValue?.key || "");
                }}
                onInputChange={onInputChange}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        fullWidth
                        error={error}
                        helperText={helperText}
                    />
                )}
            />
        </div>
    );
}

export default SelectField;

