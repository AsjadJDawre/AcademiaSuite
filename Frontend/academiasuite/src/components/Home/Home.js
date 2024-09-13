import React, { useEffect, useState } from "react";
import '../../assets/styles/home.css'

const Home = () => {
    const [studentsCount, setstudentsCount] = useState(0)

    const getAllStudents=async()=>{
        const count = await window.api.invoke('student-count');
        setstudentsCount(count)
        console.log(studentsCount);

    }
    useEffect(() => {
        getAllStudents()
        
    }, [])
    return (

        <div className="home-container">
            <div className="home-container flex justify-around">
                <div className="mini-container bg-white">Home</div>
                <div className="mini-container bg-white">Home</div>
                <div className="mini-container bg-blue-300 text-white">
                    <h2 className="text-center font-extrabold text-2xl">
                        Total Number<br></br>Of Student REG.
                    </h2>
                    <p className="text-6xl">{studentsCount}</p>
                </div>
            </div>
        </div>
    )
}

export default Home;