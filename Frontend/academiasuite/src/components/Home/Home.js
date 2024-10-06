import React, { useEffect, useState } from "react";
import "../../assets/styles/home.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';


const Home = () => {
  const [studentsCount, setstudentsCount] = useState(0);

  const getAllStudents = async () => {
    const count = await window.api.invoke("student-count");
    setstudentsCount(count);
    console.log(studentsCount);
  };
  useEffect(() => {
    getAllStudents();
  }, []);
  return (
    <div className="home-container">
      <div>
        <div className="home-container flex justify-between">
          <div className="mini-container bg-white">Home</div>
          <div className="mini-container bg-white">Home</div>
          <div className="mini-container p-16 total-no-container text-white">
            <h1 className="text-2xl">
              Total Number<br></br>Of Student REG.
            </h1>
            <h1 className="text-7xl flex justify-center">{studentsCount}</h1>
          </div>
        </div>
        <div className="w-full home-container flex justify-between gap-5">
          <div className="bg-white rounded-[1rem] p-2 w-[60%]">
            <p>Student Admission</p>
            <table className="w-full ml-0">
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>This Year</th>
                  <th>Last Year</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Computer Engineering</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Mechanical Engineering</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
                <tr>
                  <td>Civil Engineering</td>
                  <td>0</td>
                  <td>0</td>
                  <td>0</td>
                </tr>
              </tbody>
            </table>
          </div>
            {/* college info */}
          <div className="bg-white w-[40%] rounded-[1rem]">
            <div className="flex justify-center items-center gap-3 p-2"> 
                <img src="/assets/images/college-logo.jpg" alt="College Logo" style={{height: '3rem'}}/>
                <h1 className="text-2xl font-bold text-slate-500">G.M.V.I.T</h1>
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex items-center gap-3 p-2 ml-4">
                    <LocationOnIcon
                     style={{
                        color: "2B5ED6",
                        fontSize: "2rem",
                        backgroundColor: "E9F3FD",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    />
                    <h2 className="text-xl text-slate-700">AT- Tala, Raigad, Maharashtra, IN</h2>
                </div>
                <div className="flex items-center gap-3 p-2 ml-4">
                    <EmailIcon 
                     style={{
                        color: "2B5ED6",
                        fontSize: "2rem",
                        backgroundColor: "E9F3FD",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    />
                    <h2 className="text-xl text-slate-700">admin.gmvit@gmail.com</h2>
                </div>
                <div className="flex items-center gap-3 p-2 ml-4">
                    <LocalPhoneIcon
                     style={{
                        color: "2B5ED6",
                        fontSize: "2rem",
                        backgroundColor: "E9F3FD",
                        borderRadius: "5px",
                        padding: "2px",
                      }}
                    />
                    <h2 className="text-xl text-slate-700">9200000000</h2>
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
