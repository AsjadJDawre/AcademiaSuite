import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "antd";

const AcademicEligibility = () => {
  const [year, setYear] = useState("");
  const [preYear, setPreYear] = useState("");
  const [branch, setBranch] = useState("");
  const [semester, setSemester] = useState("Select semester");
  const [nameId, setNameId] = useState("");
  const [stutypeValue, setStuTypeValue] = useState("");

  const [academiceligibility, setacademiceligibility] = useState(true);
  const [getDataDiv, setGetDataDiv] = useState(false);

  const years = [
    "Select year",
    "01/June 2011-31/May/2012",
    "01/June 2012-31/May/2013",
    "01/June 2013-31/May/2014",
  ];

  const semesters = [
    "Select semester",
    "Semester 1",
    "Semester 2",
    "Semester 3",
    "Semester 4",
  ];
  const branches = [
    "select branch",
    "COMPUTER ENGINEERING",
    "MECHANICAL ENGINEERING",
    "CIVIL ENGINEERING",
    "ELECTRICAL ENGINEERING",
  ];

  return (
    <div className="exam-code-container">
      <ToastContainer />

      {academiceligibility && (
        <div className="first-div">
          <div className="form-container form-exam-code">
            <h1 className="form-title">Academic Eligibility</h1>
            <form className="form-main">
              <div className="form-group">
                <label htmlFor="year">Year:</label>
                <select
                  id="year"
                  //   disabled={status}
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
              <div className="form-group">
                <label htmlFor="year">Previous Year:</label>
                <select
                  id="year"
                  //   disabled={status}
                  value={preYear}
                  onChange={(e) => setPreYear(e.target.value)}
                >
                  {years.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="branch">Branch:</label>
                <select
                  id="branch"
                  //   disabled={status}
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
                  //   disabled={editable || groupAlreadyDefined || !noData}
                  id="semester"
                  value={semester}
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                >
                  {semesters.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group radio-group">
                <div>
                  <input
                    type="radio"
                    id="regular"
                    name="stutype"
                    value="regular"
                    checked={stutypeValue === "Regular"}
                    onChange={(e) => setStuTypeValue(e.target.value)}
                    // disabled={status}
                  ></input>
                  <label htmlFor="regular-exam">Regular</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="provisional"
                    name="stutype"
                    value="provisional"
                    checked={stutypeValue === "provisional"}
                    onChange={(e) => setStuTypeValue(e.target.value)}
                    // disabled={status}
                  ></input>
                  <label htmlFor="provisional">Provisional</label>
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" className="btn-getdata" onClick={()=> setGetDataDiv(true)}>
                  Get Data
                </button>
                <button
                  type="button"
                  className="btn-edit"
                    // onClick={handleAddRes}
                >
                  Eligibile
                </button>
                <button
                  type="button"
                  className="btn-exit"
                  id="btn-ref-sub-mas"
                  //   onClick={() => handleRefreshBtn()}
                >
                  Report
                </button>
                <button
                  type="button"
                  className="btn-edit"
                  //   onClick={handleStatus}
                >
                  Edit
                </button>
              </div>
              <div className="form-buttons pt-0">
                <button type="button" className="btn-save">
                  Save
                </button>
                <button
                  type="button"
                  className="btn-import"
                  //   onClick={handleAddRes}
                >
                  Import
                </button>
                <button
                  type="button"
                  className="btn-excel"
                  id="btn-ref-sub-mas"
                  //   onClick={() => handleRefreshBtn()}
                >
                  Excel
                </button>
                <button
                  type="button"
                  className="btn-refresh"
                  //   onClick={handleStatus}
                >
                  Refresh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {getDataDiv && (
        <div className="status-div">
          <div className="status-div-1">
            <table>
              <thead>
                <tr>
                  <th>Check</th>
                  <th>Student_id</th>
                  <th>Student Name</th>     
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>12345</td>
                    <td>Raj Ramesh Pakhurde</td>
                </tr>
                <tr>
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>12345</td>
                    <td>Raj Ramesh Pakhurde</td>
                </tr>
                <tr>
                    <td>
                        <input 
                            type="checkbox"
                        />
                    </td>
                    <td>12345</td>
                    <td>Raj Ramesh Pakhurde</td>
                </tr>
                {/* {exam.map((exam, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <EditOutlinedIcon
                          className="cursor-pointer text-green-300"
                          onClick={() => {
                            showEditModel();
                            setEditHeldYear(exam.heldin_year);
                            setEditHeldMonth(exam.heldin_month);
                            setEditExamId(exam.exam_id);
                          }}
                        />
                      </td>
                      <td>
                        <DeleteOutlineOutlinedIcon
                          className="cursor-pointer text-rose-400"
                          id={exam.exam_id}
                          onClick={showDeleteModel}
                        />
                      </td>
                      <td>{`EXM${exam.exam_id}`}</td>
                      <td className="text-left">{`${exam.branch.slice(
                        0,
                        4
                      )}. -${exam.heldin_month} ${exam.heldin_year} (${
                        exam.type.split(" ")[0]
                      })`}</td>
                      <td>
                        <input
                          type="checkbox"
                          id={exam.exam_id}
                          checked={exam.is_current === 1}
                          onChange={handleUpdateIsCurrent}
                        />
                      </td>
                      <td>
                        <input
                          type="checkbox"
                          id={exam.exam_id}
                          checked={exam.is_lock === 1}
                          onChange={handleUpdateIsLock}
                        />
                      </td>
                    </tr>
                  );
                })} */}
              </tbody>
            </table>
          </div>
          <div className='btn-close-status'>
                    <button className='btn-exit ' onClick={() => {setGetDataDiv(false)}}>Exit</button>
                </div> 
        </div>
      )}
    </div>
  );
};

export default AcademicEligibility;
