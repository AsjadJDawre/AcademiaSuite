import React, { useState, useEffect } from "react";
import '../../assets/styles/form.css';
import '../../assets/styles/examcode.css';
import '../../assets/styles/studentattendence.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { Modal } from 'antd';

const StudentAttendence = () => {
    // const [showStuAttendenceContainer, setShowStuAttendenceContainer] = useState(true);
    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [pattern, setPattern] = useState('');
    const [semester, setSemester] = useState('');
    const [examtypeValue, setExamTypeValue] = useState('');
    const [examIdForeignKey, setExamIdForeignKey] = useState('');
    const [showModal, setShowModal] = useState(false);
const [studentToDelete, setStudentToDelete] = useState(null);


    const [subjects, setSubjects] = useState(['Select subject']);
    const [exams, setExams] = useState(['']);
    const [subject, setSubject] = useState('');
    const [subjectType, setSubjectType] = useState('');
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const [eligibleStudents, setEligibleStudents] = useState([]);
    const [showEligibleStudents, setShowEligibleStudents] = useState(true);
    const [showStudents, setshowStudents] = useState(true);

    
    // Error modal states
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const years = ['Select year', '01/June 2011-31/May/2012', '01/June 2012-31/May/2013', '01/June 2013-31/May/2014'];
    const patterns = ['Select pattern', 'CBGS', 'Old Pattern'];
    const semesters = ['Select semester', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const branches = ['Select branch', 'MECHANICAL ENGINEERING', 'COMPUTER ENGINEERING', 'CIVIL ENGINEERING'];
    const [students, setStudents] = useState([]);

    
    useEffect(() => {
        const fetchExams = async () => {
            try {
                const response = await window.api.invoke('fetch-exam-code');
                setExams(response);
            } catch (error) {
                console.error('Error fetching exams:', error);
                setErrorMessage('Error fetching exams.');
                setShowErrorModal(true);
            }
        };

        fetchExams();
    }, []);

    useEffect(() => {
        const fetchSubjects = async () => {
            if (examIdForeignKey) {
                try {
                    const data = { exam_id: examIdForeignKey };
                    const response = await window.api.invoke('fetch-subject-branch-wise', data);
                    const filteredSubjects = response.filter(item => item.subject_name !== null && item.subject_name.trim() !== '');
                    const uniqueSubjectNames = Array.from(new Set(filteredSubjects.map(item => item.subject_name)));
                    setSubjects(['Select subject', ...uniqueSubjectNames]);
                } catch (error) {
                    console.error('Error fetching subjects:', error);
                    setErrorMessage('Error fetching subjects.');
                    setShowErrorModal(true);
                }
            }
        };

        fetchSubjects();
    }, [examIdForeignKey]);
    // console.log(subjectType);


    const handleRefresh =()=>{
        // setshowStudents(false)

        setBranch('');
        setYear('');
        setPattern('')
        setSemester('');
        setSubject('');
        setExamTypeValue('')
        setSubjectType('');
        setSelectedStudents(new Set()); 
        setShowEligibleStudents(false)
        setEligibleStudents([]);
        setStudentToDelete(null); 
        setShowModal(false);
        setshowStudents(false);

        // Reset error state
        setShowErrorModal(false);
        setErrorMessage('');
    }

    // console.log(eligibleStudents);
    
    const getAllStudents = async () => {
        try {
            const fetchedStudents = await window.api.invoke("fetch-student");
            const regularStudents = fetchedStudents.filter(student => student.status === 'regular');
            setStudents(regularStudents);
            // console.log(regularStudents); 
        } catch (error) {
            console.error('Error fetching students:', error);
            setErrorMessage('Error fetching students.');
            setShowErrorModal(true);
        }
        
    };
    

    useEffect(() => {
            getAllStudents();
        }    , []);
  

        const [isEligible, setIsEligible] = useState(false);


      
    useEffect(() => {
        const checkEligibility = async () => {
            if (examIdForeignKey && subjectType && semester) {
                console.log('Checking eligibility with:', { examtypeValue, subjectType, semester }); // Debugging
                try {
                    let data;
                    if (subjectType!=='ALL') {
                         data = {
                            exam_type: examIdForeignKey,
                            subject_type: subjectType,
                            subject_name: subject,
                        };
                    }
                    else{
                         data = {
                            exam_type: examIdForeignKey,
                            subject_type: subjectType,
                            subject_name: null,
                        };

                    }
                   

                    const result = await window.api.invoke('check-existing-assignments', data);
                    console.log('Eligibility check result:', result); // Debugging
                    setIsEligible(result.exists);
                } catch (error) {
                    console.error('Error checking existing assignments:', error);
                    setIsEligible(false); 
                }
            }
        };

        checkEligibility();
    }, [examtypeValue, subjectType, semester]); 


    const handleSave = async () => {
        console.log('Attempting to save with eligibility:', isEligible); // Debugging

        if (isEligible) {
            setShowErrorModal(true);
            setErrorMessage('Students Are Already Eligible for this Exam. You can EDIT.');
            return;
        }

        if (selectedStudents.size === 0) {
            toast.error('No students selected!');
            return;
        }

        try {
            const studentIds = Array.from(selectedStudents);
            let data = { exam_id: examIdForeignKey, students: studentIds, subject, semester };

            if (subjectType === 'ALL') {
                data.subject_marker = 'ALL';
                data.subject = null; // No specific subject needed
            } else {
                data.subject_marker = 'SINGLE';
                data.subject = subject;
            }

            await window.api.invoke('save-student-exams', data);
            toast.success('Student exams saved successfully!');
            handleRefresh()
        } catch (error) {
            console.error('Error saving student exams:', error);
            toast.error('Error saving student exams.');
        }
    };

    const handleSubjectChange = (e) => {
        setSubject(e.target.value);
    };

    const handleCheckboxChange = (student_id) => {
        setSelectedStudents((prev) => {
            const newSelected = new Set(prev);
    
            if (newSelected.has(student_id)) {
                setStudentToDelete(student_id); // Store the student to be potentially deleted
                setShowModal(true); 
            } else {
                // If the student is not selected (checkbox is unchecked), add them to the set
                newSelected.add(student_id);
            }
    
            return newSelected;
        });
    };
    const deleteExamAllotment = async (studentId) => {
        try {
            if(subjectType!=='ALL'){
                await window.api.invoke('delete-student-exam', { exam_id: examIdForeignKey, student_id: studentId,subject:subject });
                console.log(`Deleted exam allotment for student with ID: ${studentId}`);

            }
            else{
                await window.api.invoke('delete-student-exam', { exam_id: examIdForeignKey, student_id: studentId,subject:null });
                console.log(`Deleted exam allotment for student with ID: ${studentId}`);

                handleRefresh()
            }
            
        } catch (error) {
            console.error(`Error deleting exam allotment for student with ID: ${studentId}`, error);
            handleRefresh()

            throw error; 
        }
    };

    const confirmDeletion = async () => {
        try {
            setSelectedStudents((prev) => {
                const newSet = new Set(prev);
                newSet.delete(studentToDelete);
                return newSet;
            });
    
            // Proceed to delete the exam allotment for the student
            await deleteExamAllotment(studentToDelete);
            toast.success('Exam allotment deleted successfully!');
            handleRefresh();


        } catch (error) {
            console.error('Error deleting exam allotment:', error);
            handleRefresh()

            toast.error('Error deleting exam allotment.');
        } finally {
            setShowModal(false);
            setStudentToDelete(null);
        }
    };
    
    const cancelDeletion = () => {
        setShowModal(false);
        setStudentToDelete(null);
    };
    
    

 
    
    const handleEdit = async () => {
        if (!examIdForeignKey ) {
          toast.error('Exam ID  is missing!');
          return;
        }
      
        try {
          const response = await window.api.invoke('fetch-student-exams', { exam_id: examIdForeignKey, semester });
      
          console.log('Student exams response:', response);
      
          const filteredStudents = response.filter(student => student.subject_marker === 'ALL'||'SINGLE');
          
          console.log('Filtered students:', filteredStudents);
      
          const allStudents = await window.api.invoke('fetch-student');
          console.log('All students:', allStudents);
      
          const regularStudents = allStudents.filter(student => student.status === 'regular');
          console.log('Regular students:', regularStudents);
      
          const eligibleStudentIds = new Set(filteredStudents.map(student => student.student_id));
          setEligibleStudents(regularStudents.filter(student => eligibleStudentIds.has(student.student_id)));
          setSelectedStudents(eligibleStudentIds);
          setShowEligibleStudents(true);
          setshowStudents(false);
        } catch (error) {
          console.error('Error fetching eligible students:', error);
          toast.error('Error fetching eligible students.');
        }
      };
      



    return (
        <>
            <div className="exam-code-container">
                
                    <div className='first-div'>
                        <div className="form-container form-exam-code">
                            <h1 className='form-title'>Student Attendance</h1>
                            <form className='form-main'>
                                <div className="form-group">
                                    <label htmlFor="year">Year:</label>
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
                                    <label htmlFor="branch">Branch:</label>
                                    <select id="branch" value={branch} onChange={(e) => setBranch(e.target.value)}>
                                        {branches.map((option, index) => (
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
                                    <label htmlFor="exam">Exam</label>
                                    <select id="exam" value={examtypeValue} onChange={(e) => {
                                        setExamTypeValue(e.target.value);
                                        const selectedIndex = e.target.selectedIndex;
                                        const selectedOption = e.target.options[selectedIndex];
                                        setExamIdForeignKey(selectedOption.id);
                                    }}>
                                            <option value="" disabled selected>Select Exam</option>

                                        {exams.map((option, index) => {
                                            const branchShort = option.branch ? option.branch.slice(0, 4) : '';
                                            const heldinMonth = option.heldin_month || '';
                                            const heldinYear = option.heldin_year || '';
                                            const examType = option.type ? option.type.split(' ')[0] : '';
                                            return (
                                                <option key={index} id={option.exam_id} value={`${branchShort}. ${heldinMonth}-${heldinYear}. ${examType}`}>
                                                    {`${branchShort}. ${heldinMonth}-${heldinYear}. ${examType}`}
                                                </option>
                                            );
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="subject">Subject</label>
                                    <select id="subject" value={subject} onChange={handleSubjectChange}>
                                        {subjects.map((option, index) => (
                                            <option key={index} value={option}>{option}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="flex justify-between gap-2 items-center">
                        <div className='form-group radio-group w-full'>
                            <div>
                                <input type='radio' id='allsub' name='examtype' value='ALL'checked={subjectType === 'ALL'}
  onChange={(e)=>setSubjectType(e.target.value)}></input>
                                <label htmlFor='allsub'>All Subjects</label>
                            </div>
                            <div>
                                <input type='radio' id='singlesub' name='examtype' value="SINGLE" checked={subjectType === 'SINGLE'} onChange={(e)=>setSubjectType(e.target.value)}></input>
                                <label htmlFor='singlesub'>Single Subject</label>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="btn-save">Set Eligibility</button>
                        </div>
                    </div>
                                <div className="form-buttons">
                        <button type="button" className="btn-save" onClick={handleSave} >Save</button>
                        <button type="button" className="btn-edit" onClick={handleEdit}  >Edit</button>
                        <button type="button" className="btn-refresh" onClick={handleRefresh} >Refresh</button>
                        <button type="button" className="btn-exit"  >Report</button>
                    </div>
                            </form>
                        </div>
                    </div>
                
<div className='student-list max-h-96 overflow-y-auto p-4'>
            <table className='min-w-full divide-y divide-gray-200 w-full border-collapse '>
                <thead className='bg-gray-50'>
                    <tr>
                        <th className='px-6 py-3 text-left text-lg  uppercase tracking-wider'>
                            Select
                        </th>
                        <th className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'>
                            Student ID
                        </th>
                        <th className='px-6 py-3 text-left text-lg font-medium  uppercase tracking-wider'>
                            Name
                        </th>
                       
                    </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                    {showEligibleStudents && eligibleStudents.map(student => (
                        <tr key={student.student_id}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.has(student.student_id)}
                                    onChange={() => handleCheckboxChange(student.student_id)}
                                />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>{student.student_id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{student.name}</td>
                        </tr>
                    ))}
                    {showStudents && students.map(student => (
                        <tr key={student.student_id}>
                            <td className='px-6 py-4 whitespace-nowrap'>
                                <input
                                    type="checkbox"
                                    checked={selectedStudents.has(student.student_id)}
                                    onChange={() => handleCheckboxChange(student.student_id)}
                                />
                            </td>
                            <td className='px-6 py-4 whitespace-nowrap'>{student.student_id}</td>
                            <td className='px-6 py-4 whitespace-nowrap'>{student.name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal for confirming deletion */}
            <Modal
                title="Confirm Deletion"
                visible={showModal}
                onOk={confirmDeletion}
                onCancel={cancelDeletion}
                okText="Yes, Delete"
                cancelText="Cancel"
            >
                <p>Are you sure you want to delete the exam allotment for this student?</p>
            </Modal>

            {/* Toast notifications */}
            <ToastContainer />
        </div>

             

                <Modal
                    title="Error"
                    visible={showErrorModal}
                    onOk={() => setShowErrorModal(false)}
                    onCancel={() => setShowErrorModal(false)}
                >
                    <p>{errorMessage}</p>
                </Modal>
               

            </div>
        </>
    );
};

export default StudentAttendence;
