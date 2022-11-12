import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";
import Navigation from "../../Navigation";

const WorkerHome = () => {

  const Navigate = useNavigate();

  //if the user has loged out, user should not be able to access this page
  const isLoggedIn = localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  React.useEffect(() => {
    if (!isLoggedIn && userType!=="worker") {
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
    
  return (
    <>
       <Navigation />
      <div style={{display: "flex", flexDirection: "row", marginTop: "25px", justifyContent: "space-between"}}>
        <div style={{ paddingLeft: "40px", fontSize: "18px", fontWeight: "400" }}>ABC Company / Workers</div>
        <div><Button
            onClick={logout}
            style={{ paddingTop: "0px", marginRight: "20px", color: "#0a0a4a", textDecoration: "underline"}}>Logout
        </Button></div>
      </div>
      
    </>
  );
};

export default WorkerHome;
