import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";
import { v4 as uuid } from 'uuid';
export const Habit = () => {

    const trackTheHabbit = () => {
        let today = new Date()
        let dayData = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
        document.getElementById(dayData).classList.add("basicClass")
    }
    const [color, setColor] = useState("#aabbcc")

    let habitList = {
        
    }

    return (
        <>
            <div className='habitTrack'>
                <button style={{ height: "3vh" }} onClick={() => trackTheHabbit()}>
                    Track the habit
                </button>
                <button style={{ height: "3vh" }} onClick={() => trackTheHabbit()}>
                    Add new habbit
                </button>
            </div>
        </>
    )


}