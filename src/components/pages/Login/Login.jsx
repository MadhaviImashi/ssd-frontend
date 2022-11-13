import { Card, Grid, TextField, Button } from "@mui/material";
import React from "react";
import { Box, styled } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router";
import { SignIn } from "../../../API/Auth/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "../../Navigation";
import './login.css'

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
  let userType = localStorage.getItem("type");

  React.useEffect(() => {
    if (isLoggedIn) {
      if (userType === 'admin') {
        console.log('inside useEFf')
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
              
              // userType = localStorage.getItem("type");
              // console.log('usertye', userType)
              
              //show success msg
              toast.success("Login successful!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              if (userType === 'admin') {
                console.log('inside admin nav')
                navigate("/admin-home")
              }
              else if (userType === 'worker') {
                navigate("/worker-home");
              }
              else if (userType === 'manager') {
                console.log('inside manager nav')
                navigate("/manager-home");
              }  
            })
            .catch((err) => {
              toast.error("Err: Invalid Login!", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }); 
            })
    },
  });

  const res = () => {
    navigate("/register");
  };

  return (
    <>
      <Navigation />
      <Root>
        <ToastContainer />
      <Card className="card" style={{padding: "0 !important"}}>
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
                    style={{ marginBottom: "20px", backgroundColor: "#0a0a4a", color: "white"}}
                  >
                    Login
                  </Button>
                </ThemeProvider>
              </form>
            </ContentBox>
          </Grid>
        </Grid>
      </Card>
      </Root>
      </>
  );
};

export default Login;
