import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";

export const AddNewHabit = ({setShowHabitAdder}) => {

    const closeAdder = () => {
        setShowHabitAdder(current => !current)
    }

    const [color, setColor] = useState("#aabbcc")
    
    useEffect(() => {
        document.getElementById("colorButton").style.backgroundColor = color
    }, [color])
    return (
        <>
            <button>Add habbit</button>
            <div className='addHabits'>
                <button className='closeButton' onClick={() => closeAdder()}>x</button>
                <div className='topText'>Add a new habbit</div>

                <div className='regularText'>Enter the title: </div>
                <input type={"text"} placeholder={"Type the name of the habit"} className='addInput' onChange={(event) => console.log(event.target.value)}/>

                <div style={{display:"flex", flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
                    <div className='regularText'>Choose the color: </div>
                    <button className='colorButton' id='colorButton'></button>
                </div>
                <HexColorPicker color={color} onChange={(value) => setColor(value)}  />
            </div>
        </>
    )


}