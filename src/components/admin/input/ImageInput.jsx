import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PhotoIcon from "@mui/icons-material/Photo";
import { Avatar, FormHelperText, InputLabel } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

function ImageInput({ title, image, onChange, error,onError, fallbackImage, disabled = false }) {
  const [preview, setPreview] = useState(image);
  const [imgError, setImgError] = useState(false);
    // const fallbackImage = `https://assets1.drugcarts.com/category/thumb/${"category16232530961536.webp"}`;

  useEffect(() => {
    setPreview(image);
    setImgError(false); // reset error when image changes
  }, [image]);

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
      {image ? (
        <Avatar
          src={imgError ? fallbackImage : preview}
          sx={{ width: 160, height: 160, mt: 1, mb: 2 }}
          variant="square"
          onError={() => {
            setImgError(true);
            onError && onError();
          }}
        />
      ) : null}

      <Button
        component="label"
        role={undefined}
        variant="contained"
        color="secondary"
        tabIndex={-1}
        style={{ textTransform: "capitalize" }}
        disabled={disabled}
        startIcon={<PhotoIcon />}
      >
        Upload Image
        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/gif, image/jpeg"
          onChange={(e) => {
            const file = e.target.files[0];
            if (file) {
              const url = URL.createObjectURL(file);
              setPreview(url);
              setImgError(false);
            }
            onChange && onChange(e);
          }}
        />
      </Button>
      <FormHelperText error>{error}</FormHelperText>
    </div>
  );
}

export default ImageInput;
