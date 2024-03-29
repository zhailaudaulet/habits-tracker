import React, { useState } from 'react';
import { useEffect } from 'react';
import "./heatmap.css";
import { v4 as uuid } from 'uuid';

export const Heatmap = ({ dataSetting, itemSet }) => {

    const [dayList, setDayList] = useState([])




    /**
     * ChupapiMunyanya
     */
    const getDaysArray = () => {
        let daylist = [[], [], [], [], [], [], [], [], [], [], [], [], []];
        const today = new Date()
        let endday = new Date();
        const currentYear = today.getFullYear()
        endday.setFullYear(currentYear - 1)

        for (let i = 0; i < endday.getDay() - 1; i++) {
            daylist[0].push(
                {
                    data:
                    {
                        date: "pusto", //1-31
                        day: "pusto", //0-6
                        year: "pusto" //?

                    },
                    fill: "empty-box"
                }
            )

        }
        let weekn = 1
        let countMonthIndex = 0
        while (!(today.getFullYear() === endday.getFullYear() && today.getMonth() === endday.getMonth() && today.getDate() === endday.getDate())) {
            if (endday.getDate() === 1 && endday.getDay() !== 0) {
                for (let i = 0; i < endday.getDay(); i++) {
                    daylist[countMonthIndex].push(
                        {
                            data:
                            {
                                date: "pusto", //1-31
                                day: "pusto", //0-6
                                year: "pusto", //?
                                month: "empty"

                            },
                            fill: "empty-box"
                        }
                    )

                }
            }

            daylist[countMonthIndex].push(
                {
                    data:
                    {
                        date: endday.getDate(), //1-31
                        day: endday.getDay(), //0-6
                        year: endday.getFullYear(), //?
                        month: endday.getMonth(), 
                    },
                    fill: "standard-box",
                    weekn: weekn
                }
            )


            endday.setDate(endday.getDate() + 1)
            if (endday.getDate() === 1) {
                countMonthIndex++
                if (endday.getDay() === 0) {
                    weekn = 0
                } else{
                    weekn = 1
                }
            }

            if (endday.getDay() === 0) {
                weekn++
            }

        }
        
        daylist[countMonthIndex].push(
            {
                data:
                {
                    date: endday.getDate(), //1-31
                    day: endday.getDay(), //0-6
                    year: endday.getFullYear(), //?
                    month: endday.getMonth(),
                },
                fill: "standard-box",
                weekn: weekn
            }
        )



        setDayList(daylist)
    }

    useEffect(() => {
        getDaysArray()
    },[])




    const showDataHM = (event) => {
        let x = 10 + document.getElementById(event.target.id).getBoundingClientRect().left;
        let y = document.getElementById(event.target.id).getBoundingClientRect().top - 20;
        if (event.target.id !== "pusto-empty-pusto" && event.target.id !== "pusto-undefined-pusto") {
            let info = document.getElementById("infoBox")
            info.style.left = `${x}px`
            info.style.top = `${y}px`
            info.textContent = `${event.target.id}`
            setTimeout(() => {
                info.style.display = "flex"
            }, 500)
        }
    }

    const hideDataHM = () => {
        let info = document.getElementById("infoBox")
        info.style.display = "none"
    }

    return (
        <div className='heatmap'>
            <div className='weeks'>
                <div>Sun</div>
                <div>Tue</div>
                <div>Thu</div>
                <div>Sat</div>

            </div>
            {dayList.map((monthArray, index) => (
                <div className='months' style={{width: monthArray[monthArray.length - 1].weekn * 22}} key={uuid()} month={index}>

                    {monthArray.map((item) => (
                        <div className={`${item.fill}`} key={uuid()} id={`${item.data.date}-${item.data.month}-${item.data.year}`} onMouseOver={showDataHM} onMouseOut={hideDataHM}>

                        </div>
                    ))}


                </div>

            ))}
            <div id='infoBox' className='infoBox' style={{ display: "none" }}>

            </div>
        </div>
    )


}