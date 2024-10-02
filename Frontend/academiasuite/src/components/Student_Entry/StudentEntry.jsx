import React, { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "../../assets/styles/form.css";
import '../../assets/styles/examcode.css';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net-dt'; // DataTables JS
import 'datatables.net-buttons-dt/css/buttons.dataTables.css'; // DataTables Buttons CSS
import '../../assets/styles/customDataTable.css';
import { Modal, Button } from 'antd';
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

import DataTable from 'datatables.net-react';
import DT from 'datatables.net-dt';
 


import 'datatables.net-buttons'; // DataTables Buttons JS
import 'datatables.net-buttons/js/buttons.html5.js'; // Export functionality
import JSZip from 'jszip'; // Required for Excel export
window.JSZip = JSZip; // Make JSZip available globally


const StudentEntry = () => {
  const [activeSearch, setActiveSearch] = useState(false);
  const [isDeleteModelVisible, setIsDeleteModelVisible] = useState(false);
  const [givenExams, setGivenExams] = useState(true);

  DataTable.use(DT);

  const [formData, setFormData] = useState({
    studentID: '',
    firstName: '',
    year: '',
    branch: '',
    caste: '',
    gender: '',
    isDyslexic: false,
    image: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSearch = () => {
    setActiveSearch(true)
    if (!formData.studentID) {
      toast.error("Enter Student ID", {
        position: "top-right",
        autoClose: 3500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "colored",

      })

    } else {
      alert("Student Found")
    }
  }


  // useEffect(() => {
  //   console.log(activeSearch);

  //   if (activeSearch) {
  //     $('#table').DataTable({
  //       // dom: 'Bfrtip', // Display buttons
  //       dom: "<'row'<'col-md-8'l><'col-md-4'f>>" + // Length and search input on the same line
  //         "<'row'<'col-md-12'<'div.spacer'>>>" +  // Spacer
  //         "<'row'<'col-md-12't>>" +               // Table
  //         "<'row'<'col-md-12'<'div.spacer'>>>" +  // Spacer
  //         "<'row'<'col-md-3'i><'col-md-9'p>>" + // info and pagination
  //         "<'row'<'col-md-12'<'div.spacer'>>>" +  // Spacer
  //         "<'row'<'col-md-12'B>>",               // Buttons at the bottom

  //       buttons: [
  //         {
  //           extend: 'copy',
  //           className: 'dt-button'
  //         },
  //         {
  //           extend: 'csv',
  //           className: 'dt-button'
  //         },
  //         {
  //           extend: 'excel',
  //           className: 'dt-button'
  //         },
  //         {
  //           extend: 'pdf',
  //           className: 'dt-button'
  //         }
  //       ],
  //       initComplete: function () {
  //         // Set the width of the search input
  //         $('.dataTables_filter input').css('width', '300px'); // Adjust the width as needed
  //       }
  //     });
  //     $('.spacer').css('height', '15px'); // Adjust the height as needed
  //   }

  //   else {
  //     console.log("not active");
  //   }
  // }, [activeSearch]);



  const onDestroyModal = () => {
    if ($.fn.DataTable.isDataTable('#table')) {
      $('#table').DataTable().destroy(true);
    }
  }

  const handleDeleteExam = () => {

  }


  return (
    <div className='exam-code-container flex gap-2 justify-between h-full items-center'>
      <div className='form-container max-w-[80%] '>
        <div className=" p-2  rounded-lg flex gap-4">
          <div className='border-r pr-2'>
            {/* Heading and Radio Buttons */}
            <div className="mb-6">
              <h2 className="text-3xl flex justify-center font-serif font-semibold mb-4">Student Entry</h2>
              <div className="flex space-x-4 bg-white p-4 rounded-lg shadow-sm">
                {['Engineering', 'Diploma', 'Old', 'Provisional'].map((type) => (
                  <label key={type} className="flex items-center font-extrabold">
                    <input
                      type="radio"
                      name="educationType"
                      value={type}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Form Inputs */}
            <div className="space-y-4">
              {/* Row 1: Student ID and First Name */}
              <div className="flex space-x-6">
                <div className="form-group w-1/2">
                  <label htmlFor="studentID" className="block font-extrabold mb-2">Student ID:</label>
                  <input
                    type="text"
                    id="studentID"
                    name="studentID"
                    className="w-full p-3 border rounded-lg"
                    value={formData.studentID}
                    onChange={handleInputChange}
                    placeholder='123466'
                  />
                </div>

                <div className="form-group w-1/2">
                  <label htmlFor="firstName" className="block font-extrabold mb-2">First Name:</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full p-3 border rounded-lg"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder='Enter Student Name'
                  />
                </div>
              </div>

              {/* Row 2: Year and Branch */}
              <div className="flex space-x-6">
                <div className="form-group w-1/2">
                  <label htmlFor="year" className="block font-extrabold mb-2">Year:</label>
                  <select
                    id="year"
                    name="year"
                    className="w-full p-3 border rounded-lg"
                    value={formData.year}
                    onChange={handleInputChange}
                    placeholder='Enter the Academic Year'
                  >
                    <option className='font-bold' disabled value="">Select  Year</option>
                    <option className='font-bold' value="FE">First Year</option>
                    <option className='font-bold' value="SE">Second Year</option>
                    <option className='font-bold' value="TE">Third Year</option>
                    <option className='font-bold' value="BE">Fourth Year</option>
                  </select>
                </div>

                <div className="form-group w-1/2">
                  <label htmlFor="branch" className="block font-extrabold mb-2">Branch:</label>
                  <select
                    id="branch"
                    name="branch"
                    className="w-full p-3 border rounded-lg"
                    value={formData.branch}
                    onChange={handleInputChange}
                  >
                    <option className='font-bold' value="">Select Branch</option>
                    <option className='font-bold' value="Computer Engineering">Computer Engineering </option>
                    <option className='font-bold' value="Civil Engineering">Civil Engineering </option>
                    <option className='font-bold' value="Mechanical Engineering">Mechanical Engineering</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Caste and Gender */}
              <div className="flex space-x-6">
                <div className="form-group w-1/2">
                  <label htmlFor="caste" className="block font-extrabold mb-2">Caste:</label>
                  <select
                    id="caste"
                    name="caste"
                    className="w-full p-3 border rounded-lg"
                    value={formData.caste}
                    onChange={handleInputChange}
                  >
                    <option value="" disabled className='font-extrabold'>Select a Caste </option>
                    <option className='font-bold' value="Open">Open</option>
                    <option className='font-bold' value="OBC">OBC</option>
                    <option className='font-bold' value="Scheduled Castes (SC)">Scheduled Castes (SC)</option>
                    <option className='font-bold' value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
                    <option className='font-bold' value="Vimukta Jati (VJ) / De-Notified Tribes (DT) (NT-A)">Vimukta Jati (VJ) / De-Notified Tribes (DT) (NT-A)</option>
                    <option className='font-bold' value="Nomadic Tribes 1 (NT-B)">Nomadic Tribes 1 (NT-B)</option>
                    <option className='font-bold' value="Nomadic Tribes 2 (NT-C)">Nomadic Tribes 2 (NT-C)</option>
                    <option className='font-bold' value="Nomadic Tribes 3 (NT-D)">Nomadic Tribes 3 (NT-D)</option>
                    <option className='font-bold' value="Other Backward Classes (OBC)">Other Backward Classes (OBC)</option>
                    <option className='font-bold' value="Socially and Educationally Backward Classes (SEBC)">Socially and Educationally Backward Classes (SEBC)</option>
                  </select>

                </div>

                <div className="form-group w-1/2">
                  <label htmlFor="gender" className="block font-extrabold mb-2">Gender:</label>
                  <select
                    id="gender"
                    name="gender"
                    className="w-full p-3 border rounded-lg"
                    value={formData.gender}
                    onChange={handleInputChange}
                  >
                    <option value="" className='font-extrabold'>Select Gender  </option>
                    <option value="Male" className='font-bold'>Male</option>
                    <option value="Female" className='font-bold' >Female</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="isDyslexic"
                    name="isDyslexic"
                    checked={formData.isDyslexic}
                    onChange={handleInputChange}
                    className="form-control-checkbox"
                  />
                  <label htmlFor="isDyslexic" className="ml-2 font-extrabold">For Dyslexia students</label>
                </div>
              </div>
            </div>
          </div>
          <div className='pt-10'>
            <div className="w-36 h-44 border-2 border-dashed border-black bg-white flex items-center justify-center relative">
              <label
                htmlFor="imageUpload"
                className="cursor-pointer text-center text-gray-500"
              >
                115x130 <br /> Upload Image
                <input
                  type="file"
                  id="imageUpload"
                  name="image"
                  className="hidden"
                  accept="image/jpg,image/png,image/jpeg,image" onChange={handleImageUpload}
                />
              </label>
            </div>
            <p className='text-lg   font-semibold'>Student Photo</p>
          </div>
        </div>
        <div className='flex justify-between mt-10'>
          <button className=" rounded btn-save">Save</button>
          <button className=" border rounded btn-refresh">Refresh</button>
          <button className=" border rounded btn-edit">Edit</button>
          <button className=" border rounded btn-exit">Delete</button>
          <button className=" border rounded btn-import">Import</button>
          <button className=" border rounded btn-search" onClick={handleSearch}>Search</button>
        </div>
        <ToastContainer />
      </div>



      <Modal title="Search By Name / Id" open={activeSearch}
        onCancel={() => {
          setActiveSearch(false)
          // onDestroyModal()
        }}
        onOk={() => {
          setActiveSearch(false)
          // onDestroyModal()
        }}
        width={900}
      >

        <div className='bg-white rounded '>
          <div className='p-2'>
            <DataTable id='table' className='student-entry-table text-[12px] ml-0'>
              <thead>
                <tr>
                  <th className='text-center'>Subject_id</th>
                  <th className='text-center'>Name</th>
                  <th className='text-center'>Branch</th>
                </tr>
              </thead>
              <tbody >
                <tr>
                  <td>std123</td>
                  <td className='text-left'>RAj ramesh pakhurde</td>
                  <td>Computer Engineering</td>
                </tr>
                <tr>
                  <td>std123</td>
                  <td className='text-left'>Asjad dawre</td>
                  <td>Computer Engineering</td>
                </tr>
                <tr>
                  <td>std123</td>
                  <td className='text-left'>Rohan devlekar</td>
                  <td>Computer Engineering</td>
                </tr>
                
                {/* {exam.map((exam, index) => {
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
                })} */}

              </tbody>
            </DataTable>
          </div>
        </div>
      </Modal>

      {givenExams && (
            <div className='status-div'>
            <div className='status-div-1'>
                  <table>
                    <thead>
                        <tr>
                            <th>Delete</th>
                            <th>AYID</th>
                            <th>Semester</th>
                            <th>Branch</th>
                        </tr>
                    </thead>
                    <tbody >
                      <tr>
                        <td><DeleteOutlineOutlinedIcon className='cursor-pointer text-rose-400' onClick={()=> setIsDeleteModelVisible(true)}/></td>
                        <td>01/June 2011-31/May/2012</td>
                        <td>Sem 1</td>
                        <td>Computer Engineering</td>
                      </tr>
                      <tr>
                        <td><DeleteOutlineOutlinedIcon className='cursor-pointer text-rose-400' onClick={()=> setIsDeleteModelVisible(true)}/></td>
                        <td>01/June 2011-31/May/2012</td>
                        <td>Sem 2</td>
                        <td>Computer Engineering</td>
                      </tr>
                      <tr>
                        <td><DeleteOutlineOutlinedIcon className='cursor-pointer text-rose-400' onClick={()=> setIsDeleteModelVisible(true)}/></td>
                        <td>01/June 2011-31/May/2012</td>
                        <td>Sem 3</td>
                        <td>Computer Engineering</td>
                      </tr> 
                        {/* {exam.map((exam, index) => {
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
                        })} */}
                         
                     </tbody>
                </table> 
                  

                <div>
                    <Modal title="Are you sure? You want to Delete!" open={isDeleteModelVisible}   footer={[
                        <Button key="cancel" onClick={()=> setIsDeleteModelVisible(false)}>
                            Cancel
                        </Button>,
                        <Button key="update" type="primary" onClick={handleDeleteExam}>
                            Delete
                        </Button>
                        
                        ]} 
                        onCancel={()=> setIsDeleteModelVisible(false)}
                        >

                        </Modal>
                </div>
              </div>
              </div> )}
                

    </div>

  );
};
export default StudentEntry;
