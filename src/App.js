import './App.css';
import { Heatmap } from './components/heatmap/main';
import { Navbar } from './components/navbar/index';
import { Habit } from './components/habbit/index'
import { useEffect, useState } from 'react';


function App() {

  const [itemSet, setItemSet] = useState(() => {
    if (localStorage.getItem('trackedHabits') != null) {
      const somevar = JSON.parse(localStorage.getItem('trackedHabits'))
      return somevar
    } else {
      return []
    }
  })

  // getting names of Habbits and their classes

  const [habits, setHabits] = useState(() => {
    if (localStorage.getItem('habitNames') != null) {
      return JSON.parse(localStorage.getItem('habitNames'))
    } else {
      return [{ name: "gym", color: "#da00ec" }]
    }
  })

  const [track, setTrack] = useState(1)

  const [color, setColor] = useState("#aabbcc")
  const [name, setName] = useState('')

  // Setting colors of squares using data form local storage
  const dataSetting = () => {
    for (let i = 0; i < itemSet.length; i++) {
      const element = itemSet[i]
      document.getElementById(itemSet[i].id).style.backgroundColor = `${itemSet[i].color}`
    }
  }

  // Launching it on first load
  useEffect(() => {
    setTimeout(() => {
      dataSetting();
    }, "300")


  }, [itemSet])


  // function that gets data from local storage
  const getDataFromStorage = () => {

    if (localStorage.getItem('trackedHabits') != null) {
      setItemSet(JSON.parse(localStorage.getItem('trackedHabits')))
      console.log(itemSet);
    } else {
      console.log("no such Item");
    }
  }

  // setting data to local storage whenever itemSet and habits change
  useEffect(() => {
    localStorage.setItem("trackedHabits", JSON.stringify(itemSet))
  }, [itemSet])

  useEffect(() => {
    localStorage.setItem("habitNames", JSON.stringify(habits))
  }, [habits])

  return (
    <div className='page'>
      <Navbar />
      <div style={{ "position": "absolute" }}> Habit tracker </div>
      <Heatmap
        dataSetting={dataSetting}
        itemSet={itemSet}
      />
      <Habit
        name={name}
        setName={setName}
        color={color}
        setColor={setColor}
        itemSet={itemSet}
        setItemSet={setItemSet}
        setTrack={setTrack}
        habits={habits}
        setHabits={setHabits}
        dataSetting={dataSetting}
      />


    </div>
  );
}

export default App;
