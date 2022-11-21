import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";
import { v4 as uuid } from 'uuid';
import { AddNewHabit } from './addHabbits';

export const Habit = ({ itemSet, setItemSet, habits, setHabits, color, setColor, dataSetting, name, setName }) => {


    const [showHabitAdder, setShowHabitAdder] = useState(false)
    const [showBtn, setShowBtn] = useState(false)
    const showAdder = () => {
        setShowHabitAdder(current => !current)
    }


    const trackTheHabbit = () => {
        let today = new Date()
        let dayData = `${today.getDate()}-${today.getMonth()}-${today.getFullYear()}`
        // document.getElementById(dayData).classList.add("basicClass")

        if (itemSet.length === 0) {

            setItemSet([
                {
                    id: `${dayData}`,
                    color: `${color}`,
                    name: `${name}`
                }
            ])
        } else {
            let count = 0
            for (let i = 0; i < itemSet.length; i++) {
                if (itemSet[i].id === `${dayData}` && itemSet[i].color === color) {
                    count++
                    setShowBtn(false)
                    break
                }
            }
            if (count !== 1) {
                setItemSet(currentList => [...itemSet, {
                    id: `${dayData}`,
                    color: `${color}`,
                    name: `${name}`
                }])
            } else {
                alert("You already have tracked your habit!")
            }
        }

    }




    const [selectedColor, setSelectedColor] = useState(color)

    const handleClickBox = (colorr, name) => {
        setColor(colorr)
        setName(name)
        setShowBtn(true)
        setSelectedColor(colorr)
    }


    useEffect(() => {
        setTimeout(() => {
            for (let i = 0; i < itemSet.length; i++) {

                if (itemSet[i].color === selectedColor) {
                    document.getElementById(`${itemSet[i].id}`).style.backgroundColor = `${selectedColor}`
                }
            }
        }, "200")
    }, [selectedColor])


    const handleShowEverything = () => {
        dataSetting()
        // setShowBtn(false)
        document.getElementById('habitNames').style.backgroundColor = "rgb(170, 187, 204)";
    }

    return (
        <>
            <div className='habitNames' id='habitNames' style={{ backgroundColor: `${color}` }} onClick={() => handleShowEverything()}>

                {habits.length !== 0 ?
                    <>
                        {habits.map((item, index) => (
                            <div key={uuid()} className='habitNameBlocks' id={item.name} index={index} style={{ backgroundColor: `${item.color}` }} onClick={() => handleClickBox(item.color, item.name)}>
                                <div>{item.name}</div>
                            </div>
                        ))}
                        <div className='habitAddButton' onClick={() => showAdder()}>
                            <div className='text'>+</div>
                        </div>
                    </>

                    : <div className='habitAddButton' onClick={() => showAdder()}>
                        <div className='text'>+</div>
                    </div>
                }

            </div>
            <div className='habitTrack'>
                {showBtn &&
                    <button className='button' style={{border:`5px solid ${selectedColor}`}} onClick={() => trackTheHabbit()}>
                        Track the habit
                    </button>
                }
                {showHabitAdder && <AddNewHabit
                    itemSet={itemSet}
                    habits={habits}
                    setHabits={setHabits}
                    setShowHabitAdder={setShowHabitAdder}

                />}

            </div>
        </>
    )


}