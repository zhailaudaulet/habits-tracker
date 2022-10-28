import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";

export const AddNewHabit = () => {


    const [color, setColor] = useState("#aabbcc")
    return (
        <>
            <button>Add habbit</button>
            <div className='addHabits'>
                <button className='closeButton'>x</button>
                <div className='topText'>Add a new habbit</div>

                <div className='regularText'>Enter the title: </div>
                <input type={"text"} placeholder={"Type the name of the habit"} className='addInput' />

                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <div className='regularText'>Choose the color: </div>
                    <button className='colorButton' style={{backgroundColor:{color}}}></button>
                </div>
                <HexColorPicker color={color} onChange={(value) => setColor(value)}  />
            </div>
        </>
    )


}