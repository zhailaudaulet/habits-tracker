import React from 'react';
import { useEffect } from 'react';
import "./heatmap.css";
import { v4 as uuid } from 'uuid';

export const Heatmap = () => {

    const getDaysArray = () => {
        var daylist = [[], [], [], [], [], [], [], [], [], [], [], [], []]
        const today = new Date()
        var endday = new Date()
        const currentYear = today.getFullYear()
        endday.setFullYear(currentYear - 1)
        console.log(endday.getDay());
        for (let i = 0; i < endday.getDay(); i++) {
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
        let countMonthIndex = 0
        while (today.getFullYear() !== endday.getFullYear() || today.getMonth() !== endday.getMonth() || today.getDate() >= endday.getDate()) {
            // console.log("I work")
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
                        month: endday.getMonth()

                    },
                    fill: "standard-box"
                }
            )


            endday.setDate(endday.getDate() + 1)
            if (endday.getDate() === 1) {
                countMonthIndex++
            }

        }
        console.log(daylist)
        return daylist
    }
    let daylist = getDaysArray()


    return (
        <div className='heatmap'>
            <div className='weeks'>
                <div>Sun</div>
                <div>Tue</div>
                <div>Thu</div>
                <div>Sat</div>
           
            </div>
            {daylist.map((monthArray, index) => (
                <div className='months' key={uuid()} month={index}>

                    {monthArray.map((item) => (
                        <div className={`${item.fill}`} key={uuid()} id={`${item.data.date}-${item.data.month}-${item.data.year}`}>

                        </div>
                    ))}

                </div>

            ))}
        </div>
    )


}