import React, {Component} from 'react';
import './styles.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Progress } from 'react-sweet-progress';
import "react-sweet-progress/lib/style.css";
import axios from "axios";

export const redirectURL = process.env.REACT_APP_REDIRECT_URL;
export const clientID = process.env.REACT_APP_CLIENT_ID;
export const clientSecret = process.env.REACT_APP_CLIENT_SECRET;
export const scopeEnv = process.env.REACT_APP_SCOPE;

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
                            window.history.pushState({}, document.title, "/upload");

                        }
                    );
            } else {
                console.log('code invalid');
            }

        }, 1000);

    }

    async doUpload() {
        // const formData = new FormData();
        // formData.append('image', this.state.selectedFile, this.state.selectedFile.name);
        // formData.append('upload_file', true);
        // console.log("Bearer "+localStorage.getItem("access_token"));

        // POST request using fetch with async/await
        // const requestOptions = {
        //     method: 'POST',
        //     headers: {
        //         contentType: this.state.selectedFile.type,
        //         Authorization: "Bearer " + localStorage.getItem("access_token")
        //     },
        //     body: this.state.selectedFile,
        // };
        // await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', requestOptions)
        //     .then( response => {
        //         console.log(response.json());
        //         console.log(response.data);
        //     });

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
            }).catch( err => {
                console.log(err);
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
                toast.success('Image uploaded!', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
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
            toast.error('Please select a image', {
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
        return (
            <div className="wrapper">
                <ToastContainer />
                <div className="container">
                    {/* <img src={googleLogo} width="40" height="40" alt="google drive"/> */}
                    <h6 style={{marginBottom: 5, color: "darkgray", marginTop: 60, textAlign: "center"}}>
                                Upload files
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
        );
    }
}

export default UploadDrive;
