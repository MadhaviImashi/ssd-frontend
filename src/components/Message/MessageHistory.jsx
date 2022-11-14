import MsgCard from "./Message";
import React, {useState, useEffect} from "react";
import { Container} from "react-bootstrap";
import { getMessageHistory } from "../../API/messageSaver/msgAPI";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";

const MsgHistory = (props) => {
  const Navigate = useNavigate();

    const [loadedMsgHistory, setLoadedMsgHistory] = useState([]);
    const [userName, setUserName] = useState('');

    const [isLoggedIn] = React.useState(localStorage.getItem("token"));
    // const userType = localStorage.getItem("type");
    const uid = localStorage.getItem("user_id");


    const logout = () => {
        localStorage.setItem("token", "");
        localStorage.setItem("user_id", "");
        localStorage.setItem("type",  "");
        localStorage.setItem("email", "");
        localStorage.setItem("name", "");
        //re-dirrect to login pg
        Navigate('/login')
    }
    
    const getMsgHistory = () => {
        getMessageHistory("/api/message/msg-history/", uid)
            .then((res) => {
                setUserName(res.data.user_name);
                setLoadedMsgHistory(res.data.msgHistory);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    useEffect(() => {
        if (!isLoggedIn) {
            toast.error("You must first login to view the messages", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              }); 
            Navigate("/login");
        } else {
            getMsgHistory();
        }
    }, []);

    return (
        <>
            <ToastContainer />
            <Navigation />
            <div style={{display: "flex", flexDirection: "row", marginTop: "25px", justifyContent: "space-between"}}>
                <div style={{ paddingLeft: "40px", fontSize: "18px", fontWeight: "500" }}></div>
                <div><Button
                    onClick={logout}
                    style={{ paddingTop: "0px", marginRight: "20px", color: "#0a0a4a", textDecoration: "underline", fontWeight: "600"}}>Logout
                </Button></div>
            </div>
            <Container className="cart-page-wrapper">
            <h6><b> 📝 {userName}</b>'s message history </h6><br />
                {
                    loadedMsgHistory.map((item) => (
                        <MsgCard key={item._id} msg={item} />
                    ))
                }
            </Container>
        </>
    )

}

export default MsgHistory;