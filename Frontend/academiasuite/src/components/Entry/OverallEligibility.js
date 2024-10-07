import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const OverallEligibility = () => {
  const [overallEligibilityDiv, setOverallEligibilityDiv] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(false);

  const [year, setYear] = useState("Select year");
  const [pattern, setPattern] = useState("Select pattern");
  const [semester, setSemester] = useState("Select semester");
  const [branch, setBranch] = useState("Select branch");
  const [group, setGroup] = useState("Select branch");

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
  return (
    <div className="h-full">
      <ToastContainer />

      {overallEligibilityDiv && (
        <div className="flex justify-center pt-2 pb-2 h-full gap-2">
          <div className="bg-white w-[100%]  pb-2 pr-4 pl-4 mr-4 ml-4 rounded">
            <div className="flex justify-center">
              <h1 className="text-[1.5rem] bold text-[#334155]">
                Over-all Eligibility
              </h1>
            </div>

            <div className="">
              <div className="flex justify-evenly gap-2 border-b pb-2 border-t pt-2">
                {/* for inputs */}
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2 justify-between">
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
                  </div>
                </div>

                <div className="flex flex-col justify-between gap-2">
                  <div className="flex bg-[#F7F7F7] rounded-sm p-[1.5rem] border border-[#E6E6E6] radio-group">
                    <div>
                      <input
                        type="checkbox"
                        id="exam-type"
                        name="examtype"
                        value="copy credits"
                        // checked={examType === "Regular Exam"}
                        // onChange={(e) => setExamType(e.target.value)}
                        // disabled={status}
                      ></input>
                      <label htmlFor="regular-exam">Copy Credits</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="atkt"
                        name="examtype"
                        value="SGPI Round1"
                        // checked={examType === "A.T.K.T"}
                        // onChange={(e) => setExamType(e.target.value)}
                        // disabled={status}
                      ></input>
                      <label htmlFor="atkt">SGPI Round 1</label>
                    </div>
                  </div>
                  <div className="border p-2">
                    <legend className="text-xl text-gray-400">
                      Academic Year
                    </legend>
                    <div className="flex pl-8 gap-8">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id="exam-type"
                          name="examtype"
                          value="first year"
                          // checked={examType === "Regular Exam"}
                          // onChange={(e) => setExamType(e.target.value)}
                          // disabled={status}
                        ></input>
                        <label htmlFor="regular-exam">First Year</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id="atkt"
                          name="examtype"
                          value="second year"
                          // checked={examType === "A.T.K.T"}
                          // onChange={(e) => setExamType(e.target.value)}
                          // disabled={status}
                        ></input>
                        <label htmlFor="atkt">Second Year</label>
                      </div>
                    </div>
                    <div className="flex pl-8 gap-7">
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id="exam-type"
                          name="examtype"
                          value="copy credits"
                          // checked={examType === "Regular Exam"}
                          // onChange={(e) => setExamType(e.target.value)}
                          // disabled={status}
                        ></input>
                        <label htmlFor="regular-exam">Third Year</label>
                      </div>
                      <div className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          id="atkt"
                          name="examtype"
                          value="SGPI Round1"
                          // checked={examType === "A.T.K.T"}
                          // onChange={(e) => setExamType(e.target.value)}
                          // disabled={status}
                        ></input>
                        <label htmlFor="atkt">Fourth Year</label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* for criteria */}
                <div className="pl-2 pr-2">
                  <div className="form-group radio-group">
                    <div>
                      <input
                        type="radio"
                        id="all-stu-radio-btn"
                        name="criteria-re-exam"
                        value="all-stu-radio-btn"
                        //   checked={examType === "Regular Exam"}
                        //   onChange={(e) => setExamType(e.target.value)}
                        //   disabled={status}
                      ></input>
                      <label htmlFor="all-stu-radio-btn">All Student</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="single-stu-radio-btn"
                        name="criteria-re-exam"
                        value="single-stu-radio-btn"
                        //   checked={examType === "A.T.K.T"}
                        //   onChange={(e) => setExamType(e.target.value)}
                        //   disabled={status}
                      ></input>
                      <label htmlFor="single-stu-radio-btn">
                        Single Student
                      </label>
                    </div>
                  </div>
                </div>

                {/* for buttons */}
                <div className="flex flex-col justify-evenly border-l pl-2">
                  <button
                    className="btn-getdata"
                    onClick={() => setIsTableVisible(true)}
                  >
                    Get Data
                  </button>
                  <button className="btn-search">Insert</button>
                  <button className="btn-save">Save</button>
                  <button className="btn-exit">Report</button>
                </div>
              </div>

              {/* for table */}
              {!isTableVisible && (
                <div className="border mt-20 h-[20rem] flex justify-center align-middle">
                  <p className="text-xl text-red-600">No Results</p>
                </div>
              )}
              {isTableVisible && (
                <div className="h-[39rem] w-[98rem] overflow-scroll">
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
                      </tr>
                      <tr>
                        <th>Sr. No</th>
                        <th>Seat No</th>
                        <th>Student Name</th>
                        <th>Sem-3  CG</th>
                        <th>Sem-3  Credit</th>
                        <th>Sem-3  theory</th>
                        <th>Sem-4  CG</th>
                        <th>Sem-4  Credit</th>
                        <th>Sem-4  theory</th>
                        <th>Sem-5  CG</th>
                        <th>Sem-5  Credit</th>
                        <th>Sem-5  theory</th>
                        <th>Sem-6  CG</th>
                        <th>Sem-6  Credit</th>
                        <th>Sem-6  theory</th>         
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

export default OverallEligibility;
