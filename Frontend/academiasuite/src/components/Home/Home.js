import React, { useState } from "react";
import '../../assets/styles/home.css'

const Home = () => {
    return (

        <div className="home-container">
            <div className="home-container flex justify-around">
                <div className="mini-container bg-white">Home</div>
                <div className="mini-container bg-white">Home</div>
                <div className="mini-container bg-blue-300 text-white">
                    <h2 className="text-center font-extrabold text-2xl">
                        Total Number<br></br>Of Student REG.
                    </h2>
                    <p className="text-6xl">0</p>
                </div>
            </div>
        </div>
    )
}

export default Home;