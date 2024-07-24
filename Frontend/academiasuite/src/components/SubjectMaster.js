import React, { useState, useEffect } from 'react';
import '../SubjectMaster.css';
import FormInputs from './FormInputs';

const SubjectMaster = () => {
 
  const [showGrid, setShowGrid] = useState(false);
  const [data, setData] = useState([]);

  

  useEffect(() => {
    const loadData = async () => {
      const fetchedData = await window.api.invoke('fetch-data');
      setData(fetchedData);
    };

    loadData();
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      setShowGrid(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  

  return (
<>

<FormInputs/>
      {showGrid && (
        <div className="grid-view">
          <h2>Marks and Passing Criteria</h2>
          <table>
            <thead>
              <tr>
                <th>pattern</th>
                <th>subject</th>
                <th>branch </th>
                <th>course-credit</th>
                <th>Overall Passing Criteria</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.pattern}</td>
                  <td>{item.subject}</td>
                  <td>{item.branch}</td>
                  <td>{item.course_credit}</td>
                  <td>{item.overall_criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

  </>
  );

};

export default SubjectMaster;
