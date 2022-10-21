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
            <div className='addHabits'>
                <HexColorPicker color={color} onChange={(value) => setColor(value)} />
            </div>
        </>
    )


}