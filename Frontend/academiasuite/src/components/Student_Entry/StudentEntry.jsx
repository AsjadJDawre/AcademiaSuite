import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import "../../assets/styles/form.css";

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

            <div className="pt-12 flex justify-between">
              <button className=" rounded btn-save">Save</button>
              <button className=" border rounded btn-refresh">Refresh</button>
              <button className=" border rounded btn-edit">Edit</button>
              <button className=" border rounded btn-exit">Delete</button>
              <button className=" border rounded btn-excel">Get Excel</button>
              <button className=" border rounded btn-import">Import</button>
              <button className=" border rounded btn-search" onClick={handleSearch}>Search</button>
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
                accept="image/jpg,image/png,image/jpeg,image" onChange={handleImageUpload}
              />
            </label>
          </div>
          <p className='text-lg   font-semibold'>Student Photo</p>
        </div>
      </div>
      <ToastContainer />
    </div>

  );
};

export default StudentEntry;
