import React, { useState } from 'react';
import { useEffect } from 'react';
import "./index.css";
import { HexColorPicker } from "react-colorful";
import { v4 as uuid } from 'uuid';
import { AddNewHabit } from './addHabbits';

export const Habit = ({ itemSet, setItemSet, habits, setHabits }) => {


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
                    class: "basicClass"
                }
            ])
        } else {
            if (itemSet[itemSet.length - 1].id !== `${dayData}`) {
                setItemSet(currentList => [...itemSet, {
                    id: `${dayData}`,
                    class: "basicClass"
                }])
            } else {
                alert("You already have tracked your habit!")
            }
        }



    }


    const [color, setColor] = useState("#aabbcc")





    return (
        <>
            <div className='habitNames'>
                {habits.length !== 0 ?
                    habits.map((item, index) => (
                        <div key={uuid()} className='habitNameBlocks' id={item.name} index={index}>
                            <div>{item.name}</div>
                        </div>
                    ))
                    : <div className='habitAddButton' onClick={() => showAdder()}>
                        <div className='text'>+</div>
                    </div>}

            </div>
            <div className='habitTrack'>
                <button className='button' onClick={() => trackTheHabbit()}>
                    Track the habit
                </button>
                {showHabitAdder && <AddNewHabit
                    setShowHabitAdder={setShowHabitAdder}

                />}

            </div>
        </>
    )


}