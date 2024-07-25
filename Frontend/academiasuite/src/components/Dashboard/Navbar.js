import React, { useState } from "react";
import RoofingIcon from "@mui/icons-material/Roofing";
import SubjectIcon from "@mui/icons-material/Subject";
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
  };
  const dropdownDisable = {
    display: "none",
  };
  const activeMenustyle = {
    backgroundColor: "#E9F3FD",
    color: "#2B5ED6",
  };

  const disableMenustyle = {
    backgroundColor: "white",
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
      <div
        className="nav-item hover:text-yellow-200"
        style={activeMenu === "home" ? activeMenustyle : disableMenustyle}
        onClick={() => {
          setActiveMenu("home");
          setActiveSubMenu("");
          setActiveSubSubMenu("");
          props.setActiveMainComponent("home")
        }}
      >
        <p>
          <RoofingIcon /> Home
        </p>
      </div>

      <div
        style={activeMenu === "subject" ? activeMenustyle : disableMenustyle}
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("subject");
          setActiveMenu("subject");
        }}
      >
        <p>
          <SubjectIcon /> Subject
        </p>
        <p>{activeMenu === "subject" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-subject dropdown"
        style={activeSubMenu !== "subject" ? dropdownDisable : dropdownActive}
      >
        <p
          style={
            activeSubSubMenu === "subject_master"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1 submenu-item"
          onClick={ () => {
            setActiveSubSubMenu("subject_master");
            props.setActiveMainComponent("subject_master");
          }}
        >
          Subject Master
        </p>
        <p
          style={
            activeSubSubMenu === "subject_group"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item2 submenu-item"
          onClick={() => {
            setActiveSubSubMenu("subject_group")
          }}
        >
          Subject Group
        </p>
      </div>

      <div
        style={activeMenu === "exam" ? activeMenustyle : disableMenustyle}
        className="nav-item"
        onClick={() => {
          setActiveSubMenu("exam");
          setActiveMenu("exam");
        }}
      >
        <p>
          <SubjectIcon /> Exam
        </p>
        <p>{activeMenu === "exam" ? downArrow : forwordArrow}</p>
      </div>
      <div
        className="dropdown-subject dropdown"
        style={activeSubMenu !== "exam" ? dropdownDisable : dropdownActive}
      >
        <p
          style={
            activeSubSubMenu === "exam_master"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item1"
          onClick={ () => {
            setActiveSubSubMenu("exam_master")
          } }
        >
          Exam Master
        </p>
        <p
          style={
            activeSubSubMenu === "exam_group"
              ? activeSubSubMenustyle
              : disableSubsubMenustyle
          }
          className="submenu-item2"
          onClick={() => {
            setActiveSubSubMenu("exam_group")
          }}
        >
          Exam Group
        </p>
      </div>
    </div>
  );
};

export default Navbar;
