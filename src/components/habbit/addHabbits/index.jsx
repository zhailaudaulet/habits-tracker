import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";

export const  AddNewHabit = () => {


    const [color, setColor] = useState("#aabbcc")
    return (
        <>
            <div className='addHabits'>
                <button>Add habbit</button>
                <HexColorPicker color={color} onChange={(value) => setColor(value)} />
            </div>
        </>
    )


}