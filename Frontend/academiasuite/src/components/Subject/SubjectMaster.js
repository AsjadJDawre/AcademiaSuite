import React, { useState } from 'react';
import FormInputs from '../FormInputs/FormInput';
import '../../assets/styles/subjectmaster.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';

const SubjectMaster = () => {
  const [showGrid, setShowGrid] = useState(false);
  const [data, setData] =  useState({});

  // State for Sub-box 1
  const [eseChecked1, setEseChecked1] = useState(false);
  const [prChecked1, setPrChecked1] = useState(false);
  const [orChecked1, setOrChecked1] = useState(false);

  const [eseOutOfMarks1, setEseOutOfMarks1] = useState('');
  const [esePassingMarks1, setEsePassingMarks1] = useState('');
  const [eseResolution1, setEseResolution1] = useState('');
  const [h1Checked1, setH1Checked1] = useState(false);

  // State for Sub-box 2
  const [iaChecked1, setIaChecked1] = useState(false);
  const [twChecked1, setTwChecked1] = useState(false);
  const [h2Checked1, setH2Checked1] = useState(false);


  const [iaOutOfMarks1, setIaOutOfMarks1] = useState('');
  const [iaPassingMarks1, setIaPassingMarks1] = useState('');
  const [iaResolution1, setIaResolution1] = useState('');

  // State for Sub-box 3 (Second box)
  const [eseChecked2, setEseChecked2] = useState(false);
  const [prChecked2, setPrChecked2] = useState(false);
  const [orChecked2, setOrChecked2] = useState(false);

  const [eseOutOfMarks2, setEseOutOfMarks2] = useState('');
  const [esePassingMarks2, setEsePassingMarks2] = useState('');
  const [eseResolution2, setEseResolution2] = useState('');

  // State for Sub-box 4 (Second box)
  const [iaChecked2, setIaChecked2] = useState(false);
  const [twChecked2, setTwChecked2] = useState(false);

  const [iaOutOfMarks2, setIaOutOfMarks2] = useState('');
  const [iaPassingMarks2, setIaPassingMarks2] = useState('');
  const [iaResolution2, setIaResolution2] = useState('');

  // State for Overall Passing Criteria
  const [overallPassingCriteria1, setOverallPassingCriteria1] = useState('');
  const [overallPassingCriteria2, setOverallPassingCriteria2] = useState('');

  const handleData = (data) => {
    console.log('Received data from Child Input Component',data.subjectName);
    setData(data);
  };


  const validateBoxes = () => {
    const box1Filled = eseChecked1 || prChecked1 || orChecked1 || eseOutOfMarks1 || esePassingMarks1 || eseResolution1;
    const box2Filled = iaChecked1 || twChecked1 || iaOutOfMarks1 || iaPassingMarks1 || iaResolution1;
    const box3Filled = eseChecked2 || prChecked2 || orChecked2 || eseOutOfMarks2 || esePassingMarks2 || eseResolution2;
    const box4Filled = iaChecked2 || twChecked2 || iaOutOfMarks2 || iaPassingMarks2 || iaResolution2;

    return (box1Filled && box2Filled) || (box3Filled && box4Filled);
  };

  const handleSave = async () => {
    // Validate input
    if (!validateBoxes()) {
      toast.error('Please fill in the required fields!', {
        position: 'top-right',
        autoClose: 2500,
        theme: 'colored',
        newestOnTop: true,
      });
      return;
    }
  
    // Prepare the data to be saved
    const subjectData = {
      eseChecked1,
      prChecked1,
      orChecked1,
      eseOutOfMarks1,
      esePassingMarks1,
      eseResolution1,
      iaChecked1,
      twChecked1,
      iaOutOfMarks1,
      iaPassingMarks1,
      iaResolution1,
    
      subjectName: data.subjectName       
    };
  
    try {
      const response = await window.api.invoke('save-subject',subjectData);
  
      if (response === "Success") {
        toast.success('Subject updated successfully!', {
          position: 'top-right',
          autoClose: 2500,
          theme: 'colored',
          newestOnTop: true,
        });
        setShowGrid(false)

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
  
    // Close the popup after saving
    setShowGrid(false);
  };
  

  return (
    <>
                          <ToastContainer position="top-right" autoClose={2500} newestOnTop pauseOnHover={false} />

      <FormInputs setShowGrid={setShowGrid} handleData={handleData} />

      {showGrid && (

        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full h-[80vh] overflow-y-auto">
            <div className="flex">
              <div className="w-1/2 pr-4">
                {/* Box 1 */}
                <input
                            type="checkbox"
                            checked={h1Checked1}
                            onChange={() => setH1Checked1(!h1Checked1)}
                            className="mr-2"
                          />
                          <label>H1</label>
                <div  className="border border-gray-300 p-4 rounded-lg mb-4">
             
                  <div className="flex flex-col">

                    {/* Sub-box 1 */}
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={eseChecked1}
                            onChange={() => setEseChecked1(!eseChecked1)}
                            className="mr-2"
                          />
                          <label>ESE</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={prChecked1}
                            onChange={() => setPrChecked1(!prChecked1)}
                            className="mr-2"
                          />
                          <label>PR</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={orChecked1}
                            onChange={() => setOrChecked1(!orChecked1)}
                            className="mr-2"
                          />
                          <label>OR</label>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
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
                    {/* Overall Passing Criteria */}
                    <div className="mt-4">
                      <label className="block mb-1">Overall Passing Criteria</label>
                      <input
                        type="text"
                        value={overallPassingCriteria1}
                        onChange={(e) => setOverallPassingCriteria1(e.target.value)}
                        className="w-full border border-gray-300 p-1 rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Box 2 */}
                <input
                            type="checkbox"
                            checked={h2Checked1}
                            onChange={() => setH1Checked1(!h2Checked1)}
                            className="mr-2"
                          />
                          <label>H2</label>
                <div  className="border  border-gray-300 p-4 rounded-lg">
                  <div className="flex flex-col">
                    {/* Sub-box 3 */}
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={eseChecked2}
                            onChange={() => setEseChecked2(!eseChecked2)}
                            className="mr-2"
                          />
                          <label>ESE</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={prChecked2}
                            onChange={() => setPrChecked2(!prChecked2)}
                            className="mr-2"
                          />
                          <label>PR</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={orChecked2}
                            onChange={() => setOrChecked2(!orChecked2)}
                            className="mr-2"
                          />
                          <label>OR</label>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <label className="block mb-1">Out of Marks</label>
                        <input
                          type="text"
                          value={eseOutOfMarks2}
                          onChange={(e) => setEseOutOfMarks2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Passing Marks</label>
                        <input
                          type="text"
                          value={esePassingMarks2}
                          onChange={(e) => setEsePassingMarks2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Resolution</label>
                        <input
                          type="text"
                          value={eseResolution2}
                          onChange={(e) => setEseResolution2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                      </div>
                    </div>
                    {/* Overall Passing Criteria */}
                    <div className="mt-4">
                      <label className="block mb-1">Overall Passing Criteria</label>
                      <input
                        type="text"
                        value={overallPassingCriteria2}
                        onChange={(e) => setOverallPassingCriteria2(e.target.value)}
                        className="w-full border border-gray-300 p-1 rounded"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Box 3 (Second Half) */}
              <div className="w-1/2 pl-4">
                {/* Box 3 */}
                <div className="border border-gray-300 p-4 rounded-lg mb-4">
                  <div className="flex flex-col">
                    {/* Sub-box 2 */}
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={iaChecked1}
                            onChange={() => setIaChecked1(!iaChecked1)}
                            className="mr-2"
                          />
                          <label>IA</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={twChecked1}
                            onChange={() => setTwChecked1(!twChecked1)}
                            className="mr-2"
                          />
                          <label>TW</label>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
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
                    {/* Overall Passing Criteria */}
                   
                  </div>
                </div>

                {/* Box 4 */}
                <div className="mt-32 border  border-gray-300 p-4 rounded-lg">
                  <div className="flex flex-col">
                    {/* Sub-box 4 */}
                    <div className="flex mb-4">
                      <div className="flex-1 pr-2">
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={iaChecked2}
                            onChange={() => setIaChecked2(!iaChecked2)}
                            className="mr-2"
                          />
                          <label>IA</label>
                        </div>
                        <div className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            checked={twChecked2}
                            onChange={() => setTwChecked2(!twChecked2)}
                            className="mr-2"
                          />
                          <label>TW</label>
                        </div>
                      </div>
                      <div className="flex-1 px-2">
                        <label className="block mb-1">Out of Marks</label>
                        <input
                          type="text"
                          value={iaOutOfMarks2}
                          onChange={(e) => setIaOutOfMarks2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Passing Marks</label>
                        <input
                          type="text"
                          value={iaPassingMarks2}
                          onChange={(e) => setIaPassingMarks2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                        <label className="block mb-1 mt-2">Resolution</label>
                        <input
                          type="text"
                          value={iaResolution2}
                          onChange={(e) => setIaResolution2(e.target.value)}
                          className="w-full border border-gray-300 p-1 rounded"
                        />
                      </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={()=>setShowGrid(false)}
                className="bg-red-500 ml-2 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SubjectMaster;
