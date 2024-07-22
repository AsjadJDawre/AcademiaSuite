import React, { useState } from 'react';
import '../SubjectMaster.css';

const SubjectMaster = () => {
  // Define state for the form
  const [year, setYear] = useState('01/June 2011-31/May/2012');
  const [pattern, setPattern] = useState('CBGS');
  const [semester, setSemester] = useState('Semester 1');
  const [subject, setSubject] = useState('Applied Mathematics-I');
  const [branch, setBranch] = useState('MECHANICAL ENGINEERING');
  const [courseCredit, setCourseCredit] = useState('3');
  const [showGrid, setShowGrid] = useState(false);

  // Options for dropdowns
  const years = ['01/June 2011-31/May/2012', '01/June 2012-31/May/2013', '01/June 2013-31/May/2014'];
  const patterns = ['CBGS', 'Old Pattern'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  const subjects = ['Applied Mathematics-I', 'Physics', 'Chemistry', 'Engineering Drawing'];
  const branches = ['MECHANICAL ENGINEERING', 'CIVIL ENGINEERING', 'ELECTRICAL ENGINEERING'];

  // Handle key press event
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowGrid(true);
    }
  };

  // Event listener to detect Enter key press
  React.useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="form-container">
      <h1>Subject Master</h1>
      <form>
        <div className="form-group">
          <label htmlFor="year">Year:</label>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pattern">Pattern:</label>
          <select id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)}>
            {patterns.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="semester">Semester:</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)}>
            {semesters.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject">Subject:</label>
          <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)}>
            {subjects.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="branch">Branch:</label>
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
          <button type="button" className="btn-save">Save</button>
          <button type="button" className="btn-edit">Edit</button>
          <button type="button" className="btn-refresh">Refresh</button>
          <button type="button" className="btn-exit">Exit</button>
        </div>
      </form>

      {showGrid && (
        <div className="grid-view">
          <h2>Marks and Passing Criteria</h2>
          <table>
            <thead>
              <tr>
                <th>Assessment</th>
                <th>Out Of Marks</th>
                <th>Passing Marks</th>
                <th>Resolution</th>
                <th>Overall Passing Criteria</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESE</td>
                <td>80</td>
                <td>32</td>
                <td>40%</td>
                <td>H1</td>
                <td>4</td>
              </tr>
              <tr>
                <td>IA</td>
                <td>20</td>
                <td>0</td>
                <td>0%</td>
                <td>H2</td>
                <td>1</td>
              </tr>
              <tr>
                <td>TW</td>
                <td>10</td>
                <td>0</td>
                <td>0%</td>
                <td>H2</td>
                <td>1</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SubjectMaster;
