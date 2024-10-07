import React, { useState } from "react";
// import "../../assets/styles/dashboard.css";
import PersonIcon from "@mui/icons-material/Person";
import Navbar from "./Navbar";
import Home from "../Home/Home";
import SubjectMaster from "../Subject/SubjectMaster";
import GroupMaster from "../Subject/GroupMaster";
import ExamCode from "../Exam/ExamCode";
import StudentAttendence from "../Exam/StudentAttendence";
import StudentEntry from "../Student_Entry/StudentEntry";
import ReExamEligibility from "../Exam/ReExamEligibility";
import MarksEntry from "../Entry/MarksEntry";
import PatternTransfer from "../Pattern/PatternTransfer";
import OverallMarks from "../Entry/OverallMarks";
import OverallEligibility from "../Entry/OverallEligibility";
import AcademicEligibility from "../Academic/AcademicEligibility";

const Dashboard = (props) => {
  const [activeMainComponent, setActiveMainComponent] = useState("home");

  const renderMainComponent = () => {
    switch (activeMainComponent) {
      case "home":
        return <Home setActiveMainComponent={setActiveMainComponent} />;
      case "subject_master":
        return (
          <SubjectMaster setActiveMainComponent={setActiveMainComponent} />
        );
      case "group_master":
        return <GroupMaster setActiveMainComponent={setActiveMainComponent} />;
      case "exam-code":
        return <ExamCode setActiveMainComponent={setActiveMainComponent} />;
      case "re-exam-eligibility":
        return <ReExamEligibility setActiveMainComponent={setActiveMainComponent} />;
      case "student-attendence":
        return <StudentAttendence setActiveMainComponent={setActiveMainComponent} />
      case "pattern_transfer":
        return <PatternTransfer setActiveMainComponent={setActiveMainComponent} />
      case "marks_entry":
        return <MarksEntry setActiveMainComponent={setActiveMainComponent} />
      case "overall_marks":
        return <OverallMarks setActiveMainComponent={setActiveMainComponent} />
      case "overall_eligibility":
        return <OverallEligibility setActiveMainComponent={setActiveMainComponent} />
      case "academic_eligibility":
        return <AcademicEligibility setActiveMainComponent={setActiveMainComponent} />
      case "student_entry":
        return <StudentEntry setActiveMainComponent={setActiveMainComponent} />;
    }
  };

  return (
    <div className="dashboard-container flex flex-col h-screen">
      <div className="top-bar flex justify-between pl-[2rem] pr-[2rem] pt-3 pb-3">
        <h2 className="text-2xl font-extrabold text-slate-800">
          ACADEMIA<span className="logo text-[#1659D7]">SUITE</span>
        </h2>
        <h4 className="username text-xl text-slate-800">
          {" "}{props.user}{" "}
          <PersonIcon
            style={{
              color: "2B5ED6",
              fontSize: "1.5rem",
              backgroundColor: "E9F3FD",
              borderRadius: "5px",
              padding: "2px",
            }}
            />
        </h4>
      </div>
      <div className="flex h-[100%]">
      <div className="side-bar two-div w-[20rem] h-[100%]">
        <Navbar setActiveMainComponent={setActiveMainComponent} />
      </div>
      <div className="main-container two-div w-screen bg-slate-200 section-3">
        {renderMainComponent()}
      </div>
      </div>
    </div>
  );
};

export default Dashboard;
