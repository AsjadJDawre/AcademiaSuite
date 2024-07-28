import React, { useState } from "react";
import "../../assets/styles/groupmaster.css";

const GroupMaster = () => {
  const [isChecked, setIsChecked] = useState(false);

  const [year, setYear] = useState("");
  const [toYear, setToYear] = useState("");
  const [fromYear, setFromYear] = useState("");
  const [pattern, setPattern] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [groupName, setGroupName] = useState("");

  const years = [
    "Select year",
    "01/June 2011-31/May/2012",
    "01/June 2012-31/May/2013",
    "01/June 2013-31/May/2014",
  ];
  const patterns = ["Select pattern", "CBGS", "Old Pattern"];
  const semesters = [
    "Select semester",
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
  ];
  const branches = [
    "Select branch",
    "MECHANICAL ENGINEERING",
    "CIVIL ENGINEERING",
    "ELECTRICAL ENGINEERING",
  ];

  const handleRefreshBtn = () => {
    setYear("");
    setPattern("");
    setSemester("");
    setBranch("");
    setGroupName("");
    setToYear("");
    setFromYear("");
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
    console.log(isChecked);
  };

  return (
    <div className="group-master-container">
      <div className="first-div">
        <div className="form-container form-sub-mas">
          <h1 className="form-title">Subject Master</h1>
          <form className="form-main">
            <div className="form-element-appy">
              <label htmlFor="year">As per previous syllabus</label>
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckbox}
              />
            </div>
            
            {isChecked && ( 
                <>
                    <div className="form-group">
                        <label htmlFor="year">To Year</label>
                        <select
                            id="year"
                            value={toYear}
                            onChange={(e) => setToYear(e.target.value)}
                        >
                            {years.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="year">From Year</label>
                        <select
                            id="year"
                            value={fromYear}
                            onChange={(e) => setFromYear(e.target.value)}
                        >
                            {years.map((option, index) => (
                            <option key={index} value={option}>
                                {option}
                            </option>
                            ))}
                        </select>
                    </div> 
                 </>
                )}

            {!isChecked && (
                <div className="form-group">
                <label htmlFor="year">Year</label>
                <select
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                >
                    {years.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                    ))}
                </select>
                </div>
            )}

            <div className="form-group">
              <label htmlFor="pattern">Pattern</label>
              <select
                id="pattern"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
              >
                {patterns.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select
                id="branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
              >
                {branches.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select
                id="semester"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                {semesters.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            
            {isChecked && (
                <div className="form-group">
                    <label htmlFor="semester">Group name</label>
                    <select
                        id="semester"
                        value={semester}
                        onChange={(e) => setSemester(e.target.value)}
                    >
                        {semesters.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                        ))}
                    </select>
                </div>
            )}
            {!isChecked && (
                <div className="form-group">
                    <label htmlFor="semester">Group name</label>
                    <input type="text" placeholder="Enter group name" value={groupName} onChange={(e) => setGroupName(e.target.value)}/>
                </div>
            )}

            <div className="form-buttons">
              <button type="button" className="btn-edit">
                Edit
              </button>
              <button
                type="button"
                className="btn-refresh"
                id="btn-ref-sub-mas"
                onClick={handleRefreshBtn}
              >
                Refresh
              </button>
              <button type="button" className="btn-exit">
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={"sec-div fetch-subject"}>
          <table>
            <thead>
                <tr>
                    <th>Check</th>
                    <th>Subject ID</th>
                    <th>Subject Name</th>
                </tr>
            </thead>
            <tbody>
                {semesters.map((subject, index) => {
                    return (
                        <tr key={index}>
                            <td><input type="checkbox" /></td>
                            <td>sub111</td>
                            <td>{subject}</td>
                        </tr>
                    )
                })}
            </tbody>
          </table>
            <div className="btn-div">
                <button type="button" className="btn-save">
                    save
                </button>
            </div>
      </div>
    </div>
  );
};

export default GroupMaster;
