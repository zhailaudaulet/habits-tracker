import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";

export const AddNewHabit = ({ setShowHabitAdder, habits, setHabits, itemSet }) => {

    const closeAdder = () => {
        setShowHabitAdder(current => !current)
    }

    const [inputVal, setInputVal] = useState('')
    const [color, setColor] = useState("#aabbcc")

    useEffect(() => {
        document.getElementById("colorButton").style.backgroundColor = color
    }, [color])

    const [showPicker, setShowPicker] = useState(false)
    const colorPickerVisible = () => {
        setShowPicker(current => !current)
    }

    const handleAddHabit = () => {
        let counter = 0


        let naming = ''
        if (inputVal.length > 12) {
            naming += inputVal[0]
            for (let i = 0; i < inputVal.length; i++) {
                if (inputVal[i] === " ") {
                    naming += inputVal[i + 1]
                }
            }
        } else {
            naming += inputVal
        }

        for (let i = 0; i < itemSet.length; i++) {
            if (itemSet[i].name !== naming) {
                counter++
            }
        }
        console.log(itemSet);
        console.log(counter);
        if (counter > 0) {

            if (habits.length === 0) {

                setHabits([
                    {
                        name: `${naming}`,
                        color: `${color}`
                    }
                ])
            } else {

                setHabits(currentList => [...habits, {
                    name: `${naming}`,
                    color: `${color}`
                }])

            }
        } else {
            alert("You already have tracker with this naming!")
        }


    }

    return (
        <>
            <button>Add habbit</button>
            <div className='addHabits'>
                <button className='closeButton' onClick={() => closeAdder()}>x</button>
                <div className='topText'>Add a new habbit</div>

                <div className='regularText'>Enter the title: </div>
                <input type={"text"} placeholder={"Type the name of the habit"} className='addInput' onChange={(event) => setInputVal(event.target.value)} />

                <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                    <div className='regularText'>Choose the color: </div>
                    <button className='colorButton' id='colorButton' onClick={() => colorPickerVisible()}></button>
                </div>
                {showPicker && <HexColorPicker className='colorPicker' color={color} onChange={(value) => setColor(value)} />}
                <button className='theAddButton' onClick={() => handleAddHabit()}>Add</button>
            </div>
        </>
    )


}