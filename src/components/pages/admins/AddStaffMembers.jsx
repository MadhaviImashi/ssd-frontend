import "./admin.css";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";

import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import Message from "../../Message/Message";

const AddStaffMemberForm = () => {
  const [error, setError] = useState(null);
  const [isError, setIsError] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      designation: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(" required field"),
      email: Yup.string().required(" required field"),
      password: Yup.string().required(" required field"),
      phone: Yup.string().required(" required field"),
      designation: Yup.string().required(" required field"),
    }),

    onSubmit: (values) => {
      fetch("https://localhost:4000/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          type:values.designation,
          mobile: values.phone,
          password: values.password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status !== 500) {
            return response.json();
          } else {
            throw new Error("Registration Failed ! Try again");
          }
        })
        .then((result) => {
          setError("Registered Successfully!");
          setIsError(true);
        })
        .catch((err) => {
          setError(err.message);
          setIsError(true);
        });

    },
  });

  return (
    <div>
      <Message
        show={isError}
        onHide={(e) => setIsError(false)}
        message={error}
        title="Error occured"
      />
      <Container className="staff-signup-outer-wrapper">
        <Row className="signup-container">
          <Col md className="staff-signup-bg-image img-fluid col-lg-7">
            <div className="bg-text"></div>
          </Col>
          <Col md className="signup-form-wrapper col-lg-5">
            <Form onSubmit={formik.handleSubmit} onBlur={formik.handleBlur}>
              <h1 className="form-title mb-3 mt-4">Register new staff members</h1>

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

              <div key="inline-radio" className="mb-3 formInputStyle">
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
                />
              </Form.Group>

              <div className="mb-4 ">
                <Button type="submit" className="btn-login" name="submit">
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
