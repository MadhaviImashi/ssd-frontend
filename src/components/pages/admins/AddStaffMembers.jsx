import "./admin.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";

import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";

const AddStaffMemberForm = () => {

    const clearFormInputs = (values) => {
        values.name = "";
        values.email = "";
        values.password = "";
        values.phone = "";
        values.designation = "";
        values.confirmPassword = "";
    };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      designation: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(" required field"),
      email: Yup.string().required(" required field"),
      password: Yup.string().required(" required field"),
      confirmPassword: Yup.string().required(" required field"),
      phone: Yup.string().required(" required field"),
      designation: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      //first check whether both pwds are same
      if (values.password !== values.confirmPassword) {
        toast.error("Please confirm the password", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        }); 
      }
      else {
        fetch("https://localhost:4000/api/auth/register", {
          method: "POST",
          body: JSON.stringify({
            name: values.name,
            email: values.email,
            type: values.designation,
            mobile: values.phone,
            password: values.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
            if(response.status !== 500){
              return response.json();
            }else{
              throw new Error('Registration Failed ! Try again')
            }
          })
          .then((res) => {
              console.log('success', res, res.success)
                if (res.success) {
                    toast.success("Staff account was created!", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    clearFormInputs(values);
                }
                else {
                    toast.error("A user with similar email address already exists", {
                        position: "top-right",
                        autoClose: 3000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                      });
            }
          })
          .catch((err) => {
            toast.error("Couldn't create the user", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          });
      }
    },
  });

  return (
    <div>
      <ToastContainer />
      <Container className="staff-signup-outer-wrapper">
        <Row className="signup-container">
          <Col md className="staff-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
              <h1 className="form-title mb-3 mt-4">
                Register new staff members
              </h1>

              <Form.Group className="mb-4 " controlId="name">
                <Form.Control
                  className="formInputStyle"
                  required
                  type="text"
                  placeholder="Name"
                  name="name"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.name}
                ></Form.Control>
              </Form.Group>

              <div key="inline-radio" required className="mb-3 formInputStyle">
                <Form.Check
                  inline
                  label="Worker"
                  type="radio"
                  id="worker"
                  name="designation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="worker"
                />
                <Form.Check
                  inline
                  label="Manager"
                  type="radio"
                  id="manager"
                  name="designation"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value="manager"
                />
              </div>

              <Form.Group className="mt-4 " controlId="email">
                <Form.Control
                  className="formInputStyle"
                  required
                  type="email"
                  placeholder="Email ( Ex: abc@gmail.com )"
                  name="email"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
              </Form.Group>

              <Form.Group className="mb-4 " controlId="phone">
                <Form.Control
                  className="formInputStyle"
                  required
                  type="tel"
                  placeholder="Phone ( Ex: 0702629599 )"
                  name="phone"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.phone}
                />
              </Form.Group>

              <Form.Group className="mb-4 " controlId="pwd">
                <Form.Control
                  className="formInputStyle"
                  required
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                />
              </Form.Group>

              <Form.Group className="mb-4 " controlId="confirmPwd">
                <Form.Control
                  className="formInputStyle"
                  required
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                />
              </Form.Group>

              <div className="mb-4 ">
                <Button type="submit" className="btnLogin" name="submit">
                  Register
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddStaffMemberForm;
