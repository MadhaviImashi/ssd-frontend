import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Navigation from "../../Navigation";
import SendMessageBox from "../../sendMessageBox";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManagerHome = () => {

  const Navigate = useNavigate();
  
  let clientId = process.env.REACT_APP_CLIENT_ID;
  let redirectUrl = process.env.REACT_APP_REDIRECT_URL;
  let scope = process.env.REACT_APP_SCOPE;
  let url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri=" + redirectUrl
  + "&prompt=consent&response_type=code&client_id=" + clientId + "&scope=" + scope
  + "&access_type=offline";

  //if the user has loged out, user should not be able to access this page
  const isLoggedIn = localStorage.getItem("token");
  const userType = localStorage.getItem("type");

  React.useEffect(() => {

    console.log('dkdkdk', redirectUrl)
    console.log('uri..', url)
    
    if (!isLoggedIn && userType !== "manager") {
      toast.error("You must first login to view the messages", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }); 
      Navigate('/login');
    }
    if (isLoggedIn) {
      if (userType === 'admin') {
        Navigate("/admin-home")
      } else if (userType === 'worker') {
        Navigate("/worker-home");
      }
      else if (userType === 'manager') {
        Navigate("/manager-home");
      }
    }
  }, []);

  const logout = () => {
    localStorage.setItem("token", "");
    localStorage.setItem("user_id", "");
    localStorage.setItem("type",  "");
    localStorage.setItem("email", "");
    localStorage.setItem("name", "");
    //re-dirrect to login pg
    Navigate('/login')
  }

  const signInToGoogle = () => {

    console.log('uri..', url)
    
    setTimeout(() => {
      window.location = url;
    }, 1000);
  }
    
  return (
    <>
      <Navigation />
      <ToastContainer />
      <div style={{display: "flex", flexDirection: "row", marginTop: "25px", justifyContent: "space-between"}}>
        <div style={{ paddingLeft: "40px", fontSize: "18px", fontWeight: "500" }}>ABC Company / Managers</div>
        <div><Button
            onClick={logout}
            style={{ paddingTop: "0px", marginRight: "20px", color: "#0a0a4a", textDecoration: "underline", fontWeight: "600" }}>Logout
        </Button></div>
      </div>

      {/* send messages */}
      <SendMessageBox />
      
      <div className="container">
        <div className="g-signin-upload-container">
          <div className="g-signin-border-container">
          <img src="images/google-logo.png" width="30" height="30" alt="google-logo"/>

            <Button className="btb btn-primary g-signin-btn" id="login" onClick={signInToGoogle}>
              Sign In to Google to upload files
            </Button>
          </div>
        </div>
      </div>
      {/* <UploadDrive /> */}
    </>
  );
};

export default ManagerHome;
