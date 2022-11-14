import React, {Component} from 'react';
import './styles.css';
import { Link } from 'react-router-dom';
import { Button } from "@mui/material";
import Navigation from "../../components/Navigation";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from "axios";

const redirectURL = process.env.REACT_APP_REDIRECT_URL;
const clientID = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
const scopeEnv = process.env.APP_SCOPE;

//if the user has loged out, user should not be able to access this page
// const userType = localStorage.getItem("type");
// const isLoggedIn = localStorage.getItem("token");

class UploadDrive extends Component {   

    constructor(props) {
            super(props);
            this.state = {
                urlParams: null,
                code: null,
                redirect_uri: redirectURL,
                client_secret: clientSecret,
                client_id: clientID,
                scope: scopeEnv,
                access_token: null,
                refresh_token: null,
                expires_in: null,
                token_type: null,
                selectedFile: null,
                image: null,
                progress: 0,

            }        
    }
            
    logout = () => {

        localStorage.setItem("token", "");
        localStorage.setItem("user_id", "");
        localStorage.setItem("type",  "");
        localStorage.setItem("email", "");
        localStorage.setItem("name", "");
    }

    setUrlParamsCode = () => {
        const param = new URLSearchParams(window.location.search);
        const code = param.get('code');
        console.log('code :'+ code);
        this.setState({
            urlParams: param,
            code: code,
        });
    }

    componentDidMount() {

        this.setUrlParamsCode();
        setTimeout(() => {
            if (this.state.code){
                // Simple POST request with a JSON body using fetch
                const requestOptions = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        code:this.state.code,
                        redirect_uri:this.state.redirect_uri,
                        client_secret:this.state.client_secret,
                        client_id:this.state.client_id,
                        scope:this.state.scope,
                        grant_type:"authorization_code"
                    })
                };
                fetch('https://www.googleapis.com/oauth2/v4/token', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                            this.setState({
                                access_token: data.access_token,
                                refresh_token: data.refresh_token,
                                expires_in: data.expires_in,
                                scope: data.scope,
                                token_type: data.token_type,
                            });

                            localStorage.setItem("access_token",data.access_token);
                            localStorage.setItem("refresh_token",data.refresh_token);
                            localStorage.setItem("expires_in",data.expires_in);
                            localStorage.setItem("scope",data.scope);
                            localStorage.setItem("token_type",data.expires_in);
                            window.history.pushState({}, document.title, "/upload-files");

                        }
                    );
            } else {
                console.log('code invalid');
            }
        }, 1000);
    }

    doUpload = async () => {
        const formData = new FormData();
        formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
        formData.append('upload_file', true);
        console.log("Bearer "+localStorage.getItem("access_token"));

        await axios.post('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', this.state.selectedFile, {
            
            onUploadProgress: progressEvent => {
                console.log('Upload Progress: ' + Math.round(progressEvent.loaded / progressEvent.total * 100) + '%' );
                this.setState({
                    progress: Math.round(progressEvent.loaded / progressEvent.total * 100)
                });
            },
            headers: { Authorization: `Bearer ${localStorage.getItem("access_token")}`}

        })
            .then( response => {
                console.log(response);
                toast.success('File uploaded!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).catch( err => {
                console.log(err);
                toast.error("File couldn't be uploaded", {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }

    fileSelectedHandler = (event) => {
        console.log(event.target.files[0]);
        this.setState({
            selectedFile: event.target.files[0],
        });

        // set image
        if (event.target.files && event.target.files[0]) {
            let reader = new FileReader();
            reader.onload = (e) => {
                this.setState({image: e.target.result});
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    fileUploadHandler = () => {
        if (this.state.selectedFile){
            this.doUpload().then(() => {
                this.clearImage();
                setTimeout(() => {
                    this.setState({
                        progress: 0,
                    })
                }, 6000);
            }).catch(err => {
                console.log(err);
            })
        } else {
            toast.error('Please select a file', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    clearImage = () => {
        this.fileInput.value = "";
        this.setState({
            image: null,
            selectedFile: null,
        });
    }

    render() {

        const { Navigate } = this.props;
        return (
            <>
                <Navigation />
                <div style={{display: "flex", flexDirection: "row", marginTop: "25px", justifyContent: "space-between"}}>
                    <div style={{ paddingLeft: "40px", fontSize: "18px", fontWeight: "500" }}>ABC Company / Managers / Upload Files</div>
                    <Link to="/login"><Button
                        onClick={this.logout(Navigate)}
                        style={{ paddingTop: "0px", marginRight: "20px", color: "#0a0a4a", textDecoration: "underline", fontWeight: "600" }}>Logout
                    </Button></Link>
                </div>
                <ToastContainer />

                
              <div className="wrapper">
                <div className="container">
                    {/* <img src={googleLogo} width="40" height="40" alt="google drive"/> */}
                    <h6 style={{marginBottom: 5, color: "darkgray", marginTop: 170, textAlign: "center"}}>
                    </h6>
                    
                    <div className="upload-container">
                        <div className="border-container">
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", padding: "10px"}}>
                                <input
                                    style={{ marginLeft: "160px", color: "gray"}}
                                    id="files"
                                    type="file"
                                    name="files[]"
                                    onChange={this.fileSelectedHandler}
                                    ref={ref=> this.fileInput = ref}
                                    // multiple
                                />
                                <img id="target" src={this.state.image} style={{maxWidth: "100px", maxHeight: "55px"}} alt=""/>
                            </div>
                            <div style={{ padding: 5, marginTop: 45, display: "flex", flexDirection: "row", justifyContent: "end"}}>
                                <button style={{ padding: 5, borderRadius: 10, width: 90, height: 40}} className="btn-success" id="upload" onClick={this.fileUploadHandler}>Upload</button> &nbsp;
                                <button style={{ padding: 5, borderRadius: 10, width: 80, height: 40}} className="btn-danger" id="upload" onClick={this.clearImage}>Clear</button>
                                <br/> <br/>
                            </div>
                            <Progress
                                percent={this.state.progress}
                            />
                        </div>
                    </div>
                    <br/>
                </div>
            </div>
            </>
 
        );
    }
}

export default UploadDrive;
