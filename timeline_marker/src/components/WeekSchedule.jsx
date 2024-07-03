import DayHeader from './DayHeader';
import DayDues from './DayDues';
import {Timeline, TimelineAxis} from './Timeline';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

export default function WeekSchedule(props) {
    const [weekData, setWeekData] = useState([]);
    
    useEffect(() => {
        setWeekData([
            {
                date: "06/30",
                day: "Sunday",
                timeline_records:[
                    {
                        start: 21,
                        end: 22.5,
                        note:"Voice dev",
                    }
                ],
                timeline_notes:[
                    {
                        start: 21,
                        end: 22.5,
                        note:"Voice dev",
                    }
                ],
            },
            {
                date: "07/01",
                day: "Monday",
                timeline_records:[],
                timeline_notes:[],
            },
            {
                date: "07/02",
                day: "Tuesday",
                timeline_records:[],
                timeline_notes:[],
            },
            {
                date: "07/03",
                day: "Wednesday",
                timeline_records:[],
                timeline_notes:[],
            },
            {
                date: "07/04",
                day: "Thursday",
                timeline_records:[],
                timeline_notes:[],
            },
            {
                date: "07/05",
                day: "Friday",
                timeline_records:[],
                timeline_notes:[],
            },
            {
                date: "07/06",
                day: "Saturday",
                timeline_records:[],
                timeline_notes:[],
            },
        ])
    }, [])

    const addRecord = (dayIndex) => {
        setWeekData(o => {
            let newData = JSON.parse(JSON.stringify(o));
            newData[dayIndex].timeline_records = [...newData[dayIndex].timeline_records, "new record"];
            return newData;
        })
    }

    const addNote = (dayIndex, start, end, note) => {
        setWeekData(o => {
            let newData = JSON.parse(JSON.stringify(o));
            newData[dayIndex].timeline_notes = [...newData[dayIndex].timeline_notes, {
                start:start, end:end, note:note
            }];
            return newData;
        })
    }

    return (<div className="week-schedule">
        <div className='week-row' style={{paddingLeft:"30px"}}>
            <div className="flex-container-row">
                {weekData.map((e, i) => <DayHeader key={i} {...e}/>)}
            </div>
        </div>
        <div className='week-row' style={{paddingLeft:"30px"}}>
            <div className="flex-container-row">
                {weekData.map((e, i)=> <DayDues key={i} {...e}/>)}
            </div>
        </div>
        <div>
            <div className='week-row'>
                <TimelineAxis/>
                <div className="flex-container-row">
                    {weekData.map((e, i)=> <Timeline key={i} {...e} dayIndex={i} addRecord={addRecord} addNote={addNote}/>)}
                </div>
            </div>
        </div>
    </div>)
}