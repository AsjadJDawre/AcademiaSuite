import React, { useState, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import AddBoxTwoToneIcon from '@mui/icons-material/AddBoxTwoTone';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

const FormInput = ({handleData,setShowGrid,handleEdit,setEditPopUp}) => {
  const [data, setData] = useState([]);
  const [showCard, setShowCard] = useState(false);
  const [subject, setSubject] = useState({ subject: '', subjectCode: '' });
  const [message, setMessage] = useState('');
  const [refreshData, setRefreshData] = useState(false);

  const [year, setYear] = useState('');
  const [pattern, setPattern] = useState('');
  const [semester, setSemester] = useState('');
  const [branch, setBranch] = useState('');
  const [subjectName, setSubjectName] = useState('');
  const [course_credit, setcourse_credit] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await window.api.invoke('fetch-data');
      setData(fetchedData);
    };

    loadData();
  }, [refreshData]);

 

const handleKeyPress=(e)=>{
  if (!year || !branch || !semester || !subjectName || !pattern || !course_credit) {
    toast.error('Please fill in all required fields!', {
      position: 'top-right',
      autoClose: 2500,
      theme: 'colored',
      newestOnTop: true,
    });
    return; 
  }
  
    const data={
      year,
      branch,
      semester,
      subjectName,
      pattern,
      course_credit
      
    }
     handleData(data)
     setShowGrid(true)

}

const handleEdit1=()=>{
  if (!year || !branch || !semester || !subjectName || !pattern || !course_credit) {
    toast.error('Please fill in all required fields!', {
      position: 'top-right',
      autoClose: 2500,
      theme: 'colored',
      newestOnTop: true,
    });
    return; 
  }
  
    const data={
      year,
      branch,
      semester,
      subjectName,
      pattern,
      course_credit
      
    }
     handleEdit(data)
     setEditPopUp(true)

}


  const handleSave = async () => {
    if (!subject.subject.trim() || !subject.subjectCode.trim()) {
      toast.error('Please fill in all required fields!', {
        position: 'top-right',
        autoClose: 2500,
        theme: 'colored',
        newestOnTop: true,
      });
      return;
    }

    const formData = { ...subject };

    try {
      const response = await window.api.invoke('save-data', formData);
      if (response && response.success) {
        toast.success('Subject added successfully!', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
        setShowCard(false);
        setRefreshData(prev => !prev); // Toggle refreshData to trigger data reload
      } else {
        setMessage(`Error: ${response ? response.error : 'Unknown error'}`);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await window.api.invoke('delete-subject', subjectName);
      if (response.success) {
        toast.success(`Subject "${subjectName}" deleted successfully!`);
      } else {
        toast.error(`Failed to delete subject: ${response.error}`);
      }
    } catch (error) {
      toast.error(`Error: ${error.message}`);
    }
  };
  

  const handleRefresh = () => {
    setYear('');
    setPattern('');
    setSemester('');
    setBranch('');
    setSubjectName('');
    setRefreshData(prev => !prev); 
  };

  // Filter out empty or null values from the options arrays
  const filterOptions = (options) => options.filter(option => option != null && option.trim() !== '');

  const years = filterOptions([...new Set(data.map(value => value.year))]);
  const patterns = filterOptions([...new Set(data.map(value => value.pattern))]);
  const semesters = filterOptions([...new Set(data.map(value => value.semester))]);
  const subjects = filterOptions([...new Set(data.map(value => value.subject_name))]);
  const branches = filterOptions([...new Set(data.map(value => value.branch))]);

  return (
    <div className="form-container p-6">
      <h1 className="text-2xl font-bold mb-4">Subject Master</h1>
      <form >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { id: 'year', label: 'Year:', options: years, value: year, setValue: setYear },
            { id: 'pattern', label: 'Pattern:', options: patterns, value: pattern, setValue: setPattern },
            { id: 'semester', label: 'Semester:', options: semesters, value: semester, setValue: setSemester },
            { id: 'subject', label: 'Subject:', options: subjects, value: subjectName, setValue: setSubjectName },
            { id: 'branch', label: 'Branch:', options: branches, value: branch, setValue: setBranch },
          ].map(({ id, label, options, value, setValue }) => (
            <div key={id} className="form-group flex flex-col">
              <label htmlFor={id}>{label}</label>
              <select id={id} className="p-2 border rounded" value={value} onChange={e => setValue(e.target.value)}>
                <option value="" disabled>Select {label.toLowerCase()}</option>
                {options.map((option, index) => (
                  <option key={index} value={option}>{option}</option>
                ))}
              </select>
            </div>
          ))}
          <div className="form-group flex flex-col">
            <label htmlFor="courseCredit">No. of Course Credit:</label>
            <div className="flex items-center">
              <input
                type="number"
                id="courseCredit"
                className="p-2 border rounded mr-2"
                min="1"
                max="10"
                value={course_credit}
                onChange={(e)=>setcourse_credit(e.target.value)}
              />
              <AddBoxTwoToneIcon onClick={() => setShowCard(true)} className="cursor-pointer" />
              <DeleteForeverRoundedIcon onClick={handleDelete} />
            </div>
          </div>
        </div>

        <ToastContainer position="top-right" autoClose={2500} newestOnTop pauseOnHover={false} />

        <div className="form-buttons flex justify-end mt-4 space-x-2">
          {/* <button type="button" className="btn-save bg-blue-500 text-white p-2 rounded" onClick={handleSave}>Save</button> */}
          <button type="button" className="btn-edit bg-yellow-500 text-white p-2 rounded"  onClick={(e)=>handleKeyPress(e)}>Add Credits </button>
          <button type="button" className="btn-refresh bg-green-500 text-white p-2 rounded" onClick={handleRefresh}>Refresh</button>
          <button type="button" className="btn-exit bg-red-500 text-white p-2 rounded" onClick={(e)=>handleEdit1(e)}>Edit</button>
        </div>
      </form>

      {message && <p>{message}</p>}
      {showCard && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add New Subject</h2>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectName">Subject Name</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subjectName"
                  type="text"
                  placeholder="Enter subject name"
                  value={subject.subject}
                  onChange={(e) => setSubject(prev => ({ ...prev, subject: e.target.value }))}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subjectCode">Subject Code</label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="subjectCode"
                  type="text"
                  placeholder="Enter subject code"
                  value={subject.subjectCode}
                  onChange={(e) => setSubject(prev => ({ ...prev, subjectCode: e.target.value }))}
                  required
                />
              </div>
              <div className="flex justify-between">
                <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleSave}>Save</button>
                <button type="button" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Edit</button>
                <button type="button" className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setShowCard(false)}>Close</button>
              </div>
            </form>
          </div>
        </div>
      )}

   
    </div>
  ); 
};

export default FormInput;
