import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";
import { v4 as uuid } from 'uuid';
import { AddNewHabit } from './addHabbits';

export const Habit = ({ itemSet, setItemSet, habits, setHabits, color, setColor, dataSetting, name, setName }) => {


    const [showHabitAdder, setShowHabitAdder] = useState(false)
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




    const handleClickBox = (color, name) => {
        setColor(color)
        setName(name)

    }



    return (
        <>
            <div className='habitNames'>

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
                <button className='button' onClick={() => trackTheHabbit()}>
                    Track the habit
                </button>
                {showHabitAdder && <AddNewHabit
                    habits={habits}
                    setHabits={setHabits}
                    setShowHabitAdder={setShowHabitAdder}

                />}

            </div>
        </>
    )


}