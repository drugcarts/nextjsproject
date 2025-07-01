"use client"
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import FormHelperText from "@mui/material/FormHelperText";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import Grid from "@mui/material/Grid2";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Typography from "@mui/material/Typography";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import { useTheme } from "@mui/material";
import Link from "next/link";
import { AdminLoginService } from "../../../services/admin/userService";

function AdminLogin() {
    const router = useRouter();
    const theme = useTheme()
    const dispatch = useDispatch();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    // const user = "test"
    // useEffect(() => {
    //     if (user) {
    //         router.push('/admin');
    //     }
    // }, [user, router]);


    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: yup.object({
            email: yup.string().email().required("Email is required"),
            password: yup.string().required("Password is required").min(6, "6 characters required"),
        }),
        onSubmit: async (data) => {
            await dispatch(AdminLoginService(data, router));
        },
    });

    const toggleSecureEntry = () => {
        setSecureTextEntry(!secureTextEntry);
    };

    return (
        <Box
            sx={{
                overflow: "hidden",
                width: "100%",
                display: "flex",
                backgroundSize: "cover",
                background: "#fff",
                // alignItems: "center",
                marginTop: theme.spacing(-2),
            }}
        >
            <Paper
                elevation={4}
                style={{
                    borderRadius: 0,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: 360,
                    margin: "100px auto",
                    padding: 20,
                }}
            >
                {" "}
                <Avatar
                    src={"/assets/logo.jpeg"}
                    alt="Drugcart"
                    style={{
                     marginTop: theme.spacing(-2),
                        width: "auto",
                        height: theme.spacing(16),
                    }}
                    variant="square"
                />
                <Typography component="body1" variant="h5" textAlign="center" fontWeight={"bold"}>
                Admin Login
                </Typography>
                <form style={{ marginTop: theme.spacing(3), width: "100%" }}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        type="email"
                        name="email"
                        id="email"
                        label="Email"
                        autoComplete="email"
                        value={formik?.values?.email}
                        onChange={formik.handleChange}
                        helperText={formik.touched.email ? formik.errors.email : null}
                        error={formik.touched.email ? formik.errors.email : null}
                    />
                    <FormControl required fullWidth sx={{ mt: 3 }} variant="outlined">
                        <InputLabel required error={formik.touched.password ? formik.errors.password : null}>
                            Password
                        </InputLabel>

                        <OutlinedInput
                            id="outlined-adornment-password"
                            name="password"
                            type={secureTextEntry ? "password" : "text"}
                            value={formik?.values?.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password ? formik.errors.password : null}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={toggleSecureEntry}
                                        edge="end"
                                    >
                                        {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        <FormHelperText error>
                            {formik.touched.password ? formik.errors.password : null}
                        </FormHelperText>
                    </FormControl>
                    <Grid container marginTop={theme.spacing(3)}>
                        <Grid>
                            <FormControlLabel
                                style={{ display: "table-cell" }}
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                        </Grid>
                        <Grid style={{ marginTop: theme.spacing(1) }}>
                            {/* <Link href="/forgot" variant="body2" style={{ textDecoration: "none" }}>
                Forgot password?
              </Link> */}
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        size="large"
                        style={{ marginTop: theme.spacing(4) }}
                        onClick={formik.handleSubmit}
                    >
                        Login
                    </Button>
                </form>
            </Paper>
        </Box>
    );
}

export default AdminLogin;