import { useEffect, useState } from "react";


export function TimelineAxis(props) {
    return(
        <div>
            {Array(48).fill(0).map((e,i)=> <div key={i} className="timeline-grid" style={{width:30}}>{i%2===0?i/2:""}</div>)}
        </div>
    )
}

export function TimelineNotePiece(props) {
    return (<div className="timeline-note-piece" style={{top:props.top}}>

    </div>)
}

export function Timeline(props) {
    const [dt, setDt] = useState(new Date())
    let currentHeight = (dt.getHours() + (dt.getMinutes() / 60) ) / 24 * 100;

    useEffect(() => {
        setInterval(() => {
            setDt(new Date());
            console.log("date reset");
        }, 5 * 60 * 1000)
    }, [])    
        
    return (
        <div className="timeline">
            <div className="timeline-background">
                {Array(48).fill(0).map((e,i)=> <div key={i} className="timeline-grid"></div>)}
            </div>
            <div className="current-line" style={{height:currentHeight + "%"}} />
            <div className="timeline-notes">
                {props.timeline_notes?.map((e,i) => <TimelineNotePiece/>)}
            </div>
        </div>
    )
}