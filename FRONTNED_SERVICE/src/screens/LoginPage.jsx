import { Formik, Form, Field } from "formik";
import { Button, TextField, Typography, Grid, Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUser } from "../store/action/allActions.js";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useColors } from "../theme/theme";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const color = useColors();

  const handleLogin = (values, { setSubmitting }) => {
    dispatch(loginUser(values));
    setSubmitting(false);
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: "100vh" }}>
      <Grid
        container
        spacing={2}
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: "100vh", backgroundColor: color.card }}
      >
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box sx={{ p: 4 }}>
            <Typography
              variant="h4"
              component="h2"
              color={color.primary}
              gutterBottom
              align="center"
            >
              Log in to your account
            </Typography>
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors = {};
                if (!values.email) {
                  errors.email = "Required";
                }
                if (!values.password) {
                  errors.password = "Required";
                }
                return errors;
              }}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form>
                  <Field
                    as={TextField}
                    fullWidth
                    name="email"
                    label="Email"
                    type="email"
                    margin="normal"
                    autoComplete="email"
                    variant="outlined"
                  />
                  <Field
                    as={TextField}
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    margin="normal"
                    autoComplete="current-password"
                    variant="outlined"
                  />
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    disabled={isSubmitting}
                    sx={{ mt: 3 }}
                  >
                    Sign In
                  </Button>
                  <Box sx={{ mt: 2, textAlign: "center" }}>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LoginPage;
