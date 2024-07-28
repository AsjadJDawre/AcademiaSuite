import React, { useState, useEffect } from 'react';
import '../../assets/styles/form.css';
import '../../assets/styles/subjectmaster.css';

const SubjectMaster = () => {
  const [year, setYear] = useState('');
  const [pattern, setPattern] = useState('');
  const [semester, setSemester] = useState('');
  const [subject, setSubject] = useState('');
  const [branch, setBranch] = useState('');
  const [courseCredit, setCourseCredit] = useState('0');
  
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  
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
  
  const [h1Credit, setH1Credit] = useState(0);
  const [h2Credit, setH2Credit] = useState(0);
  const [opc, setOpc] = useState(0);



  const years = ['Select year','01/June 2011-31/May/2012', '01/June 2012-31/May/2013', '01/June 2013-31/May/2014'];
  const patterns = ['Select pattern','CBGS', 'Old Pattern'];
  const semesters = ['Select semester','Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  const subjects = ['Select subject','Applied Mathematics-I', 'Physics', 'Chemistry', 'Engineering Drawing'];
  const branches = ['Select branch','MECHANICAL ENGINEERING', 'CIVIL ENGINEERING', 'ELECTRICAL ENGINEERING'];

  const [addCreditDivVisible, setAddCreditDivVisible] = useState(false);

  const handleAddCredit = () => {
    setAddCreditDivVisible(true);
  }
  const handleExitBtn = () => {
    setAddCreditDivVisible(false);
  }

  const handleRefreshBtn = (e) => {
    var id = e.target.id;
    if (id === "btn-ref-sub-mas") {
      setYear('');
      setPattern('');
      setSemester('');
      setSubject('');
      setBranch('');
      setCourseCredit('0');
      return;
    } else if (id === "btn-ref-add-sub") {
      setSubjectName('');
      setSubjectCode('');
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
      return;
    }
  }
  
  const addCreditStyle = {
    display: 'inline',
  }
  const disableAddCreditStyle = {
    display: 'none',
  }

  return (
    <div className="subject-master-container">
      <div className='first-div'>
        <div className="form-container form-sub-mas">
          <h1 className='form-title'>Subject Master</h1>
          <form className='form-main'>
            <div className="form-group">
              <label htmlFor="year">Year</label>
              <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
                {years.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="pattern">Pattern</label>
              <select id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)}>
                {patterns.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="semester">Semester</label>
              <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
                {semesters.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
                {subjects.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="branch">Branch</label>
              <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                {branches.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>

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

            <div className="form-buttons">
              <button type="button" className="btn-save" onClick={handleAddCredit}>Add credit</button>
              <button type="button" className="btn-edit">Edit</button>
              <button type="button" className="btn-refresh" id='btn-ref-sub-mas' onClick={handleRefreshBtn}>Refresh</button>
              <button type="button" className="btn-exit">Delete</button>
            </div>
          </form>
        </div>
      </div>

      <div className='sec-div'>
      <div className="form-container form-add-sub">
          <h1 className='form-title'>Add Subject</h1>
          <form className='form-main form-as'>
            <div className='sub-div'>
              <div className='first-sub-div'>
                <div className="form-group ">
                  <label htmlFor="subjectName">Subject name</label>
                  <input
                    type="text"
                    id="subjectName"
                    placeholder='Enter Subject Name'
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="subjectCode">subject code</label>
                  <input
                    type="text"
                    id="subjectCode"
                    placeholder='Enter Subject Code'
                    value={subjectCode}
                    onChange={(e) => setSubjectCode(e.target.value)}
                  />
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-refresh" id='btn-ref-add-sub' onClick={handleRefreshBtn}>Refresh</button>
                <button type="button" className="btn-save">Save</button>
              </div>
            </div>
          </form>
      </div>

      <div className="form-container form-add-credit" style={addCreditDivVisible ? addCreditStyle : disableAddCreditStyle}>
          <h1 className='form-title'>Add Credits</h1>
          <form className='form-main'>

            <div className='credit-row'>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={esePm}
                  onChange={(e) => setEsePm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={eseRes}
                  onChange={(e) => setEseRes(e.target.value)}
                />
              </div>
            </div>
            <div className='credit-row'>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={iaPm}
                  onChange={(e) => setIaPm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={iaRes}
                  onChange={(e) => setIaRes(e.target.value)}
                />
              </div>
            </div>
            <div className='credit-row'>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={twPm}
                  onChange={(e) => setTwPm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={twRes}
                  onChange={(e) => setTwRes(e.target.value)}
                />
              </div>
            </div>
            <div className='credit-row'>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={prPm}
                  onChange={(e) => setPrPm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={prRes}
                  onChange={(e) => setPrRes(e.target.value)}
                />
              </div>
            </div>
            <div className='credit-row'>
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
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">passing marks</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={orPm}
                  onChange={(e) => setOrPm(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">resolution</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={orRes}
                  onChange={(e) => setOrRes(e.target.value)}
                />
              </div>
            </div>
            <div className='credit-row last-row'>
              <div className="form-group">
                <label htmlFor="subjectName">h1 credits</label>
                <input
                  type="number"
                  id="subjectName"
                  value={h1Credit}
                  onChange={(e) => setH1Credit(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">h2 credits</label>
                <input
                  type="number"
                  id="subjectCode"
                  value={h2Credit}
                  onChange={(e) => setH2Credit(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="subjectCode">Overall passing criteria</label>
                  <input
                    type="number"
                    id="subjectCode"
                    value={opc}
                    onChange={(e) => setOpc(e.target.value)}
                  />
              </div>
            </div>

            <div className="form-buttons">
              <button type="button" className="btn-save">Save</button>
              <button type="button" className="btn-refresh" id='btn-ref-add-credit' onClick={handleRefreshBtn}>Refresh</button>
              <button type="button" className="btn-exit" onClick={handleExitBtn}>Exit</button>
            </div>
          </form>
      </div>
      </div>
    </div>
  );
};

export default SubjectMaster;
