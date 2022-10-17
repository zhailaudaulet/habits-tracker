import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";

export const Habit = () => {

    const trackTheHabbit = () => {
        let today = new Date()
        let dayData = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
        console.log(document.getElementById(dayData).classList.add("basicClass"))
    }
    const [color, setColor] = useState("#aabbcc")


    return (
        <>
            <div style={{ height: "300px", width: "100vw", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <button style={{ height: "3vh" }} onClick={() => trackTheHabbit()}>
                    Track the habit
                </button>
                <button style={{ height: "3vh" }} onClick={() => trackTheHabbit()}>
                    Add new habbit
                </button>
                <HexColorPicker color={color} onChange={setColor} />
            </div>
        </>
    )


}