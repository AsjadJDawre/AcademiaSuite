import React, { useState } from 'react';
import FormInputs from '../FormInputs/FormInput';
import '../../assets/styles/subjectmaster.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SubjectMaster = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [EditPopUp, setEditPopUp] = useState(false);
  const [data, setData] = useState({});
  const [EditData, setEditData] = useState({});

  // State for Sub-box 1
  const [eseChecked1, setEseChecked1] = useState(false);
  const [prChecked1, setPrChecked1] = useState(false);
  const [orChecked1, setOrChecked1] = useState(false);

  const [eseOutOfMarks1, setEseOutOfMarks1] = useState('');
  const [esePassingMarks1, setEsePassingMarks1] = useState('');
  const [eseResolution1, setEseResolution1] = useState('');
  const [h1Input1, setH1Input1] = useState('');

  // State for Sub-box 2
  const [iaChecked1, setIaChecked1] = useState(false);
  const [twChecked1, setTwChecked1] = useState(false);
  const [iaOutOfMarks1, setIaOutOfMarks1] = useState('');
  const [iaPassingMarks1, setIaPassingMarks1] = useState('');
  const [iaResolution1, setIaResolution1] = useState('');
  const [h2Input1, setH2Input1] = useState('');
  const [overallPassingCriteria1, setOverallPassingCriteria1] = useState('');

  const handleData = (data) => {
    console.log('Received data from Child Input Component', data.subjectName);
    setData(data);
  };

  const handleEdit = (data) => {
    console.log('Received data from Child Input Component', data.subjectName);
    setEditData(EditData);
  };

  const validateBoxes = () => {
    const box1Filled = eseChecked1 || prChecked1 || orChecked1 || eseOutOfMarks1 || esePassingMarks1 || eseResolution1;
    const box2Filled = iaChecked1 || twChecked1 || iaOutOfMarks1 || iaPassingMarks1 || iaResolution1;

    return box1Filled || box2Filled;
  };

  const handleSave = async () => {
    if (!validateBoxes()) {
      toast.error('Please fill in the required fields!', {
        position: 'top-right',
        autoClose: 2500,
        theme: 'colored',
        newestOnTop: true,
      });
      return;
    }

    const subjectData = {
      h1Input1,
      h2Input1,
      eseOutOfMarks1,
      esePassingMarks1,
      eseResolution1,
      iaChecked1,
      orChecked1,
      eseChecked1,
      prChecked1,
      twChecked1,
      iaOutOfMarks1,
      iaPassingMarks1,
      iaResolution1,
      overallPassingCriteria1,
      subjectName: data.subjectName,
    };

    try {
      const response = await window.api.invoke('save-subject', subjectData);

      if (response === "Success") {
        toast.success('Subject updated successfully!', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
        setShowGrid(false);
      } else if (response === "SNF") {
        toast.error('Subject not found! Try adding a subject first.', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
      } else if (response === "DE") {
        toast.error('Database error occurred.', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
      } else if (response === "UE") {
        toast.error('Update error occurred.', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
      } else if (response === "NoUpdate") {
        toast.info('No columns to update.', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
      }
    } catch (error) {
      toast.error('An unexpected error occurred.', {
        position: 'top-right',
        autoClose: 2500,
        theme: 'colored',
        newestOnTop: true,
      });
      console.error('Save error:', error);
    }

    setShowGrid(false);
  };

  // Handlers for single checkbox selection in sub-box 1
  const handleEseChange = () => {
    setEseChecked1(true);
    setPrChecked1(false);
    setOrChecked1(false);
  };

  const handlePrChange = () => {
    setEseChecked1(false);
    setPrChecked1(true);
    setOrChecked1(false);
  };

  const handleOrChange = () => {
    setEseChecked1(false);
    setPrChecked1(false);
    setOrChecked1(true);
  };

  // Handlers for single checkbox selection in sub-box 2
  const handleIaChange = () => {
    setIaChecked1(true);
    setTwChecked1(false);
  };

  const handleTwChange = () => {
    setIaChecked1(false);
    setTwChecked1(true);
  };

  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} newestOnTop pauseOnHover={false} />
      <FormInputs setShowGrid={setShowGrid} handleData={handleData} handleEdit={handleEdit} setEditPopUp={setEditPopUp} />
      {showGrid && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[80vh] overflow-y-auto">
            <div className="mb-4">
              <div className="flex mb-4">
                <div className="flex items-center mr-4">
                  <label className="mr-2">H1</label>
                  <input
                    type="text"
                    value={h1Input1}
                    onChange={(e) => setH1Input1(e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                </div>
                <div className="flex items-center">
                  <label className="mr-2">H2</label>
                  <input
                    type="text"
                    value={h2Input1}
                    onChange={(e) => setH2Input1(e.target.value)}
                    className="border border-gray-300 p-1 rounded"
                  />
                </div>
              </div>

              <div className="flex">
                <div className="w-1/2 pr-2">
                  <div className="border border-gray-300 p-4 rounded-lg mb-4">
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={eseChecked1}
                            onChange={handleEseChange}
                            className="mr-2"
                          />
                          <label>ESE</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={prChecked1}
                            onChange={handlePrChange}
                            className="mr-2"
                          />
                          <label>PR</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={orChecked1}
                            onChange={handleOrChange}
                            className="mr-2"
                          />
                          <label>OR</label>
                        </div>
                      </div>
                      <div className="flex-1 pl-2">
                        <label className="block mb-1">Out of Marks</label>
                        <input
                          type="text"
                          value={eseOutOfMarks1}
                          onChange={(e) => setEseOutOfMarks1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Passing Marks</label>
                        <input
                          type="text"
                          value={esePassingMarks1}
                          onChange={(e) => setEsePassingMarks1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Resolution</label>
                        <input
                          type="text"
                          value={eseResolution1}
                          onChange={(e) => setEseResolution1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border border-gray-300 p-4 rounded-lg">
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={iaChecked1}
                            onChange={handleIaChange}
                            className="mr-2"
                          />
                          <label>IA</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={twChecked1}
                            onChange={handleTwChange}
                            className="mr-2"
                          />
                          <label>TW</label>
                        </div>
                      </div>
                      <div className="flex-1 pl-2">
                        <label className="block mb-1">Out of Marks</label>
                        <input
                          type="text"
                          value={iaOutOfMarks1}
                          onChange={(e) => setIaOutOfMarks1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Passing Marks</label>
                        <input
                          type="text"
                          value={iaPassingMarks1}
                          onChange={(e) => setIaPassingMarks1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Resolution</label>
                        <input
                          type="text"
                          value={iaResolution1}
                          onChange={(e) => setIaResolution1(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 pl-2">
                  <label className="block mb-1">Overall Passing Criteria</label>
                  <input
                    type="text"
                    value={overallPassingCriteria1}
                    onChange={(e) => setOverallPassingCriteria1(e.target.value)}
                    className="w-full border border-gray-300 p-1 rounded"
                  />
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                >
                  Save
                </button>
                <button
                  onClick={() => setShowGrid(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectMaster;
