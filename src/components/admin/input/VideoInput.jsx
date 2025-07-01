import React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Avatar, FormHelperText, InputLabel } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

function VideoInput({ title, fileName, onChange, error }) {
    return (
        <div>
            <InputLabel
                id="input"
                sx={{ mt: 1, mb: 0.5, fontWeight: 600, fontFamily: "Poppins", color: "#000", fontSize: 14 }}>
                {title}
            </InputLabel>
            {fileName && (
                <FormHelperText sx={{ mt: 1, color: 'text.secondary' }}>
                    {fileName}
                </FormHelperText>
            )}
            <Button
                component="label"
                role={undefined}
                variant="contained"
                color="secondary"
                tabIndex={-1}
                style={{ textTransform: "capitalize" }}
                startIcon={<CloudUploadIcon />}
            >
                Upload Video
                <VisuallyHiddenInput
                    type="file"
                    accept="video/*"
                    onChange={onChange}
                />
            </Button>
            <FormHelperText error>{error}</FormHelperText>
        </div>
    );
}

export default VideoInput