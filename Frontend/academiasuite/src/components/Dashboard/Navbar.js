import React, { useState } from "react";
import RoofingIcon from "@mui/icons-material/Roofing";
import SubjectIcon from "@mui/icons-material/Subject";
import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import PatternIcon from '@mui/icons-material/Pattern';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';

import "../../assets/styles/navbar.css";

const Navbar = (props) => {
  const [activeMenu, setActiveMenu] = useState("home");
  const [activeSubMenu, setActiveSubMenu] = useState("");
  const [activeSubSubMenu, setActiveSubSubMenu] = useState("");
  const [forwordArrow, setForwordArrow] = useState("►");
  const [downArrow, setDownArrow] = useState("▼");

  const dropdownActive = {
    display: "flex",
    flexDirection: "column",
    alignItem: "center",
    height: "auto",
    opacity: "1",
  };
  const dropdownDisable = {
    maxHeight: "0",
    opacity: "0",
    overflow: "hidden",
    transition: "max-height 0.9s ease, opacity 0.9s ease",
  };
  const activeMenustyle = {
    backgroundColor: "#E9F3FD",
    color: "#2B5ED6",
  };

  const disableMenustyle = {
    backgroundColor: "transparent",
    color: "#8B8A8E",
  };
  const activeSubSubMenustyle = {
    color: "#E1767B",
  };
  const disableSubsubMenustyle = {
    color: "#8B8A8E",
  };

  return (
    <div className="nav-container">
      {/* // home nav element */}
      <div
        style={activeMenu === "home" ? activeMenustyle : disableMenustyle}
        className="nav-item hover:text-yellow-200"
        onClick={() => {
          setActiveMenu("home");
          setActiveSubMenu("");
          setActiveSubSubMenu("");
          props.setActiveMainComponent("home");
        }}
      >
        <p className="mb-0 p-2">
          <RoofingIcon /> Home
        </p>
      </div>

      {/* // subject nav element */}
      <div
        className="nav-item"
        style={activeMenu === "subject" ? activeMenustyle : disableMenustyle}
        onClick={() => {
          setActiveSubMenu("subject");
          setActiveMenu("subject");
        }}
      >
        <p className="mb-0 p-2">
          <SubjectIcon /> Subject
        </p>
        <p className="mb-0 p-2">{activeMenu === "subject" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-subject dropdown "
        style={activeSubMenu !== "subject" ? dropdownDisable : dropdownActive}
      >
        <p
          style={
            activeSubSubMenu === "subject_master"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1 submenu-item"
          onClick={() => {
            setActiveSubSubMenu("subject_master");
            props.setActiveMainComponent("subject_master");
          }}
        >
          Subject Master
        </p>
        <p
          style={
            activeSubSubMenu === "group_master"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item2 submenu-item"
          onClick={() => {
            setActiveSubSubMenu("group_master");
            props.setActiveMainComponent("group_master");
          }}
        >
          Subject Group
        </p>
      </div>

      {/* // Exam nav element */}
      <div
        style={activeMenu === "exam" ? activeMenustyle : disableMenustyle}
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("exam");
          setActiveMenu("exam");
        }}
      >
        <p className="mb-0 p-2">
          <DescriptionIcon /> Exam
        </p>
        <p className="mb-0 p-2">{activeMenu === "exam" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-subject dropdown"
        style={activeSubMenu !== "exam" ? dropdownDisable : dropdownActive}
      >
        <p
          style={
            activeSubSubMenu === "exam-code"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("exam-code");
            props.setActiveMainComponent("exam-code");
          }}
        >
          Exam Code
        </p>
        <p
          style={
            activeSubSubMenu === "student-attendence"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item2"
          onClick={() => {
            setActiveSubSubMenu("student-attendence");
            props.setActiveMainComponent("student-attendence");
          }}
        >
          Student Attendence
        </p>
        <p
          style={
            activeSubSubMenu === "re-exam-eligibility"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item2"
          onClick={() => {
            setActiveSubSubMenu("re-exam-eligibility");
            props.setActiveMainComponent("re-exam-eligibility");
          }}
        >
          Re-Exam Eligibility
        </p>
      </div>

      {/* // StudentEntry nav element */}
      <div
        style={
          activeMenu === "studentEntry" ? activeMenustyle : disableMenustyle
        }
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("studentEntry");
          setActiveMenu("studentEntry");
        }}
      >
        <p className="mb-0 p-2">
          <PersonIcon /> Student
        </p>
        <p className="mb-0 p-2">{activeMenu === "studentEntry" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-studentEntry dropdown"
        style={
          activeSubMenu !== "studentEntry" ? dropdownDisable : dropdownActive
        }
      >
        <p
          style={
            activeSubSubMenu === "student_entry"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("student_entry");
            props.setActiveMainComponent("student_entry");
          }}
        >
          Student Entry
        </p>
      </div>

      {/* // Pattern nav element */}
      <div
        style={
          activeMenu === "pattern" ? activeMenustyle : disableMenustyle
        }
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("pattern");
          setActiveMenu("pattern");
        }}
      >
        <p className="mb-0 p-2">
          <PatternIcon /> Pattern
        </p>
        <p className="mb-0 p-2">{activeMenu === "pattern" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-pattern dropdown"
        style={
          activeSubMenu !== "pattern" ? dropdownDisable : dropdownActive
        }
      >
        <p
          style={
            activeSubSubMenu === "pattern_transfer"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("pattern_transfer");
            props.setActiveMainComponent("pattern_transfer");
          }}
        >
          Pattern Transfer
        </p>
      </div>

      {/* // Entry nav element */}
      <div
        style={
          activeMenu === "entry" ? activeMenustyle : disableMenustyle
        }
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("entry");
          setActiveMenu("entry");
        }}
      >
        <p className="mb-0 p-2">
          <AppRegistrationIcon /> Entry
        </p>
        <p className="mb-0 p-2">{activeMenu === "entry" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-entry dropdown"
        style={
          activeSubMenu !== "entry" ? dropdownDisable : dropdownActive
        }
      >
        <p
          style={
            activeSubSubMenu === "marks_entry"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("marks_entry");
            props.setActiveMainComponent("marks_entry");
          }}
        >
          Marks Entry
        </p>
        <p
          style={
            activeSubSubMenu === "overall_marks"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("overall_marks");
            props.setActiveMainComponent("overall_marks");
          }}
        >
          Overall Marks
        </p>
        <p
          style={
            activeSubSubMenu === "overall_eligibility"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("overall_eligibility");
            props.setActiveMainComponent("overall_eligibility");
          }}
        >
          Overall Eligibility
        </p>
      </div>
           {/* // Pattern nav element */}
      <div
        style={
          activeMenu === "academic" ? activeMenustyle : disableMenustyle
        }
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("academic");
          setActiveMenu("academic");
        }}
      >
        <p className="mb-0 p-2">
          <PatternIcon /> Academic
        </p>
        <p className="mb-0 p-2">{activeMenu === "academic" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-pattern dropdown"
        style={
          activeSubMenu !== "academic" ? dropdownDisable : dropdownActive
        }
      >
        <p
          style={
            activeSubSubMenu === "academic_eligibility"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={() => {
            setActiveSubSubMenu("academic_eligibility");
            props.setActiveMainComponent("academic_eligibility");
          }}
        >
          Academic Eligibility
        </p>
      </div>
    </div>
  );
};

export default Navbar;
