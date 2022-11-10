import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import StaffSignup from './components/SignUpPage/Staff/SignUp';
import Login from './components/pages/Login/Login';
import UploadDrive from "./components/pages/UploadDrive";
import AdminHome from './components/pages/admins/AdminHome';
import WorkerHome from './components/pages/workers/WorkerHome';
import ManagerHome from './components/pages/managers/ManagerHome';

function App() {
    return (
        <>

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/upload" element={<UploadDrive />} />
                    <Route path="/admin-home" element={<AdminHome />} />
                    <Route path="/worker-home" element={<WorkerHome />} />
                    <Route path="/manager-home" element={<ManagerHome />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
