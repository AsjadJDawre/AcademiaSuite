import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";

const ReExamEligibility = () => {
  const [reExamDiv, setReExamDiv] = useState(true);
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
    <div className="exam-code-container">
      <ToastContainer />

      {reExamDiv && (
        <div className="flex justify-center mt-2 gap-2">
          <div className="bg-white w-[100%]  pb-2 pr-4 pl-4 mr-4 ml-4 rounded">
            <div className="flex justify-center">
              <h1>Re-Exam Eligibility</h1>
            </div>

            <div className="">
                <div className="">
                  <fieldset className="flex gap-3">
                    <input
                      type="radio"
                      id="regular-exam"
                      name="examtype"
                      value="New"
                      //   checked={examType === "Regular Exam"}
                      //   onChange={(e) => setExamType(e.target.value)}
                    ></input>
                    New{" "}
                    <input
                      type="radio"
                      id="atkt"
                      name="examtype"
                      value="A.T.K.T"
                      //   checked={examType === "A.T.K.T"}
                      //   onChange={(e) => setExamType(e.target.value)}
                    ></input>
                    Edit{" "}
                  </fieldset>
                </div>

                <div className="flex justify-evenly gap-2 border-b pb-2 border-t pt-2">
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
                    </div>
                    <div className="flex flex-col justify-between">
                      <div className="form-group">
                        <label htmlFor="group">Group</label>
                        <select
                          //   disabled={editable || groupAlreadyDefined || !noData}
                          id="group"
                          value={group}
                          onChange={(e) => {
                            setGroup(e.target.value);
                          }}
                        >
                          {semesters.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="flex bg-[#F7F7F7] rounded-sm p-[1.5rem] border border-[#E6E6E6] radio-group">
                        <label>Type :</label>
                        <div>
                          <input
                            type="radio"
                            id="exam-type"
                            name="examtype"
                            value="Regular Exam"
                            // checked={examType === "Regular Exam"}
                            // onChange={(e) => setExamType(e.target.value)}
                            // disabled={status}
                          ></input>
                          <label htmlFor="regular-exam">ATKT</label>
                        </div>
                        <div>
                          <input
                            type="radio"
                            id="atkt"
                            name="examtype"
                            value="A.T.K.T"
                            // checked={examType === "A.T.K.T"}
                            // onChange={(e) => setExamType(e.target.value)}
                            // disabled={status}
                          ></input>
                          <label htmlFor="atkt">REVAL</label>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="group">Exam</label>
                        <select
                          //   disabled={editable || groupAlreadyDefined || !noData}
                          id="group"
                          value={group}
                          onChange={(e) => {
                            setGroup(e.target.value);
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
                        <label htmlFor="group">Assign Exam</label>
                        <select
                          //   disabled={editable || groupAlreadyDefined || !noData}
                          id="group"
                          value={group}
                          onChange={(e) => {
                            setGroup(e.target.value);
                          }}
                        >
                          {semesters.map((option, index) => (
                            <option key={index} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* for criteria */}
                  <div className="border-r border-l pl-2 pr-2">
                    <div className="form-group radio-group">
                      <label>Criteria</label>
                      <div>
                        <input
                          type="radio"
                          id="regular-exam"
                          name="examtype"
                          value="Regular Exam"
                          //   checked={examType === "Regular Exam"}
                          //   onChange={(e) => setExamType(e.target.value)}
                          //   disabled={status}
                        ></input>
                        <label htmlFor="regular-exam">All</label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="atkt"
                          name="examtype"
                          value="A.T.K.T"
                          //   checked={examType === "A.T.K.T"}
                          //   onChange={(e) => setExamType(e.target.value)}
                          //   disabled={status}
                        ></input>
                        <label htmlFor="atkt">Seat No</label>
                      </div>
                    </div>
                  </div>
                  {/* for info */}
                  <div>
                    <fieldset>
                      <legend className="text-xl">Colour Indications</legend>
                      <p className="align-middle">
                        <span className="bg-orange-100 h-5 w-5 border"></span>{" "}
                        -NO MARKS ENTRY{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-blue-100 h-5 w-5 border"></span>{" "}
                        -LESS THAN 40% OF PASSING{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-gray-100 h-5 w-5 border"></span>{" "}
                        -ABSENT{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-red-100 h-5 w-5 border"></span>{" "}
                        -FAILED IN THE HEAD{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-white h-5 w-5 border"></span>{" "}
                        -PASSED IN THE HEAD{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-cyan-100 h-5 w-5 border"></span>{" "}
                        -NON THEORY HEADS{" "}
                      </p>
                      <p className="align-middle">
                        <span className="bg-yellow-100 h-5 w-5 border"></span>{" "}
                        -NO HEAD FOR THIS CREDIT{" "}
                      </p>
                    </fieldset>
                  </div>
                  {/* for buttons */}
                  <div className="flex flex-col justify-evenly border-l pl-2">
                    <button className="btn-save" onClick={()=> setIsTableVisible(true)}>Get Data</button>
                    <button className="btn-refresh">Refresh</button>
                    <button className="btn-edit">Update</button>
                    <button className="btn-exit">Report</button>
                  </div>
                </div>
              
              {/* for table */}
             {isTableVisible && ( <div className="h-[22rem] overflow-y-scroll">
                <table>
                  <thead>
                    <tr>
                      <th className="bg-gray-400"></th>
                      <th className="bg-gray-400"></th>
                      <th className="bg-gray-400"></th>
                      <th className="bg-gray-400"></th>
                      <th className="bg-gray-400">
                        NO
                        <br />
                        Of
                        <br />
                        ATKT's
                      </th>
                      <th className="bg-gray-400">Delete</th>
                      <th colspan="2" className="bg-gray-400">Applied Mathematics -III</th>
                      <th colspan="2" className="bg-gray-400">Thermodynamics</th>
                      <th colspan="2" className="bg-gray-400">Strength of Materials</th>
                      <th colspan="2" className="bg-gray-400">Production PRocess I</th>
                      <th colspan="2" className="bg-gray-400">Material Technology</th>
                      <th colspan="2" className="bg-gray-400">Material Technology</th>
                      <th colspan="2" className="bg-gray-400">Material Technology</th>
                      <th colspan="2" className="bg-gray-400">Material Technology</th>
                      <th colspan="2" className="bg-gray-400">Computer Aided Machine Drawing</th>
                    </tr>
                    <tr>
                      <th>Sr. No</th>
                      <th>Seat No</th>
                      <th>Student Name</th>
                      <th></th>
                      <th></th>
                      <th></th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                      <th>H1</th>
                      <th>H2</th>
                    </tr>
                  </thead>
                  <tbody>
                  <tr>
                      <td>1</td>
                      <td>MEC2001</td>
                      <td>Raj Ramesh Pakhurde</td>
                      <td><input type="checkbox"></input></td>
                      <td></td>
                      <td></td>
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
                      <td><input type="checkbox"></input></td>
                      <td></td>
                      <td></td>
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
                      <td><input type="checkbox"></input></td>
                      <td></td>
                      <td></td>
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
                      <td><input type="checkbox"></input></td>
                      <td></td>
                      <td></td>
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
              </div> )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReExamEligibility;
