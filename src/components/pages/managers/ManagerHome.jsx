import React from "react";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

const ManagerHome = () => {

  const Navigate = useNavigate();

  //if the user has loged out, user should not be able to access this page
  const isLoggedIn = localStorage.getItem("token");
  const userType = localStorage.getItem("type");
  React.useEffect(() => {
    if (!isLoggedIn && userType!=="manager") {
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
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary" style={{ backgroundColor: "black", minWidth: "100%", position: "fixed"}}>
                <div className="container-fluid" style={{marginLeft: "20px", color: "white", backgroundColor: "black"}}>
                    <div className="navbar-brand" to="/" style={{ padding: "20px", fontSize: "20px", fontWeight: "400"}}>🚀 ABC Company</div>
                </div>
      </nav><br /><br/><br/>
      <div style={{display: "flex", flexDirection: "row", marginTop: "25px", justifyContent: "space-between"}}>
        <div style={{ paddingLeft: "40px", fontSize: "18px", fontWeight: "400" }}>ABC Company / Managers</div>
        <div><Button
            onClick={logout}
            style={{ paddingTop: "0px", marginRight: "20px", color: "#0a0a4a", textDecoration: "underline"}}>Logout
        </Button></div>
      </div>
      
    </>
  );
};

export default ManagerHome;
