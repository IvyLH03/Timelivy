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
                timeline_record:[],
                timeline_notes:["a"],
            },
            {
                date: "07/01",
                day: "Monday",
                timeline_record:[],
                timeline_notes:[],
            },
            {
                date: "07/02",
                day: "Tuesday",
                timeline_record:[],
                timeline_notes:[],
            },
            {
                date: "07/03",
                day: "Wednesday",
                timeline_record:[],
                timeline_notes:[],
            },
            {
                date: "07/04",
                day: "Thursday",
                timeline_record:[],
                timeline_notes:[],
            },
            {
                date: "07/05",
                day: "Friday",
                timeline_record:[],
                timeline_notes:[],
            },
            {
                date: "07/06",
                day: "Saturday",
                timeline_record:[],
                timeline_notes:[],
            },
        ])
    }, [])

    return (<>
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
        <div className='week-row' style={{paddingLeft:"30px"}}>
            {weekData.map((e, i) =><div className='add-record'><Button variant="outline-secondary">Add Record</Button></div>)}
        </div>
        <div>
            <div className='week-row'>
                <TimelineAxis/>
                <div className="flex-container-row">
                    {weekData.map((e, i)=> <Timeline key={i} {...e}/>)}
                </div>
            </div>
        </div>
    </>)
}