import './App.css';
import { Heatmap } from './components/heatmap/main';
import { Navbar } from './components/navbar/index';
import { Habit } from './components/habbit/index'
import { useEffect, useState } from 'react';


function App() {

  const [itemSet, setItemSet] = useState("nothing")
  const [track, setTrack] = useState(1)

  const getDataFromStorage = () => {

    if (localStorage.getItem('trackedHabits') != null) {
      setItemSet(JSON.parse(localStorage.getItem('trackedHabits')))
      console.log(itemSet);
    } else {
      console.log("no such Item");
    }
  }
  useEffect(() => { getDataFromStorage() }, [])

  const postDataToStorage = (itemSet) => {
    if (localStorage.getItem('trackedHabits') != null) {
      localStorage.setItem(`${itemSet}`)
    }
  }

  return (
    <div className='page'>
      <Navbar />
      <div style={{ "position": "absolute" }}> hello world </div>
      <Heatmap />
      <Habit
        itemSet={itemSet}
        setItemSet={setItemSet}
        setTrack={setTrack}
        postDataToStorage={postDataToStorage}
      />


    </div>
  );
}

export default App;
