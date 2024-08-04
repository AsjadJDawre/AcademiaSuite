import React, { useState, useEffect } from 'react';
import '../../assets/styles/form.css';
import '../../assets/styles/examcode.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Modal, Button } from 'antd';

const ExamCode = () => {
  const [year, setYear] = useState('');
  const [branch, setBranch] = useState('');
  const [pattern, setPattern] = useState('');
  const [semester, setSemester] = useState('');
  const [examtypeValue, setExamTypeValue] = useState('');
  const [h1Res, setH1Res] = useState('');
  const [h2Res, setH2Res] = useState('');

  const [subjects, setSubjects] = useState(['Select subject']);
  const [exams, setExams] = useState(['Select exam']);
  const [subject, setSubject] = useState('');
  const [exam, setExam] = useState([]);

  const [examType, setExamType] = useState('');

  const [heldInYear, setHeldYear] = useState('');
  const [heldInMonth, setHeldMonth] = useState('');
  const [editHeldInYear, setEditHeldYear] = useState('');
  const [editHeldInMonth, setEditHeldMonth] = useState('');
  const [editExamId, setEditExamId] = useState('');
  const [deleteExamId, setDeleteExamId] = useState('');

  const [examDefineDiv, setExamDefineDiv] = useState(true);
  const [status, setStatus] = useState(false);
  const [addResDiv, setAddResDiv] = useState(false);
  const [resMarks, setResMarks] = useState(false);

  const years = ['Select year', '01/June 2011-31/May/2012', '01/June 2012-31/May/2013', '01/June 2013-31/May/2014'];
  const patterns = ['Select pattern', 'CBGS', 'Old Pattern'];
  const semesters = ['Select semester', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
  const branches = ['Select branch', 'MECHANICAL ENGINEERING', 'COMPUTER ENGINEERING', 'CIVIL ENGINEERING'];
  const heldYear = ['Select year','2021','2022','2023','2024','2025','2026','2027','2028','2029','2030'];
  const heldMonth = ['Select month','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October','November', 'December'];

  const [isEditModelVisible, setisEditModelVisible] = useState(false);
  const [isDeleteModelVisible, setisDeleteModelVisible] = useState(false);

  const [updateIsCurrentExamId, setUpdateIsCurrentExamId] = useState('');
  const [updateIsCurrentValue , setUpdateIsCurrentValue] = useState('');
  
  const [updateIsLockExamId, setUpdateIsLockExamId] = useState('');
  const [updateIsLockValue , setUpdateIsLockValue] = useState('');

  const [editableRes, setEditableRes] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await window.api.invoke('fetch-data');
      const filteredSubjects = response.filter(item => item.subject_name !== null && item.subject_name.trim() !== '');
      
      // Use a Set to filter out duplicate subject names
      const uniqueSubjectNames = Array.from(new Set(filteredSubjects.map(item => item.subject_name)));
      
      setSubjects(['Select subject', ...uniqueSubjectNames]);
    };
  
    fetchData();
  }, []);
 
useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.api.invoke('fetch-exam-code');
        
        // Create a list of concatenated strings from the year, month, and type fields
        const examCodeStrings = response.map(item => {
          return `${item.branch.slice(0,4)}. ${item.heldin_month}-${item.heldin_year}-${item.type.split(' ')[0]}`;
        });

        setExams(['Select exam', ...examCodeStrings]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const  showEditModel = () => {
    setisEditModelVisible(true);

  };
  const  showDeleteModel = (e) => {
    setDeleteExamId(e.target.id);
    setisDeleteModelVisible(true);

  };

  const handleCancel = () => {
    setisEditModelVisible(false);
    setisDeleteModelVisible(false);
  };
  
  const handleRefreshBtn = async () => {
    setYear('');
    setBranch('');
    setHeldYear('');
    setHeldMonth('');
  }
  const handleExamwiseRefreshBtn = async () => {
    setPattern('');
    setSemester('');
    setSubject('');
    setExamTypeValue('');
    setH1Res('');
    setH2Res('');
  }
  const handleAddRes = async () => {
    setStatus(false)
    setExamDefineDiv(false);
    setAddResDiv(true);
  }
 const handleUpdateIsCurrent = async (e) => {
    const isCurrentValue = e.target.checked ? 1 : 0;
    const exam_id = e.target.id;
    setUpdateIsCurrentValue(isCurrentValue);
    setUpdateIsCurrentExamId(exam_id);
 }
 const handleUpdateIsLock = async (e) => {
    const isLockValue = e.target.checked ? 1 : 0;
    const exam_id = e.target.id;
    setUpdateIsLockValue(isLockValue);
    setUpdateIsLockExamId(exam_id);
 }

useEffect(() => {
    
    if (updateIsCurrentExamId === '' || updateIsCurrentValue === '') {
        return;
    }
    setTimeout( async () => {
        const data = {
             exam_id: updateIsCurrentExamId,
             is_current: updateIsCurrentValue
          }
          try {
            const response = await window.api.invoke('update-is-current', data);
             
            if (response === true) {
                handleStatus()
            }  
          } catch(error) {
           console.error("Error:", error.message);
          }
          setUpdateIsCurrentExamId('')
          setUpdateIsCurrentValue('')
    }, 200);

  }, [updateIsCurrentValue])

  useEffect(() => {
    
    if (updateIsLockExamId === '' || updateIsLockValue === '') {
        return;
    }
    setTimeout( async () => {
        const data = {
             exam_id: updateIsLockExamId,
             is_lock: updateIsLockValue
          }
          try {
            const response = await window.api.invoke('update-is-lock', data);
             
            if (response === true) {
                handleStatus()
            }  
          } catch(error) {
           console.error("Error:", error.message);
          }
          setUpdateIsLockExamId('')
          setUpdateIsLockValue('')
    }, 200);

  }, [updateIsLockValue])

  // insert data
  const handleSave = async () => {
    if(year===''|| heldInYear ===''|| heldInMonth ===''|| branch==='' || examType === '' 
        || year==='Select year'|| heldInYear ==='Select year'|| heldInMonth ==='Select month'|| branch==='Select branch' ) {
            toast.info('Fill all required input fields',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              })
        return    
    } else {
        const data = {
            year: year,
            branch: branch,
            heldin_year: heldInYear,
            heldin_month: heldInMonth,
            type: examType
          }
          try {
            const response = await window.api.invoke('insert-in-exam-code', data);
             
            if (response === 'not found') {
              toast.success('Exam created Successfully',{
               position:'top-right',
               autoClose: 2500,
               theme: 'colored',
               newestOnTop: true,
               pauseOnHover:false
             }) 
            
             handleRefreshBtn()
            } else if (response === 'found') {
                toast.info('Exam Already Created, you can edit!',{
                    position:'top-right',
                    autoClose: 2500,
                    theme: 'colored',
                    newestOnTop: true,
                    pauseOnHover:false
                  }) 
            }
          } catch(error) {
           console.error("Error:", error.message);
          }
    }
  }

  // fetch data
  const handleStatus = async () => {
    setStatus(true);
    try {
        const response = await window.api.invoke('fetch-exam-code');
        setExam(response);
        console.log(exam);
    } catch (err) {
        console.log(err);
    }
  }

  // delete exam
  const handleDeleteExam = async () => {
    console.log(deleteExamId);
    
    setTimeout( async () => {
        try {
            const response = await window.api.invoke('delete-exam-code', deleteExamId);
            if (response === true) {
                handleStatus();
                toast.success('Exam Deleted Successfully',{
                    position:'top-right',
                    autoClose: 2500,
                    theme: 'colored',
                    newestOnTop: true,
                    pauseOnHover:false
                  }) 
            } else if (response === false) {
                toast.info('Exam Define for Current Year, cant delete!',{
                    position:'top-right',
                    autoClose: 2500,
                    theme: 'colored',
                    newestOnTop: true,
                    pauseOnHover:false
                  }) 
            }
            else {
                toast.error('Something went wrong!',{
                    position:'top-right',
                    autoClose: 2500,
                    theme: 'colored',
                    newestOnTop: true,
                    pauseOnHover:false
                  }) 
            }
            setDeleteExamId('')        
            setisDeleteModelVisible(false)
        } catch (err) {
            console.log(err);
        }
    }, 200);
    
    
  }

  // update exam date
  const handleUpdate = async () => {
    setisEditModelVisible(false);
    const data = {
        exam_id: editExamId,
        heldin_month: editHeldInMonth,
        heldin_year: editHeldInYear
    }
    try {
        const response = await window.api.invoke('update-exam-code', data);
        if (response === true) {
            handleStatus();
            toast.success('Updated Successfully',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              }) 
        } else {
            toast.error('Something went wrong!',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              }) 
        }        
    } catch (err) {
        console.log(err);
    }
  };

  const handleAddBtn = async () => {
    if (pattern === '' || pattern === 'Select pattern' || semester === '' || semester === 'Select semester' || examtypeValue === '' || examtypeValue === 'Select exam' || subject === '' || subject === 'Select subject') {
        toast.info('Fill all required input fields',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              })
        return 
    }  
    const data = {
        pattern: pattern,
        semester: semester,
        exam: examtypeValue,
        subject: subject,
    }
    try {
        const response = await window.api.invoke('check-in-exam-res', data);
        console.log(response);
        
        if (response === "found") {
            setEditableRes(true)
            return
        } else {
            setResMarks(true)
            console.log(resMarks);
            
        }      
        
    } catch (err) {
        console.log(err);
    }
  }
  const handleInsertInExamRes = async() => {
    const data = {
        pattern: pattern,
        semester: semester,
        exam: examtypeValue,
        subject: subject,
        h1_res: h1Res,
        h2_res: h2Res
    }
    try {
        const response = await window.api.invoke('insert-in-exam-res', data);
        if (response === "found") {
            toast.info('Resolution Already Define! you can edit',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              }) 
            setEditableRes(true)
        } else if (response === "not found") {
            toast.success('Resolution Added Successfully!',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              }) 
              handleExamwiseRefreshBtn();
              setResMarks(false)
        } 
        else {
            toast.error('Something went wrong!',{
                position:'top-right',
                autoClose: 2500,
                theme: 'colored',
                newestOnTop: true,
                pauseOnHover:false
              }) 
        }        
    } catch (err) {
        console.log(err);
    }
  }
  return (
    <div className="exam-code-container">
      <ToastContainer />

        {examDefineDiv && (
            <div className='first-div'>
            <div className="form-container form-exam-code">
            <h1 className='form-title'>Exam Code</h1>
            <form className='form-main'>
                <div className="form-group">
                <label htmlFor="year">Year:</label>
                <select id="year" disabled={status} value={year} onChange={(e) => setYear(e.target.value)}>
                    {years.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="branch">Branch:</label>
                <select id="branch" disabled={status} value={branch} onChange={(e) => setBranch(e.target.value)}>
                    {branches.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                    ))}
                </select>
                </div>
                
                <div className="form-group heldin">
                <label htmlFor="heldin">Held In:</label>
                <div>
                    <select id="heldin" disabled={status} value={heldInYear} onChange={(e) => setHeldYear(e.target.value)}>
                        {heldYear.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                    <select id="heldin" disabled={status} value={heldInMonth} onChange={(e) => setHeldMonth(e.target.value)}>
                        {heldMonth.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                </div>

                <div className='form-group radio-group'>
                    <div>
                        <input type='radio' id='regular-exam' name='examtype' value='Regular Exam' checked={examType === 'Regular Exam'} onChange={(e) => setExamType(e.target.value)} disabled={status}></input>
                        <label htmlFor='regular-exam'>Regular Exam</label>
                    </div>
                    <div>
                        <input type='radio' id='atkt' name='examtype' value="A.T.K.T" checked={examType === 'A.T.K.T'} onChange={(e) => setExamType(e.target.value)} disabled={status}></input>
                        <label htmlFor='atkt'>A.T.K.T</label>
                    </div>
                </div>
        
                <div className="form-buttons">
                    <button type="button" className="btn-save" onClick={handleSave}>Save</button>
                    <button type="button" className="btn-edit" onClick={handleAddRes}>Add Res</button>
                    <button type="button" className="btn-refresh" id='btn-ref-sub-mas' onClick={() => handleRefreshBtn()}>Refresh</button>
                    <button type="button" className="btn-exit" onClick={handleStatus}>Status</button>
                </div>
                </form>
            </div>
            </div>
        )}
      

        {status && (
            <div className='status-div'>
            <div className='status-div-1'>
                <table>
                    <thead>
                        <tr>
                            <th>Edit</th>
                            <th>Delete</th>
                            <th>Exam Code</th>
                            <th>Exam Date</th>
                            <th>Is Current</th>
                            <th>Is Lock</th>
                        </tr>
                    </thead>
                    <tbody >
                        {exam.map((exam, index) => {
                            return (
                                <tr key={index}>
                                    <td><EditOutlinedIcon className='cursor-pointer text-green-300' onClick={() => {
                                         showEditModel()
                                        setEditHeldYear(exam.heldin_year)
                                        setEditHeldMonth(exam.heldin_month)
                                        setEditExamId(exam.exam_id)
                                        }}/></td>
                                    <td><DeleteOutlineOutlinedIcon className='cursor-pointer text-rose-400' id={exam.exam_id} onClick={showDeleteModel}/></td>
                                    <td>{`EXM${exam.exam_id}`}</td>
                                    <td className='text-left'>{`${exam.branch.slice(0,4)}. -${exam.heldin_month} ${exam.heldin_year} (${exam.type.split(' ')[0]})`}</td>
                                    <td><input type='checkbox' id={exam.exam_id} checked={exam.is_current === 1} onChange={handleUpdateIsCurrent}/></td>
                                    <td><input type='checkbox' id={exam.exam_id} checked={exam.is_lock === 1} onChange={handleUpdateIsLock}/></td>
                                </tr>
                            )
                        })}
                         
                    </tbody>
                </table>

                <div>
                    {/* <Modal title="Edit Date" open={isEditModelVisible} onOk={handleUpdate} onCancel={handleCancel}> */}
                    <Modal title="Edit Date" open={isEditModelVisible}   footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="update" type="primary" onClick={handleUpdate}>
                            Update
                        </Button>
                        
                        ]} 
                        onCancel={handleCancel}
                        >
                        
                        <div className="form-group heldin">
                            <label htmlFor="heldin">Held In:</label>
                            <div>
                                <select id="heldin"  value={editHeldInYear} onChange={(e) => setEditHeldYear(e.target.value)}>
                                    {heldYear.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                                <select id="heldin" value={editHeldInMonth} onChange={(e) => setEditHeldMonth(e.target.value)}>
                                    {heldMonth.map((option, index) => (
                                    <option key={index} value={option}>{option}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </Modal>

                    <Modal title="Are you sure? You want to Delete!" open={isDeleteModelVisible}   footer={[
                        <Button key="cancel" onClick={handleCancel}>
                            Cancel
                        </Button>,
                        <Button key="update" type="primary" onClick={handleDeleteExam}>
                            Delete
                        </Button>
                        
                        ]} 
                        onCancel={handleCancel}
                        >

                        </Modal>
                </div>
          
            </div>
            {exam.length === 0 && (
                <div className='w-full text-center'>
                    <h2 className='text-red-500 text-2xl'>Data not found!</h2>
                </div>
            )}
                <div className='btn-close-status'>
                    <button className='btn-exit ' onClick={() => {setStatus(false)}}>Exit</button>
                </div>    
        </div>
        )}

        {addResDiv && (
            <div className='first-div'>
            <div className="form-container form-exam-code">
            <h1 className='form-title'>Examwise Resolution</h1>
            <form className='form-main'>
                {/* <div className="form-group">
                <label htmlFor="year">Year:</label>
                    <select id="year" disabled={resMarks} value={year} onChange={(e) => setYear(e.target.value)}>
                        {years.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="branch">Branch:</label>
                    <select id="branch" disabled={resMarks} value={branch} onChange={(e) => setBranch(e.target.value)}>
                        {branches.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div> */}

                <div className="form-group">
                    <label htmlFor="pattern">Pattern</label>
                    <select id="pattern" disabled={resMarks || editableRes} value={pattern} onChange={(e) => setPattern(e.target.value)}>
                        {patterns.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="semester">Semester</label>
                    <select id="semester" disabled={resMarks || editableRes} value={semester} onChange={(e) => setSemester(e.target.value)}>
                        {semesters.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="subject">Subject</label>
                    <select id="subject" disabled={resMarks || editableRes} value={subject} onChange={(e) => setSubject(e.target.value)}>
                        {subjects.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>
                
                <div className="form-group">
                    <label htmlFor="exam">Exam</label>
                    <select id="exam" disabled={resMarks || editableRes} value={examtypeValue} onChange={(e) => setExamTypeValue(e.target.value)}>
                        {exams.map((option, index) => (
                        <option key={index} value={option}>{option}</option>
                        ))}
                    </select>
                </div>

                <div className="form-buttons">
                    <button type="button" disabled={resMarks} className="btn-getdata bg-blue-300" onClick={() =>{
                        handleAddBtn()
                        }}>Add</button>
                    <button type="button" className="btn-refresh" id='btn-ref-sub-mas' onClick={() => handleExamwiseRefreshBtn()}>Refresh</button>
                    <button type="button" className="btn-exit" onClick={() => {
                        setResMarks(false)
                        setAddResDiv(false)
                        setExamDefineDiv(true)
                        handleExamwiseRefreshBtn()
                        }} >Exit</button>
                </div>
                </form>
            </div>
            </div>
        )}

        {resMarks && (
            <div className='bg-white rounded-s-md font-semibold res-marks-div'>
                <table className=''>
                    <tbody>
                        <tr className='bg-indigo-100'>
                            <td>H1 Type</td>
                            <td>H1 OutOf</td>
                            <td>H1 Pass</td>
                            <td>H1 Res</td>
                        </tr>
                        <tr>
                            <td>Ese</td>
                            <td>0</td>
                            <td>0</td>
                            <td><input type='number' value={h1Res} onChange={(e)=> setH1Res(e.target.value)} className='w-20 h-full bg-orange-100 text-red-400'/></td>
                        </tr>
                        <tr className='bg-indigo-100'>
                            <td>H2 Type</td>
                            <td>H2 OutOf</td>
                            <td>H2 Pass</td>
                            <td>H2 Res</td>
                        </tr>
                        <tr>
                            <td>IA</td>
                            <td>0</td>
                            <td>0</td>
                            <td><input type='number' value={h2Res} onChange={(e)=> setH2Res(e.target.value)} className='w-20 h-full bg-orange-100 text-red-400'/></td>
                        </tr>
                
                    </tbody>
                </table>

                <div className='btn-res-marks'>
                    <button className='btn-save' onClick={handleInsertInExamRes}>Save</button>
                    <button className='btn-exit ' onClick={() => {setResMarks(false)}}>Exit</button>
                </div>  
            </div>
        )}

        {editableRes && (
            <div className='bg-white rounded-s-md font-semibold res-marks-div p-10 flex-col '>
                <h3 className='text-blue-400'>Resolution for this exam is already Define!</h3>
                <div className='w-full mt-3 flex justify-between'>
                    <button className='btn-edit' onClick={()=> {
                        setResMarks(true) 
                        setEditableRes(false)
                        }}>Edit</button>
                    <button className='btn-exit' onClick={()=> {
                        setEditableRes(false)
                        handleExamwiseRefreshBtn()
                    }}>Exit</button>
                </div>
            </div>
        )}
        
      </div>
   
)}   

export default ExamCode;