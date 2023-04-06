import './App.css';
import { Heatmap } from './components/heatmap/main';
import { Navbar } from './components/navbar/index';
import { Habit } from './components/habbit/index'
import {Login} from "./welcome/login";
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route, Link, Navigate} from 'react-router-dom';
import {WelcomePage} from "./welcome/WelcomePage";
import axios from "axios";


function App() {
  const [authorized, setAuthorized] = useState(false)
  const tokenCheck = () => {
    if (localStorage.getItem('token') != null){
      const token = localStorage.getItem('token');
      const parsedToken = JSON.parse(atob(token.split(".")[1]));
      if (parsedToken.exp * 1000 < Date.now()){

        setAuthorized(false);
        localStorage.removeItem('token')
      } else{
        setAuthorized(true);
      }
    } else{
      setAuthorized(false)
    }
  }

  useEffect(() =>{
    tokenCheck()
  })

  const [newlo, setNewlo] = useState([])

  const getHabits = async () => {
    const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXVsZXQuemhhaWxhdUBudS5lZHUua3oiLCJpYXQiOjE2ODA3ODQyMDUsImV4cCI6MTY4MDg3MDYwNX0.6M7OrgYoog-CDAyOJiAizj_cGkq7uOvJLyJDKqJIBMw"
    const response = await fetch("http://localhost:8080/api/v1/get-habits",{ 'Authorization': `Bearer ${token}` })
    if (!response.ok){
      throw new Error("Data could not be fethced!")
    } else{
      return response.json()
    }
  }

  useEffect(() => {
    getHabits().then((res) => {
      setNewlo(res);
    }).catch((e) => {
      console.log(e.message)
    })
  },[])

  useEffect(() => {
    console.log(newlo)
  },[newlo])

  const [log, setLog] = useState(true)
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
      return []
    }
  })

  const [track, setTrack] = useState(1)
  const [color, setColor] = useState("#cfcbd1")
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

  const [sec, setSec] = useState(false)

  return (
      <div className='page'>
        <Navbar log = {log}
                setLog = {setLog}
                setSec={setSec}
                sec={sec}
                authorized={authorized}
                setAuthorized={setAuthorized}/>
        <Router>
          <Routes>
            <Route exact path = "/heatmap" element={
              <>
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
              </>
            }>
            </Route>


            <Route exact path = "/" element={
              <>
                {authorized ? <Navigate to={"/heatmap"} /> : <WelcomePage/>}
                </>
            }>

            </Route>

          </Routes>


        </Router>

      </div>


  );
}

export default App;
