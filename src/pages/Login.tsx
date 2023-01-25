import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { LockOutlined } from "@mui/icons-material";
import { useState, useEffect } from "react";
import imgBG from "./../assets/bg-login.jpg";
import * as yup from "yup";
import { useFormik } from "formik";
import { useLoginMutation } from "../store/api/user";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Ingresa un email valido")
    .required("Email es requerido"),
  password: yup.string().required("El password es requerido"),
});

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [login, { isSuccess, isError }] = useLoginMutation();
  const formik = useFormik({
    initialValues: {
      email: "danielortegacareaga@gmail.com",
      password: "Finerio@123",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      login({ password: values.password, email: values.email });
    },
  });

  useEffect(() => {
    if (isError) {
      Swal.fire({
        icon: "error",
        title: "Ocurrió un problema...",
        text: "Parece que tus credenciales no son validas o hay un problema con tu conexión a internet!",
      });
    }
  }, [isError]);
  useEffect(() => {
    if (isSuccess) navigate("/movements");
  }, [isSuccess, navigate]);

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${imgBG})`,
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlined />
          </Avatar>
          <Typography component="h1" variant="h5">
            Credenciales
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={formik.handleSubmit}
            sx={{ mt: 1 }}
          >
            <TextField
              error={Boolean(formik.errors.email)}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              helperText={formik.errors.email ?? ""}
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            <TextField
              error={Boolean(formik.errors.password)}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              helperText={formik.errors.password ?? ""}
              onChange={formik.handleChange}
            />
            <FormControlLabel
              control={
                <Checkbox
                  value="remember"
                  color="primary"
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setShowPassword(event.target.checked);
                  }}
                />
              }
              label="Ver password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ingresar
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};
