import React, {useState, useEffect} from "react";
import '../../assets/styles/form.css';
import '../../assets/styles/examcode.css';
import '../../assets/styles/studentattendence.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Modal, Button } from 'antd';

const StudentAttendence = () => {
    const [showStuAttendenceContainer, setShowStuAttendenceContainer] = useState(true);

    const [year, setYear] = useState('');
    const [branch, setBranch] = useState('');
    const [pattern, setPattern] = useState('');
    const [semester, setSemester] = useState('');
    const [examtypeValue, setExamTypeValue] = useState('');
    const [examIdForeignKey, setExamIdForeignKey] = useState('');

    const [subjects, setSubjects] = useState(['Select subject']);
    const [exams, setExams] = useState(['Select exam']);
    const [subject, setSubject] = useState('');
    const [exam, setExam] = useState([]);

    const years = ['Select year', '01/June 2011-31/May/2012', '01/June 2012-31/May/2013', '01/June 2013-31/May/2014'];
    const patterns = ['Select pattern', 'CBGS', 'Old Pattern'];
    const semesters = ['Select semester', 'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4'];
    const branches = ['Select branch', 'MECHANICAL ENGINEERING', 'COMPUTER ENGINEERING', 'CIVIL ENGINEERING'];

    useEffect(() => {
        const fetchData = async () => { 
            try {
            const response = await window.api.invoke('fetch-exam-code');

            // setExams([...response]); 
            setExams([{ exam_id: '', year: '', branch: '', heldin_year: 'Select exam', heldin_month: '', type: '' }, ...response]); 
            } catch (error) {
            console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
    const fetchData = async () => {
        setSubjects([]) 
            const data = {
            exam_id: examIdForeignKey
            }
            const response = await window.api.invoke('fetch-subject-branch-wise',data);
            const filteredSubjects = response.filter(item => item.subject_name !== null && item.subject_name.trim() !== '');
    
            // Use a Set to filter out duplicate subject names
            const uniqueSubjectNames = Array.from(new Set(filteredSubjects.map(item => item.subject_name)));
            
            setSubjects(['Select subject', ...uniqueSubjectNames]);
    
        }
        fetchData();
    }, [examIdForeignKey]);

    return (
        <div className="exam-code-container">
        <ToastContainer />

            {showStuAttendenceContainer && (
                <div className='first-div'>
                <div className="form-container form-exam-code">
                <h1 className='form-title'>Student Attendence</h1>
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
                        <select id="pattern"  value={pattern} onChange={(e) => setPattern(e.target.value)}>
                            {patterns.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="branch">Branch:</label>
                        <select id="branch"   value={branch} onChange={(e) => setBranch(e.target.value)}>
                            {branches.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="semester">Semester</label>
                        <select id="semester"   value={semester} onChange={(e) => setSemester(e.target.value)}>
                            {semesters.map((option, index) => (
                            <option key={index} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>

                 
                        <div className="form-group">
                            <label htmlFor="exam">Exam</label>
                            <select id="exam"   value={examtypeValue} onChange={(e) => {
                                setExamTypeValue(e.target.value)

                                const selectedIndex = e.target.selectedIndex; 
                                const selectedOption = e.target.options[selectedIndex]; 
                                setExamIdForeignKey(selectedOption.id);  
                                
                            }}>
                                {exams.map((option, index) => {
                                    const branchShort = option.branch ? option.branch.slice(0, 4) : ''; 
                                    const heldinMonth = option.heldin_month || ''; 
                                    const heldinYear = option.heldin_year || ''; 
                                    const examType = option.type ? option.type.split(' ')[0] : '';

                                    return (
                                        <option key={index} id={option.exam_id} value={`${branchShort}. ${heldinMonth}-${heldinYear}- (${examType})`}>
                                            {`${branchShort}. ${heldinMonth}-${heldinYear}- (${examType})`}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>

                        <div className="form-group ">
                            <label htmlFor="subject">Subject</label>
                            <select id="subject"   value={subject} onChange={(e) => setSubject(e.target.value)}>
                                {subjects.map((option, index) => (
                                <option key={index} value={option}>{option}</option>
                                ))}
                            </select>
                        </div> 
                   

                    <div className="flex justify-between gap-2 items-center">
                        <div className='form-group radio-group w-full'>
                            <div>
                                <input type='radio' id='allsub' name='examtype' value='All Subjects'></input>
                                <label htmlFor='allsub'>All Subjects</label>
                            </div>
                            <div>
                                <input type='radio' id='singlesub' name='examtype' value="Single Subject"></input>
                                <label htmlFor='singlesub'>Single Subject</label>
                            </div>
                        </div>

                        <div>
                            <button type="button" className="btn-save">Set Eligibility</button>
                        </div>
                    </div>
            
                    <div className="form-buttons">
                        <button type="button" className="btn-save" >Save</button>
                        <button type="button" className="btn-edit" >Edit</button>
                        <button type="button" className="btn-refresh" >Refresh</button>
                        <button type="button" className="btn-exit"  >Report</button>
                    </div>
                    </form>
                </div>
                </div>
            )}
        </div>
    )
}

export default StudentAttendence; 