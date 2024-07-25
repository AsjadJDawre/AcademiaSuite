import React, { useState } from "react";
import "../../assets/styles/dashboard.css";
import PersonIcon from '@mui/icons-material/Person';
import Navbar from "./Navbar";
import Home from '../Home/Home'
import SubjectMaster from '../Subject/SubjectMaster'

const Dashboard = () => {
  const [activeMainComponent, setActiveMainComponent] = useState("home")

  const renderMainComponent = () => {
    switch (activeMainComponent) {
      case 'home':
        return <Home setActiveMainComponent={setActiveMainComponent} />;
      case 'subject_master':
        return <SubjectMaster setActiveMainComponent={setActiveMainComponent} />
    }

  }

  return (
    <div className="dashboard-container">
      <div className="top-bar">
        <h2>ACADEMIA<span className="logo">SUITE</span></h2>
        <h4 className="username">Username <PersonIcon  style={{color: '2B5ED6', fontSize: '1.5rem', backgroundColor: 'E9F3FD', borderRadius: '5px', padding: '2px'}}/></h4>
      </div>
      <div className="side-bar two-div">
        <Navbar setActiveMainComponent={setActiveMainComponent} />
      </div>
      <div className="main-container two-div">
        {renderMainComponent()}
      </div>
    </div>
  );
};

export default Dashboard;
