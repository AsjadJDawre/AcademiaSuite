import React, { useState, useEffect } from "react";
import "../../assets/styles/form.css";
import "../../assets/styles/subjectmaster.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import Select from "react-select";

const SubjectMaster = () => {
  const [year, setYear] = useState({});
  const [pattern, setPattern] = useState({});
  const [semester, setSemester] = useState({});
  const [subject, setSubject] = useState({});
  const [branch, setBranch] = useState({});
  const [courseCredit, setCourseCredit] = useState("0");
  const [data, setData] = useState({});
  const [editBtn, seteditBtn] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [newSubjectAdded, setNewSubjectAdded] = useState(false);
  const [disable, setDisable] = useState(false);

  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");

  const [eseOom, setEseOom] = useState(0);
  const [esePm, setEsePm] = useState(0);
  const [eseRes, setEseRes] = useState(0);
  const [iaOom, setIaOom] = useState(0);
  const [iaPm, setIaPm] = useState(0);
  const [iaRes, setIaRes] = useState(0);
  const [twOom, setTwOom] = useState(0);
  const [twPm, setTwPm] = useState(0);
  const [twRes, setTwRes] = useState(0);
  const [prOom, setPrOom] = useState(0);
  const [prPm, setPrPm] = useState(0);
  const [prRes, setPrRes] = useState(0);
  const [orOom, setOrOom] = useState(0);
  const [orPm, setOrPm] = useState(0);
  const [orRes, setOrRes] = useState(0);

  const [singleSub, setSingleSub] = useState(null);

  const [isPreviousYearChecked, setIsPreviousYearChecked] = useState(false);
  const [fromYear, setFromYear] = useState("");
  const [toYear, setToYear] = useState("");

  const [newSubjects, setNewSubjects] = useState([]);

  const handleCheckboxChange = (event) => {
    setIsPreviousYearChecked(event.target.checked);
    if (!event.target.checked) {
      setFromYear("");
      setToYear("");
    }
  };

  const handleFromYearChange = (event) => {
    setFromYear(event.target.value);
  };

  const handleToYearChange = (event) => {
    setToYear(event.target.value);
  };

  const [h1Credit, setH1Credit] = useState(0);
  const [h2Credit, setH2Credit] = useState(0);
  const [opc, setOpc] = useState(0);

  const years = [
    { value: "", label: "Select Year", isDisabled: true },

    { value: "01/June 2011-31/May/2012", label: "01/June 2011-31/May/2012" },
    { value: "01/June 2012-31/May/2013", label: "01/June 2012-31/May/2013" },
    { value: "01/June 2013-31/May/2014", label: "01/June 2013-31/May/2014" },
  ];

  const patterns = [
    { value: "", label: "Select pattern", isDisabled: true },
    { value: "CBGS", label: "CBGS" },
    { value: "Old Pattern", label: "Old Pattern" },
  ];

  const semesters = [
    { value: "", label: "Select a Semester", isDisabled: true },

    { value: "Semester 1", label: "Semester 1" },
    { value: "Semester 2", label: "Semester 2" },
    { value: "Semester 3", label: "Semester 3" },
    { value: "Semester 4", label: "Semester 4" },
    { value: "Semester 5", label: "Semester 5" },
    { value: "Semester 6", label: "Semester 6" },
    { value: "Semester 7", label: "Semester 7" },
    { value: "Semester 8", label: "Semester 8" },
  ];

  const branches = [
    { value: "", label: "Select a Branch", isDisabled: true },
    { value: "MECHANICAL ENGINEERING", label: "MECHANICAL ENGINEERING" },
    { value: "COMPUTER ENGINEERING", label: "COMPUTER ENGINEERING" },
    { value: "CIVIL ENGINEERING", label: "CIVIL ENGINEERING" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.api.invoke("fetch-data");
        const filteredSubjects = response.filter(
          (item) =>
            item.subject_name !== null && item.subject_name.trim() !== ""
        );

        // Use a Set to filter out duplicate subject names
        const uniqueSubjectNames = Array.from(
          new Set(filteredSubjects.map((item) => item.subject_name))
        );

        const formattedSubjects = uniqueSubjectNames.map((subject) => ({
          value: subject,
          label: subject,
        }));

        setSubjects([
          { value: "", label: "Select subject", isDisabled: true },
          ...formattedSubjects,
        ]);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    fetchData();
  }, [newSubjectAdded]);

  useEffect(() => {
    setSubjects([{ value: "", label: "Select subject" }, ...newSubjects]);
  }, [newSubjects]);

  useEffect(() => {
    if (Object.keys(data).length > 0) {
      console.log("Data state updated:", data);

      // Update the form fields based on data
      setEseOom(data.ese_oom || 0);
      setEsePm(data.ese_pm || 0);
      setEseRes(data.ese_res || 0);
      setIaOom(data.ia_oom || 0);
      setIaPm(data.ia_pm || 0);
      setIaRes(data.ia_res || 0);
      setTwOom(data.tw_oom || 0);
      setTwPm(data.tw_pm || 0);
      setTwRes(data.tw_res || 0);
      setPrOom(data.pr_oom || 0);
      setPrPm(data.pr_pm || 0);
      setPrRes(data.pr_res || 0);
      setOrOom(data.or_oom || 0);
      setOrPm(data.or_pm || 0);
      setOrRes(data.or_res || 0);
      setH1Credit(data.h1_credit || 0);
      setH2Credit(data.h2_credit || 0);
      setOpc(data.opc || 0);
      setCourseCredit(data.course_credits || "0");
    }
  }, [data]);

  const resetCreditFields = () => {
    setEseOom(0);
    setEsePm(0);
    setEseRes(0);
    setIaOom(0);
    setIaPm(0);
    setIaRes(0);
    setTwOom(0);
    setTwPm(0);
    setTwRes(0);
    setPrOom(0);
    setPrPm(0);
    setPrRes(0);
    setOrOom(0);
    setOrPm(0);
    setOrRes(0);
    setH1Credit(0);
    setH2Credit(0);
    setOpc(0);
  };
  const resetInputs = () => {
    setYear("");
    setPattern("");
    setSemester("");
    setSubject("");
    setBranch("");
    setCourseCredit("0");
  };

  useEffect(() => {
    const e = {
      target: {
        value: "btn-ref-sub-mas",
      },
    };

    handleRefreshBtn(e);
  }, []);

  const [addCreditDivVisible, setAddCreditDivVisible] = useState(false);

  const validataInput = () => {
    if (
      year.value === "" ||
      pattern.value === "" ||
      subject.value === "" ||
      branch === "" ||
      courseCredit === "0"
    )
      return false;
    return true;
  };

  const creditsExits = async () => {
    try {
      const response = await window.api.invoke("fetch-data");
      if (!response || !Array.isArray(response)) {
        console.error("Invalid response data");
        return false;
      }

      const columnsToCheck = [
        "ese_oom",
        "ese_pm",
        "ese_res",
        "ia_oom",
        "ia_pm",
        "ia_res",
        "tw_com",
        "tw_pm",
        "tw_res",
        "pr_oom",
        "pr_pm",
        "pr_res",
        "or_oom",
        "or_pm",
        "or_res",
      ];

      const subjectEntry = response.find(
        (item) =>
          item.subject_name === subject.value && item.year === year.value
      );

      if (!subjectEntry) {
        console.error("Subject not found");
        return false;
      }

      console.log("Subject entry found:", subjectEntry);
      setData(subjectEntry);
      for (const column of columnsToCheck) {
        const value = subjectEntry[column];
        if (value !== null && value !== undefined && value > 0) {
          console.log(`Column '${column}' has value greater than 0: ${value}`);
          return true; // Return true if any column has a value greater than 0
        }
      }

      return false;
    } catch (error) {
      console.error("Error fetching data or processing:", error);
      return false;
    }
  };

  const handleSavePreYearSubject = async () => {
    if (
      fromYear === "" ||
      toYear === "" ||
      pattern === "" ||
      semester === "" ||
      subject === "" ||
      branch === ""
    ) {
      return toast.error("required all fields!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }
    const data = {
      fromYear: fromYear?.value,
      toYear: toYear?.value,
      pattern: pattern?.value,
      semester: semester?.value,
      subject: subject?.value,
      branch: branch?.value,
    };
    // fetch data
    try {
      const response = await window.api.invoke("save-pre-year-sub", data);
      console.log(response);

      if (response) {
        setFromYear("")
        setToYear("");
        setBranch("");
        setPattern("");
        setSemester("");
        setSubject("");
        return toast.success("Subject Added Successfully!", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          newestOnTop: true,
          pauseOnHover: false,
        });
      } else {
        return toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 2500,
          theme: "colored",
          newestOnTop: true,
          pauseOnHover: false,
        });
      }

     
    } catch (error) {
      console.log(error);
    }
  

    // save data
    // handleCreditSave()
  };
   

  const handleAddCredit = async () => {
    if (!validataInput()) {
      return toast.error("Please Select all the required fields!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }

    // Await the result of creditsExits
    const creditsExist = await creditsExits();

    if (!creditsExist) {
      seteditBtn(false);
      setDisable(true);
      setAddCreditDivVisible(true);
      resetCreditFields();
    } else {
      toast.info("Credits Already exist. Use Edit!", {
        autoClose: 2000,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
      setDisable(false);
    }
  };

  const handleExitBtn = () => {
    setYear("");
    setFromYear("");
    setToYear("");
    setPattern("");
    setSemester("");
    setSubject("");
    setBranch("");
    setCourseCredit("0");
    setAddCreditDivVisible(false);
    setDisable(false);

    resetCreditFields();
    // console.log("data before Reset :",data)

    setData({});
    // console.log("data After Reset :",data)
  };

  const handleRefreshBtn = (e) => {
    var id = e.target.id;
    if (id === "btn-ref-sub-mas") {
      setYear("");
      setFromYear("");
      setToYear("");
      setPattern("");
      setSemester("");
      setSubject("");
      setBranch("");
      setCourseCredit("0");
      setDisable(false);
      setAddCreditDivVisible(false);

      return;
    } else if (id === "btn-ref-add-sub") {
      setSubjectName("");
      setSubjectCode("");

      return;
    } else {
      setEseOom(0);
      setEsePm(0);
      setEseRes(0);
      setIaOom(0);
      setIaPm(0);
      setIaRes(0);
      setTwOom(0);
      setTwPm(0);
      setTwRes(0);
      setPrOom(0);
      setPrPm(0);
      setPrRes(0);
      setOrOom(0);
      setOrPm(0);
      setOrRes(0);
      setH1Credit(0);
      setH2Credit(0);
      setOpc(0);
      setAddCreditDivVisible(false);
      return;
    }
  };

  const addCreditStyle = {
    display: "inline",
  };
  const disableAddCreditStyle = {
    display: "none",
  };
  // console.log(subjects);

  const handleSubjectSave = async () => {
    if (subjectName === "" || subjectCode === "") {
      toast.error("Please fill all the required fields", {
        position: "top-center",
        pauseOnHover: false,
        theme: "colored",
        newestOnTop: true,
        autoClose: 2000,
      });
      return; // Exit the function if the fields are empty
    }

    try {
      const res = await window.api.invoke("check-subject", subjectName);
      if (res === "SF") {
        setSubjectName("");
        setSubjectCode("");
        toast.info(
          "Subject already exists with no credits defined. Please define the credits before adding.",
          {
            position: "top-right",
            autoClose: 2500,
            pauseOnHover: false,
            theme: "colored",
            newestOnTop: true,
          }
        );
      } else if (res === "SNF") {
        const data = {
          subjectName,
          subjectCode,
        };
        const response = await window.api.invoke("subject-save", data);

        if (response.success) {
          toast.success("Subject added successfully!", {
            position: "top-right",
            autoClose: 2500,
            theme: "colored",
            newestOnTop: true,
            pauseOnHover: false,
          });
          setSubjectName("");
          setSubjectCode("");
          setNewSubjectAdded(!newSubjectAdded);
          resetCreditFields();
        } else {
          toast.error("Can't add subject!", {
            position: "top-right",
            autoClose: 2000,
            pauseOnHover: false,
            theme: "colored",
            newestOnTop: true,
          });
        }
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 2000,
        pauseOnHover: false,
        theme: "colored",
        newestOnTop: true,
      });
      console.error("Error in handleSubjectSave:", error);
    }
  };

  const handleCreditSave = async () => {
    const data = {
      eseOom,
      esePm,
      eseRes,
      iaOom,
      iaPm,
      iaRes,
      twOom,
      twPm,
      twRes,
      prOom,
      prPm,
      prRes,
      orOom,
      orPm,
      orRes,
      h1Credit,
      h2Credit,
      opc,
      year: year?.value,
      pattern: pattern?.value,
      semester: semester?.value,
      subject: subject?.value,
      branch: branch?.value,
      courseCredit,
    };

    console.log("Data to be sent:", data);
    const response = await window.api.invoke("save-credits", data);
    if (response) {
      toast.success("Credits Added SuccessFully!", {
        pauseOnHover: false,
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
      });
      resetInputs();
      setDisable(false);
      setAddCreditDivVisible(!addCreditDivVisible);
      const res = creditsExits();
    } else {
      toast.error("Can't Add Credits!", {
        pauseOnHover: false,
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
      });
    }
  };

  const updateCredits = async () => {
    const data = {
      eseOom,
      esePm,
      eseRes,
      iaOom,
      iaPm,
      iaRes,
      twOom,
      twPm,
      twRes,
      prOom,
      prPm,
      prRes,
      orOom,
      orPm,
      orRes,
      h1Credit,
      h2Credit,
      opc,
      year: year?.value,
      pattern: pattern?.value,
      semester: semester?.value,
      subject: subject?.value,
      branch: branch?.value,
      courseCredit,
    };

    console.log("Data to be sent:", data);
    const response = await window.api.invoke("update-credits", data);
    if (response) {
      toast.success("Credits Added SuccessFully!", {
        pauseOnHover: false,
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
      });

      resetInputs();
      setAddCreditDivVisible(!addCreditDivVisible);
      const res = creditsExits(subject, year);
      setDisable(false);

      console.log(disable);
    } else {
      toast.error("Can't Add Credits!", {
        pauseOnHover: false,
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
      });
    }
  };

  const handleEdit = async () => {
    // if (isPreviousYearChecked) {
    //   if (fromYear === "" || toYear === "") {
    //     return toast.error("Please Select all the required fields!", {
    //       position: "top-right",
    //       autoClose: 2500,
    //       theme: "colored",
    //       newestOnTop: true,
    //       pauseOnHover: false,
    //     });
    //   }
    // }
    if (
      year.value === "" ||
      pattern.value === "" ||
      subject.value === "" ||
      branch.value === ""
    ) {
      return toast.error("Please Select all the required fields!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }

    const creditsExist = await creditsExits();
    if (!creditsExist) {
      toast.error("No Credits were Found!", {
        autoClose: 2000,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    } else {
      setAddCreditDivVisible(true);
      seteditBtn(true);
      setDisable(true);
    }
  };

  const handleSubDelete = async () => {
    if (subject === "") {
      return toast.error("Please select a subject!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }

    if (disable) {
      return toast.error("Can't delete subject!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }

    const response = await window.api.invoke("delete-subject", subject);

    if (response.success) {
      if (response.changes === 0) {
        toast.error("Subject credits found! Can't delete subject.", {
          autoClose: 2000,
          theme: "colored",
          newestOnTop: true,
          pauseOnHover: false,
        });
        setSubject("");
      } else {
        toast.success("Subject deleted successfully!", {
          position: "top-right",
          autoClose: 2000,
          theme: "colored",
          newestOnTop: true,
          pauseOnHover: false,
        });
        setNewSubjectAdded(!newSubjectAdded);
        setSubject("");
        setPattern("");
        setBranch("");
        setCourseCredit("0");
        setSemester({});
      }
    } else {
      toast.error("Can't delete subject!", {
        position: "top-right",
        autoClose: 2500,
        theme: "colored",
        newestOnTop: true,
        pauseOnHover: false,
      });
    }
  };

  return (
    <div className="subject-master-container">
      <ToastContainer />

      <div className="first-div">
        <div className="form-container form-sub-mas">
          <h1 className="form-title">Subject Master</h1>
          <form className="form-main">
            <div className="flex gap-4">
              <label>Use as per Previous Year</label>
              <input
                disabled={disable}
                type="checkbox"
                checked={isPreviousYearChecked}
                onChange={handleCheckboxChange}
              />
            </div>
            {/* Conditionally rendered year selects */}
            {isPreviousYearChecked && (
              <>
                <div className="form-group">
                  <label htmlFor="">From Year:</label>
                  <Select
                    id="fromYear"
                    value={fromYear}
                    options={years}
                    isDisabled={disable}
                    maxMenuHeight={100}
                    placeholder="Select a Year"
                    onChange={setFromYear}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="toYear">To Year:</label>
                  {/* {years.map((year, index) => (
                      <option key={index} value={year}>{year}</option>
                    ))} */}
                  <Select
                    id="toYear"
                    value={toYear}
                    options={years}
                    isDisabled={disable}
                    maxMenuHeight={100}
                    placeholder="Select a Year"
                    onChange={setToYear}
                  />
                </div>
              </>
            )}

            <div
              className={`form-group ${isPreviousYearChecked ? "hidden" : ""}`}
            >
              <label htmlFor="year">Year</label>
              {/* <select id="year" value={year} onChange={(e) => setYear(e.target.value)}  disabled={disable}  >
    <option value="">Select Year</option>
    {years.map((option, index) => (
      <option key={index} value={option}>{option}</option>
    ))}
  </select> */}
              <Select
                id="year"
                value={year}
                onChange={setYear}
                options={years}
                isDisabled={disable}
                placeholder="Select Year"
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>

            <div className="form-group">
              <label htmlFor="pattern">Pattern</label>
              <Select
                id="pattern"
                value={pattern}
                onChange={setPattern}
                options={patterns}
                isDisabled={disable}
                placeholder="Select Pattern"
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              {/* <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}disabled={disable}>
                {semesters.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select> */}
              <Select
                options={semesters}
                onChange={setSemester}
                isDisabled={disable}
                maxMenuHeight={100}
                placeholder="Select Semester"
                isOptionDisabled={(option) => option.isDisabled}
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <div className="scrollable-select-wrapper">
                <Select
                  id="subject"
                  value={subject}
                  onChange={setSubject}
                  isDisabled={disable}
                  placeholder="Select subject"
                  options={subjects}
                  maxMenuHeight={100}
                  isOptionDisabled={(option) => option.isDisabled}
                />
                {/* {subjects.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))} */}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <div className="scrollable-select-wrapper">
                <Select
                  id="branch"
                  value={branch}
                  onChange={setBranch}
                  isDisabled={disable}
                  options={branches}
                  placeholder="Select a Branch"
                  maxMenuHeight={100}
                  isOptionDisabled={(option) => option.isDisabled}
                />
                {/* {branches.map((option, index) => (
        <option key={index} value={option}>{option}</option>
      ))} */}
              </div>
            </div>

            {!isPreviousYearChecked && (
              <div className="form-group">
                <label htmlFor="courseCredit">No. of Course Credit:</label>
                <input
                  type="number"
                  id="courseCredit"
                  value={courseCredit}
                  onChange={(e) => setCourseCredit(e.target.value)}
                  min="1"
                  max="10"
                />
              </div>
            )}

            <div className="form-buttons">
              {isPreviousYearChecked && (
                <button
                  type="button"
                  className="btn-save"
                  onClick={handleSavePreYearSubject}
                >
                  save
                </button>
              )}

              {!isPreviousYearChecked && (
                <button
                  type="button"
                  className="btn-save"
                  onClick={handleAddCredit}
                >
                  Add credit
                </button>
              )}

              {!isPreviousYearChecked && (
                <button type="button" className="btn-edit" onClick={handleEdit}>
                  Edit
                </button>
              )}

              <button
                type="button"
                className="btn-refresh"
                id="btn-ref-sub-mas"
                onClick={handleRefreshBtn}
              >
                Refresh
              </button>
              <button
                type="button"
                className="btn-exit"
                onClick={handleSubDelete}
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className="sec-div">
        <div className="form-container form-add-sub">
          <h1 className="form-title">Add Subject</h1>
          <form className="form-main form-as">
            <div className="sub-div">
              <div className="first-sub-div">
                <div className="form-group ">
                  <label htmlFor="subjectName">Subject name</label>
                  <input
                    type="text"
                    id="subjectName"
                    placeholder="Enter Subject Name"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectCode">subject code</label>
                  <input
                    type="text"
                    id="subjectCode"
                    placeholder="Enter Subject Code"
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button
                  type="button"
                  className="btn-refresh"
                  id="btn-ref-add-sub"
                  onClick={handleRefreshBtn}
                >
                  Refresh
                </button>
                <button
                  type="button"
                  className="btn-save"
                  onClick={handleSubjectSave}
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>

        <div
          className="form-container form-add-credit"
          style={addCreditDivVisible ? addCreditStyle : disableAddCreditStyle}
        >
          <h1 className="form-title">Add Credits</h1>
          <form className="form-main">
            <div className="credit-row">
              <div>
                <h3>ESE</h3>
              </div>
              <div className="form-group">
                <label htmlFor="subjectName">out of marks</label>
                <input
                  type="number"
                  id="subjectName"
                  value={eseOom}
                  onChange={(e) => setEseOom(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={esePm}
                  onChange={(e) => setEsePm(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={eseRes}
                  onChange={(e) => setEseRes(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="credit-row">
              <div>
                <h3>IA</h3>
              </div>
              <div className="form-group">
                <label htmlFor="subjectName">out of marks</label>
                <input
                  type="number"
                  id="subjectName"
                  value={iaOom}
                  onChange={(e) => setIaOom(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={iaPm}
                  onChange={(e) => setIaPm(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={iaRes}
                  onChange={(e) => setIaRes(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="credit-row">
              <div>
                <h3>TW</h3>
              </div>
              <div className="form-group">
                <label htmlFor="subjectName">out of marks</label>
                <input
                  type="number"
                  id="subjectName"
                  value={twOom}
                  onChange={(e) => setTwOom(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={twPm}
                  onChange={(e) => setTwPm(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={twRes}
                  onChange={(e) => setTwRes(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="credit-row">
              <div>
                <h3>PR</h3>
              </div>
              <div className="form-group">
                <label htmlFor="subjectName">out of marks</label>
                <input
                  type="number"
                  id="subjectName"
                  value={prOom}
                  onChange={(e) => setPrOom(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={prPm}
                  onChange={(e) => setPrPm(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={prRes}
                  onChange={(e) => setPrRes(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="credit-row">
              <div>
                <h3>OR</h3>
              </div>
              <div className="form-group">
                <label htmlFor="subjectName">out of marks</label>
                <input
                  type="number"
                  id="subjectName"
                  value={orOom}
                  onChange={(e) => setOrOom(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={orPm}
                  onChange={(e) => setOrPm(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={orRes}
                  onChange={(e) => setOrRes(e.target.value)}
                  min="0"
                />
              </div>
            </div>
            <div className="credit-row last-row">
              <div className="form-group">
                <label htmlFor="subjectName">h1 credits</label>
                <input
                  type="number"
                  id="subjectName"
                  value={h1Credit}
                  onChange={(e) => setH1Credit(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">h2 credits</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={h2Credit}
                  onChange={(e) => setH2Credit(e.target.value)}
                  min="0"
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">Overall passing criteria</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={opc}
                  onChange={(e) => setOpc(e.target.value)}
                  min="0"
                />
              </div>
            </div>

            <div className="form-buttons">
              {editBtn ? (
                <button
                  type="button"
                  className="btn-save"
                  onClick={updateCredits}
                >
                  {" "}
                  Update{" "}
                </button>
              ) : (
                <button
                  type="button"
                  className="btn-save"
                  onClick={handleCreditSave}
                >
                  {" "}
                  Save{" "}
                </button>
              )}
              {/* <button type="button" className="btn-refresh" id='btn-ref-add-credit' onClick={handleRefreshBtn}>Refresh</button> */}
              <button
                type="button"
                className="btn-exit"
                onClick={handleExitBtn}
              >
                Exit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SubjectMaster;
