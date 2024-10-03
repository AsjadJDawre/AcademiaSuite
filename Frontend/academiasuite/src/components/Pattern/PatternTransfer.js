import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const PatternTransfer = () => {
  const [year, setYear] = useState("Select year");
  const [pattern, setPattern] = useState("Select pattern");
  const [transferPattern, setTransferPattern] = useState("Select pattern");
  const [semester, setSemester] = useState("Select semester");
  const [branch, setBranch] = useState("Select branch");
  const [exam, setExam] = useState("Select exam");

  const [paternTransferDiv, setPatternTransferDiv] = useState(true);

  const [exams, setExams] = useState([""]);
  const [examtypeValue, setExamTypeValue] = useState("");
  const [examIdForeignKey, setExamIdForeignKey] = useState("");

  // Error modal states
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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

  return (
    <div className="exam-code-container">
      <ToastContainer />

      {paternTransferDiv && (
        <div className="first-div">
          <div className="form-container form-exam-code">
            <h1 className="form-title">Pattern Transfer</h1>
            <form className="form-main">
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
                <label htmlFor="pattern">Transfer to Pattern</label>
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

              <div className="form-buttons">
                <button type="button" className="btn-edit"  >
                  Get Data
                </button>
                <button
                  type="button"
                  className="btn-save"
                >
                  Save
                </button>
                <button type="button" className="btn-refresh">
                  Refresh
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatternTransfer;
