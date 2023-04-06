
import "./index.css";
import React, {useState} from "react";
import {WelcomePage} from "../../welcome/WelcomePage";
import {Login} from "../../welcome/login";

export const Navbar = ({log, setLog, setSec, sec, authorized, setAuthorized}) => {


    const handleLogin = () => {
        setSec(!sec)
    }

    return (
        <>
        <div className='navbar'>
            <div> Habit tracker </div>
        </div>
            {!authorized && <button className={"logBut"} onClick={handleLogin}>Login/Register</button>}
            {sec && <Login sec = {sec}
                           setSec={setSec}
                           authorized={authorized}
                           setAuthorized={setAuthorized}/>}
        </>
    )


}