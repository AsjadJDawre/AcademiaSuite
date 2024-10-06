import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const OverallMarks = () => {
  const [reExamDiv, setReExamDiv] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const [year, setYear] = useState("Select year");
  const [pattern, setPattern] = useState("Select pattern");
  const [semester, setSemester] = useState("Select semester");
  const [branch, setBranch] = useState("Select branch");
  const [group, setGroup] = useState("Select branch");
  const [exam, setExam] = useState("Select exam");

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
    <div className="h-full">
      <ToastContainer />

      {reExamDiv && (
        <div className="flex justify-center pt-2 pb-2 h-full gap-2">
          <div className="bg-white w-[100%]  pb-2 pr-4 pl-4 mr-4 ml-2 rounded">
            <div className="flex justify-center">
              <h1 className="text-[1.5rem] bold text-[#334155]">
                Overall Marks
              </h1>
            </div>

            <div className=""> 
              <div className="flex justify-evenly gap-2 border-b pb-2 border-t mt-2 pt-2">
                {/* for inputs */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <div className="form-group">
                      <label htmlFor="year">Year</label>
                      <select
                        //   disabled={editable || groupAlreadyDefined || !noData}
                        id="year"
                        value={year}
                        onChange={(e) => {
                          setYear(e.target.value);
                        }}
                      >
                        {years.map((option, index) => {
                          return (
                            <option key={index} value={option}>
                              {option}
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
                    <div className="flex justify-around mt-3">
                      <button
                        className="btn-save"
                        onClick={() => setIsTableVisible(true)}
                      >
                        Insert
                      </button>
                      <button className="btn-refresh">Refresh</button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="form-group">
                      <label htmlFor="branch">Branch</label>
                      <select
                        //   disabled={editable || groupAlreadyDefined || !noData}
                        id="branch"
                        value={branch}
                        onChange={(e) => {
                          setBranch(e.target.value);
                        }}
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
                    <div className="flex justify-around mt-3">
                      <button className="btn-search">View</button>
                      <button className="btn-excel">Excel</button>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between gap-2">
                  <div className="form-group h-fit">
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
                  <div className="border p-1">
                  <legend className="text-[1rem] text-gray-400">Note</legend>
                  <p>1. */@ indicates Grace marks</p>
                  <p>2. ^ indicates Resolution</p>
                  </div>
                  </div>
                </div>
                {/* for criteria */}

                {/* for info */}
                <div className="border-l pl-2">
                    <legend className="text-xl text-gray-400">Colour Indications</legend>
                    <div className="flex">
                  <fieldset>
                    <p className="align-middle">
                      <span className="bg-red-500 h-5 w-5 border"></span> -FAIL{" "}
                    </p>
                    <p className="align-middle">
                      <span className="bg-black h-5 w-5 border"></span> -PASS{" "}
                    </p>
                    <p className="align-middle">
                      <span className="bg-yellow-100 h-5 w-5 border"></span> -NO
                      HEAD FOR THIS CREDIT{" "}
                    </p>
                  </fieldset>
                  <fieldset>
                  <p className="align-middle">
                      <span className="bg-green-500 h-5 w-5 border"></span> -PASSED WITH RESOLUTION ^{" "}
                    </p>
                    <p className="align-middle">
                      <span className="bg-blue-500 h-5 w-5 border"></span> -PASSED WITH GRACE MARKS *{" "}
                    </p>
                    <p className="align-middle">
                      <span className="bg-orange-500 h-5 w-5 border"></span> -PASSED BY 50% CRITERIA !{" "}
                    </p>
                  </fieldset>
                  </div>
                </div>
                
              </div>

              {/* for table */}
              {!isTableVisible && (
                <div className="border mt-20 h-[20rem] flex justify-center align-middle">
                  <p className="text-xl text-red-600">No Results</p>
                </div>
              )}
              {isTableVisible && (
                <div className="h-[37rem] overflow-scroll w-[100rem]">
                  <table>
                    <thead>
                      <tr>
                        <th className="bg-gray-400">
                          <p
                            className="border border-white cursor-pointer rounded-full hover:text-red-600 hover:bg-white"
                            onClick={() => setIsTableVisible(false)}
                          >
                            X
                          </p>
                        </th>
                        <th className="bg-gray-400"></th>
                        <th className="bg-gray-400"></th>
                         
                        <th colspan="6" className="bg-gray-400">
                          Applied Mathematics -III
                        </th>
                        <th colspan="6" className="bg-gray-400">
                          Thermodynamics
                        </th>
                        <th colspan="6" className="bg-gray-400">
                          Strength of Materials
                        </th>
                        <th colspan="6" className="bg-gray-400">
                          Production PRocess I
                        </th>
                        
                      </tr>
                      <tr>
                        <th>Sr. No</th>
                        <th>Seat No</th>
                        <th>Student Name</th>
                        <th>H1 <br></br> 32/80</th>
                        <th>H1 <br></br> Grace</th>
                        <th>H1 <br></br> Total</th>
                        <th>H2 <br></br> 8/20</th>
                        <th>H2 <br></br> Grace</th>
                        <th>H2 <br></br> Total</th>
                        <th>H1 <br></br> 32/80</th>
                        <th>H1 <br></br> Grace</th>
                        <th>H1 <br></br> Total</th>
                        <th>H2 <br></br> 8/20</th>
                        <th>H2 <br></br> Grace</th>
                        <th>H2 <br></br> Total</th>
                        <th>H1 <br></br> 32/80</th>
                        <th>H1 <br></br> Grace</th>
                        <th>H1 <br></br> Total</th>
                        <th>H2 <br></br> 8/20</th>
                        <th>H2 <br></br> Grace</th>
                        <th>H2 <br></br> Total</th>
                        <th>H1 <br></br> 32/80</th>
                        <th>H1 <br></br> Grace</th>
                        <th>H1 <br></br> Total</th>
                        <th>H2 <br></br> 8/20</th>
                        <th>H2 <br></br> Grace</th>
                        <th>H2 <br></br> Total</th>                       
                        
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>MEC2001</td>
                        <td>Raj Ramesh Pakhurde</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                        <td>H1</td>
                        <td>H2</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OverallMarks;
