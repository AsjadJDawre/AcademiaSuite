import React, { useEffect, useState } from 'react';
import '../SubjectMaster.css';

function FormInputs() {
  const years = ['01/June/2011-31/May/2012', '01/June/2012-31/May/2013', '01/June/2013-31/May/2014'];
  const patterns = ['CBGS', 'Old Pattern'];
  const semesters = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4','Semester 5','Semester 6','Semester 7','Semester 8'];
  const subjects = ['Applied Mathematics-I', 'Applied Physics-1', 'Applied Chemistry-1', 'Engineering Drawing'];
  const branches = ['COMPUTER ENGINEERING', 'CIVIL ENGINEERING', 'MECHANICAL ENGINEERING'];
  const [year, setYear] = useState();
  const [pattern, setPattern] = useState();
  const [semester, setSemester] = useState();
  const [subject, setSubject] = useState();
  const [branch, setBranch] = useState();
  const [course_credit, setcourse_credit] = useState();
  

  const handleSave = () => {
    const formData = {
      year,
      pattern,
      semester,
      subject,
      branch,
      course_credit, 
    };
    window.api.invoke('save-data', formData)
      .then(response => {
        console.log('Data saved successfully:', response);
      })
      .catch(error => {
        console.error('Error saving data:', error);
      });
  };
  return (
    <div className="form-container p-4">
      <h1 className="font-bold text-xl mb-4">Subject Master</h1>
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
        <div className="form-group">
          <label htmlFor="year" className="block mb-1">Year:</label>
          <select id="year" value={year} onChange={(e) => setYear(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option selected disabled >Year</option>

            {years.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="pattern" className="block mb-1">Pattern:</label>
          <select id="pattern" value={pattern} onChange={(e) => setPattern(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
            <option selected disabled >Select A Pattern</option>
            {patterns.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="semester" className="block mb-1">Semester:</label>
          <select id="semester" value={semester} onChange={(e) => setSemester(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option selected disabled >Select A Semester</option>

            {semesters.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="subject" className="block mb-1">Subject:</label>
          <select id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option selected disabled >Select A Subject</option>

            {subjects.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="branch" className="block mb-1">Branch:</label>
          <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)} className="w-full p-2 border border-gray-300 rounded">
          <option selected disabled >Select A Branch</option>

            {branches.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="course_credit" className="block mb-1">No. of Course Credit:</label>
          <input
            type="number"
            id="course_credit"
            value={course_credit}
            onChange={(e) => setcourse_credit(e.target.value)}
            min="1"
            max="10"
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        <div className="col-span-full flex gap-4 mt-4">
          <button type="button" className="btn-save px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={handleSave}>ADD</button>
          <button type="button" className="btn-edit px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
          <button type="button" className="btn-refresh px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Refresh</button>
          <button type="button" className="btn-exit px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Exit</button>
        </div>
      </form>
    </div>
  );
}

export default FormInputs;
