import React, { useState } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import * as XLSX from 'xlsx';
import { v4 as uuidv4 } from 'uuid';



const StudentEntry = () => {
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

  const [students,setStudents]=useState([])


  const [excelData, setExcelData] = useState([]);


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  const handleRefresh=()=>{
    setExcelData([])
  }

  const handleImport =()=>{
    const input=document.createElement('input');
    input.type='file';
    input.accept='file'
    input.click();

    input.onchange=()=>{
      const file=input.files[0];
      const reader=new FileReader();
      reader.onload=(e)=>{
        const binarystr=e.target.result;
        const workbook=XLSX.read(binarystr,{type:'binary'});
        const sheetName =workbook.SheetNames[0];
        const sheet =workbook.Sheets[sheetName];
        const jsonData=XLSX.utils.sheet_to_json(sheet);
        setExcelData(jsonData);
      };
      reader.readAsBinaryString(file);
    };
console.log(excelData)
        
      }

      const generateStudentId = () => {
        return `STU-${uuidv4()}`; 
    };

      const handleSave=async()=>{
        if (excelData.length !== 0 && formData.branch !== '' && formData.year !== '') {
          // toast.success("Rukho Zara Sabr Karo")
          const studentsWithIds =  excelData.map((student, index) => ({
            id: generateStudentId(index), // Generate unique ID
            name: student.StudentName,
            category: student.Category,
            gender: student.Gender,
            studentType: student.StudentType,
          }));
      
          setStudents(studentsWithIds);
          console.log(students);
          const {success,message} = await window.api.invoke('save-student-data', {
              students: students,
              branch: formData.branch,
              year: formData.year,
          }); 
          if(success){
            toast.success(message,{
              position: "top-right",
              autoClose: 3000,
              pauseOnHover:false,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: false,
              theme: "colored",

            })
          }
          else{
            toast.error("Something went wrong While saving! ")
          }


          

        }
        else{
          toast.info("Import students First!",{
            position: "top-right",
  autoClose: 3000,
  pauseOnHover:false,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: "colored",
          })
          return
        }
      }
  const handleImageUpload = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    });
  };

  const handleSearch = () => {
    if(!formData.studentID){
toast.error("Enter Student ID" ,{
  position: "top-right",
  autoClose: 3500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: false,
  draggable: false,
  theme: "colored",
  
})

}else{
      alert("Student Found")
    }
  }

  return (
    <div className="exam-cod p-8 bg-gray-100 min-h-screen">
      {/* Main Form Container */}
      <div className="bg-white p-8 shadow-lg rounded-lg flex">
        
        {/* Left Section: Form Fields */}
        <div className="w-2/3 space-y-6 pr-6 border-r">
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
                <option className='font-bold'  disabled value="">Select  Year</option>
                <option className='font-bold'  value="5/April/2023-30/May/2024">5/April/2023-30/May/2024</option>
                {/* <option className='font-bold'   value="SE">Second Year</option>
                <option className='font-bold'  value="TE">Third Year</option>
                <option className='font-bold'  value="BE">Fourth Year</option> */}
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
                  <option className='font-bold'  value="">Select Branch</option>
                  <option className='font-bold' value="Computer Engineering">Computer Engineering </option>
                  <option className='font-bold'  value="Civil Engineering">Civil Engineering </option>
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
    <option className='font-bold'value="Open">Open</option>
    <option className='font-bold'value="OBC">OBC</option>
    <option className='font-bold' value="Scheduled Castes (SC)">Scheduled Castes (SC)</option>
    <option className='font-bold' value="Scheduled Tribe (ST)">Scheduled Tribe (ST)</option>
    <option className='font-bold'value="Vimukta Jati (VJ) / De-Notified Tribes (DT) (NT-A)">Vimukta Jati (VJ) / De-Notified Tribes (DT) (NT-A)</option>
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
                  <option value="Female"className='font-bold' >Female</option>
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

            <div className="mt-20 flex space-x-4">
              <button className="px-4 py-2 bg-green-600 hover:bg-green-500 rounded" onClick={handleSave}>SAVE</button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border rounded" onClick={handleRefresh}>REFRESH</button>
              <button className="px-4 py-2 bg-red-500 hover:bg-red-600 border rounded">DELETE</button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border rounded">GET EXCEL</button>
              <button className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 border rounded">EDIT</button>
              <button className="px-4 py-2 bg-green-500 hover:bg-green-600 border rounded" onClick={handleImport}>IMPORT</button>
              <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 border rounded" onClick={handleSearch}>Search</button>
            </div>
          </div>
        </div>

        <div className="w-1/3 flex flex-col mt-[-25rem] items-center justify-center p-6">
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
 accept="image/jpg,image/png,image/jpeg,image"                onChange={handleImageUpload}
              />
            </label>
          </div>
            <p className='text-lg   font-semibold'>Student Photo</p>
        </div>
      </div>
      {excelData.length > 0 && (
        <table className="w-full border border-gray-300 mt-4 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {Object.keys(excelData[0]).map((key) => (
              <th key={key} className="px-4 py-2 text-left border border-gray-300">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {excelData.map((row, index) => (
            <tr key={index} className={index % 2 === 0 ? "bg-gray-100" : "bg-white"}>
              {Object.values(row).map((value, idx) => (
                <td key={idx} className="px-4 py-2 border border-gray-300">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      
      )}

      <ToastContainer/>
      
    </div>

  );
};

export default StudentEntry;
