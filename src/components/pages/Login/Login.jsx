import { Card, Grid, TextField, Button } from "@mui/material";
import React from "react";
import { Box, styled } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import api, { SignIn } from "../../../API/Auth/auth";

const FlexBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

const JustifyBox = styled(FlexBox)(() => ({
  justifyContent: "center",
}));

const ContentBox = styled(Box)(() => ({
  height: "100%",
  padding: "70px 60px 70px 60px",
  position: "relative",
  background: "rgb(255,255,255)",
  justifyContent: "center",
}));

const Root = styled(JustifyBox)(() => ({
  marginTop: "10px",
  background: "#161b22",
  height: "800px",
}));

const InnerTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,205,0)",
    },
  },
});

const OuterTheme = createTheme({
  palette: {
    primary: {
      main: "rgb(255,128,0)",
    },
  },
});

const validationSchema = yup.object({
  email: yup
    .string("Enter your email")
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string("Enter your password")
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

/**
 * @description Login Component
 * @returns {JSX} JSX
 */
const Login = () => {
  const navigate = useNavigate();
  const [isLoggedIn] = React.useState(localStorage.getItem("token"));
  const userType = localStorage.getItem("type");

  React.useEffect(() => {
    if (isLoggedIn) {
      if (userType === 'admin') {
        navigate("/admin-home")
      }
      else if (userType === 'worker') {
        navigate("/worker-home");
      }
      else if (userType === 'manager') {
        navigate("/manager-home");
      }
    }
  }, []);



  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const data = {
        email: values.email,
        password: values.password,
      };

      SignIn("/api/auth/login", data)
            .then((res) => {
              console.log(res.data);
              localStorage.setItem("token", res.data.access_token);
              localStorage.setItem("user_id", res.data.user_id);
              localStorage.setItem("type", res.data.type);
              localStorage.setItem("email", res.data.email);
              localStorage.setItem("name", res.data.name);
              if (userType === 'admin') {
                navigate("/admin-home")
              }
              else if (userType === 'worker') {
                navigate("/worker-home");
              }
              else if (userType === 'manager') {
                navigate("/manager-home");
              }
            })
            .catch((err) => {
              Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Login Failed!. Please check your credentials.",
              });
            })
      // api
      //   .SignIn(data)

      //   .then((res) => {
      //     console.log(res.data);
      //     localStorage.setItem("token", res.data.token);
      //     localStorage.setItem("user_id", res.data.userId);
      //     localStorage.setItem("type", res.data.type);
      //     localStorage.setItem("email", res.data.email);
      //     localStorage.setItem("phone", res.data.mobile);
      //     localStorage.setItem("name", res.data.name);
      //     navigate("/");


      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     Swal.fire({
      //       icon: "error",
      //       title: "Oops...",
      //       text: "Login Failed!. Please check your credentials.",
      //     });
      //   });
    },
  });

  const res = () => {
    navigate("/register");
  };

  return (
    <Root>
      <Card className="card">
        <Grid container>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <ContentBox>
              <form onSubmit={formik.handleSubmit}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  style={{ marginBottom: "10px" }}
                />
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                  style={{ marginBottom: "10px" }}
                />

                <ThemeProvider theme={InnerTheme}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    type="submit"
                    style={{ marginBottom: "20px" }}
                  >
                    Login
                  </Button>
                </ThemeProvider>
                <h6>Not Registered Yet?</h6>
                <ThemeProvider theme={OuterTheme}>
                  <Button
                    color="primary"
                    variant="contained"
                    fullWidth
                    onClick={res}
                  >
                    Register
                  </Button>
                </ThemeProvider>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
    </Root>
  );
};

export default Login;
