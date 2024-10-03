import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Modal, Button } from "antd";
import SearchIcon from "@mui/icons-material/Search";

const MarksEntry = () => {
  const [year, setYear] = useState("Select year");
  const [pattern, setPattern] = useState("Select pattern");
  const [transferPattern, setTransferPattern] = useState("Select pattern");
  const [semester, setSemester] = useState("Select semester");
  const [branch, setBranch] = useState("Select branch");
  const [exam, setExam] = useState("Select exam");

  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState(["Select subject"]);

  const [paternTransferDiv, setPatternTransferDiv] = useState(true);

  const [exams, setExams] = useState([""]);
  const [examtypeValue, setExamTypeValue] = useState("");
  const [examIdForeignKey, setExamIdForeignKey] = useState("");

  // Error modal states
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [isEditCriteriaDisable, setIsEditCriteriaDisable] = useState(true);
  const [editCriteria, setEditCriteria] = useState("");

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
    "select branch",
    "COMPUTER ENGINEERING",
    "MECHANICAL ENGINEERING",
    "CIVIL ENGINEERING",
    "ELECTRICAL ENGINEERING",
  ];

  const handleEdit = () => {
    setIsEditCriteriaDisable(false);
  };

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await window.api.invoke("fetch-exam-code");
        setExams(response);
      } catch (error) {
        console.error("Error fetching exams:", error);
        setErrorMessage("Error fetching exams.");
        setShowErrorModal(true);
      }
    };

    fetchExams();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setSubjects([]);
      const data = {
        exam_id: examIdForeignKey,
      };
      const response = await window.api.invoke(
        "fetch-subject-branch-wise",
        data
      );
      const filteredSubjects = response.filter(
        (item) => item.subject_name !== null && item.subject_name.trim() !== ""
      );

      // Use a Set to filter out duplicate subject names
      const uniqueSubjectNames = Array.from(
        new Set(filteredSubjects.map((item) => item.subject_name))
      );

      setSubjects(["Select subject", ...uniqueSubjectNames]);
    };
    fetchData();
  }, [examIdForeignKey]);

  return (
    <div className="exam-code-container">
      <ToastContainer />

      {paternTransferDiv && (
        <div className="first-div">
          <div className="bg-white rounded form-exam-code">
            <h1 className="form-title">Marks Entry</h1>
            <div className="form-main m-4">
              <div className="form-group">
                <label htmlFor="year">Year:</label>
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

              <div>
                <div className="form-group">
                  <label htmlFor="branch">Branch:</label>
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
              <div className="form-group">
                <label htmlFor="exam">Exam</label>
                <select
                  id="exam"
                  value={examtypeValue}
                  onChange={(e) => {
                    setExamTypeValue(e.target.value);
                    const selectedIndex = e.target.selectedIndex;
                    const selectedOption = e.target.options[selectedIndex];
                    setExamIdForeignKey(selectedOption.id);
                  }}
                >
                  <option value="" disabled selected>
                    Select Exam
                  </option>

                  {exams.map((option, index) => {
                    const branchShort = option.branch
                      ? option.branch.slice(0, 4)
                      : "";
                    const heldinMonth = option.heldin_month || "";
                    const heldinYear = option.heldin_year || "";
                    const examType = option.type
                      ? option.type.split(" ")[0]
                      : "";
                    return (
                      <option
                        key={index}
                        id={option.exam_id}
                        value={`${branchShort}. ${heldinMonth}-${heldinYear}. ${examType}`}
                      >
                        {`${branchShort}. ${heldinMonth}-${heldinYear}. ${examType}`}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="pattern">Pattern</label>
                <select
                  //   disabled={editable || groupAlreadyDefined || !noData}
                  id="pattern"
                  value={pattern}
                  onChange={(e) => {
                    setPattern(e.target.value);
                  }}
                >
                  {patterns.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                >
                  {subjects.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <div className="h-fit flex align-middle gap-1 border p-2 ">
                  <input
                    type="radio"
                    id="student-wise-radio"
                    name="studentwise"
                    value="student-wise-radio"
                    //   checked={examType === "Regular Exam"}
                    //   onChange={(e) => setExamType(e.target.value)}
                    //   disabled={status}
                  ></input>
                  <label htmlFor="student-wise-radio">Student wise</label>
                </div>
                <div className="border p-2 h-fit">
                  <label>Seat No.</label>
                  <div className="h-fit flex align-middle gap-1">
                    <input
                      type="radio"
                      id="numeric-radio"
                      name="seatno"
                      value="numeric-radio"
                      //   checked={examType === "Regular Exam"}
                      //   onChange={(e) => setExamType(e.target.value)}
                      //   disabled={status}
                    ></input>
                    <label htmlFor="numeric-radio">Numeric</label>
                  </div>
                  <div className="h-fit flex align-middle gap-1">
                    <input
                      type="radio"
                      id="alphanumeric-radio"
                      name="seatno"
                      value="alphanumeric-radio"
                      //   checked={examType === "A.T.K.T"}
                      //   onChange={(e) => setExamType(e.target.value)}
                      //   disabled={status}
                    ></input>
                    <label htmlFor="alphanumeric-radio">Alphanumeric</label>
                  </div>
                  <div className="h-fit flex align-middle gap-1">
                    <input
                      type="radio"
                      id="mix-radio"
                      name="seatno"
                      value="mix-radio"
                      //   checked={examType === "A.T.K.T"}
                      //   onChange={(e) => setExamType(e.target.value)}
                      //   disabled={status}
                    ></input>
                    <label htmlFor="mix-radio">mix</label>
                  </div>
                </div>

                <div className="h-fit flex align-middle gap-1">
                  <fieldset>
                    <p className="align-middle text-xs">
                      <span className="bg-orange-100 h-5 w-5 border"></span> -No
                      Heads for <br /> such Credit{" "}
                    </p>
                    <p className="align-middle text-xs">
                      <span className="bg-blue-100 h-5 w-5 border"></span>{" "}
                      -Marks Carried{" "}
                    </p>
                    <p className="align-middle text-xs">
                      <span className="bg-gray-100 h-5 w-5 border text-center">
                        Ab
                      </span>{" "}
                      -For Absent{" "}
                    </p>
                  </fieldset>
                </div>
              </div>

              <div className="form-buttons">
                <button className="btn-save">Save</button>
                <button className="btn-refresh">Refresh</button>
                <button className="btn-edit" onClick={handleEdit}>
                  Edit
                </button>
                <button className="btn-getdata">Get Data</button>
                <button className="btn-import">Import</button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Modal
        title="Search Student"
        open={!isEditCriteriaDisable}
        onCancel={() => {
          setIsEditCriteriaDisable(true);
          setEditCriteria("");
        }}
        onOk={() => {
          setIsEditCriteriaDisable(true);
          setEditCriteria("");
        }}
        width={900}
      >
        <div className="flex flex-col gap-2 pt-4">
          {/* edit criteria */}
          <div className="border p-2 h-fit flex gap-5">
            <label className="font-bold pl-4">Edit Criteria:</label>
            <div className="h-fit flex align-middle gap-1">
              <input
                type="radio"
                id="single-radio"
                name="editcriteria"
                value="single-radio"
                checked={editCriteria === "single-radio"}
                onChange={(e) => setEditCriteria(e.target.value)}
                //   disabled={isEditCriteriaDisable}
              ></input>
              <label htmlFor="single-radio">For Single</label>
            </div>
            <div className="h-fit flex align-middle gap-1">
              <input
                type="radio"
                id="muliple-radio"
                name="editcriteria"
                value="muliple-radio"
                checked={editCriteria === "muliple-radio"}
                onChange={(e) => setEditCriteria(e.target.value)}
                //   disabled={isEditCriteriaDisable}
              ></input>
              <label htmlFor="muliple-radio">For Mulitple</label>
            </div>
          </div>
          {/* for single */}
          {editCriteria === "single-radio" && (
            <div className="flex justify-between">
              <div className="form-group w-full ">
                <label htmlFor="name" className="block mb-2">
                  Enter Student Name / Id
                </label>
                <input
                  type="text"
                  id="name"
                  name="firstName"
                  className="w-full pl-5 rounded"
                  //   value={formData.firstName}
                  //   onChange={handleInputChange}
                  placeholder="Search here..."
                />
              </div>
              <div className="w-fit h-fit p-3 rounded-full text-blue-500 cursor-pointer">
                <h1>
                  <SearchIcon className="rounded-full" fontSize="" />
                </h1>
              </div>
            </div>
          )}
          <div className="">
            <table className="w-full ml-0">
              <thead>
                <tr>
                  <th>Sr. No</th>
                  <th>Stud_id</th>
                  <th>Seat No</th>
                  <th>Student Name</th>
                  <th>Credit</th>
                  <th>ESE/PR/OR</th>
                  <th>IA/TW</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                    <td>1</td>
                    <td>12345</td>
                    <td>123455</td>
                    <td className="text-start">Raj Ramesh Pakhurde</td>
                    <td>4</td>
                    <td><input type="text" value={"34"}/></td>
                    <td><input type="text" value={"11"}/></td>
                </tr>
              </tbody>
            </table>
          </div>
          {/* for single */}
          {editCriteria === "muliple-radio" && (
            <div>
              <p>For Mulitple</p>
            </div>
          )}
        </div>
        <hr />
      </Modal>
    </div>
  );
};

export default MarksEntry;
