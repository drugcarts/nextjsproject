import { useState } from "react";
import { TextField, Autocomplete, InputLabel } from "@mui/material";

function SearchField({ title, size = "small", data, getOptionLabel, value, helperText, error, onInputChange, onChange }) {
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
        // freeSolo
        size={size}
        getOptionKey={(option) => option?._id}
        noOptionsText="No Data Found"
        getOptionLabel={getOptionLabel}
        options={data || []}
        value={value}
        onChange={onChange}
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

export default SearchField;
