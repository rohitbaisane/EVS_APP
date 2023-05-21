import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import { signupUser } from "../store/action/allActions";
import LoginPage from "./LoginPage";
import { useColors } from "../theme/theme";
import { Link, useNavigate } from "react-router-dom";

const SignupSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required"),
});

const SignupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector(({ auth }) => auth); 
  const color = useColors();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,
    onSubmit: (values) => {
      dispatch(signupUser(values));
      navigate("/login");
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: color.card,
        padding: "20px",
      }}
    >
      <Box sx={{ mb: 3 }}>
        <img
          src={require("../images/EVS_SIGNUP.png")}
          alt="Logo"
          height="100px"
        />
      </Box>
      <Typography variant="h4" color={color.primary} gutterBottom>
        EVENT SCHEDULING SYSTEM
      </Typography>
      <Typography variant="h5" color={color.primary} gutterBottom>
        Signup
      </Typography>
      <Box sx={{ width: "100%", maxWidth: "400px", mt: 3 }}>
        <form onSubmit={formik.handleSubmit} autoComplete="off">
          <TextField
            fullWidth
            margin="normal"
            label="Name"
            name="name"
            autoComplete="off"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Email"
            name="email"
            autoComplete="off"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
          <TextField
            fullWidth
            margin="normal"
            type="password"
            label="Password"
            name="password"
            autoComplete="off"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
          />
          <Button
            variant="contained"
            fullWidth
            type="submit"
            disabled={loading}
            sx={{ mt: 3, backgroundColor: color.primary, color: color.white }}
          >
            {loading ? "Loading..." : "Signup"}
          </Button>
        </form>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
          <Typography variant="body1">
            Already signed up?
            <Link to="/login" component={LoginPage} sx={{ ml: 1 }}>
              Login
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignupPage;
