import React from "react";
import * as Icon from 'react-bootstrap-icons';
import { Button } from "@mui/material";
import TextareaAutosize from '@mui/base/TextareaAutosize';
import { useFormik } from "formik";
import * as yup from "yup";
import { saveMessages } from "../API/messageSaver/msgAPI"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from 'react-router-dom';


const SendMessageBox = () => {

    const userName = localStorage.getItem("name");

    const validationSchema = yup.object({
        message: yup
          .string("Enter your message")
          .required("message is required"),
    });
    
    const resetInputBox = (values) => {
        values.message = ""; 
    }

    const formik = useFormik({
        initialValues: {
          message: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            const data = {
              user_id: localStorage.getItem("user_id"),
              message: values.message
          };
    
          saveMessages("/api/message", data)
            .then((res) => {
                  console.log(res.data);
                  //show success msg
                  toast.success("Message was sent", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  resetInputBox(values);//reset input field
                })
                .catch((err) => {
                  toast.error("Message couldn't be send", {
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

  return (
      <>
          <ToastContainer />
          <h5 style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginTop: "160px"}}>Hi {userName} 👋</h5>
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "20px", paddingBottom: 5}}>
                  <TextareaAutosize
                      required={true}
                    maxRows={4}
                    name="message"
                    aria-label="maximum height"
                    placeholder="Type your message here..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    style={{ width: 650, padding: 10, height: 70, fontSize: "1.12rem",  border: "1px solid #0a0a4a"}}
                />
                <div>
                    <Button
                        type="submit"
                        style={{ paddingTop: "8px", paddingBottom: 10, border: "1px solid #0a0a4a", color: "#0a0a4a", textDecoration: "underline" }}>
                            <Icon.SendFill color="#0a0a4a" size={50}/>
                    </Button>
                </div>
            </div>
          </form>
          
          <Link to="/msg-history">
            <span style={{ display: "flex", flexDirection: "row", justifyContent: "center", marginBottom: "30px"}}>view message history</span>
          </Link>
    </>
  );
};

export default SendMessageBox;
