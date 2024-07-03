import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

export function TimelineAxis(props) {
    return(
        <div>
            {Array(25).fill(0).map((e,i)=> <div key={i} className="timeline-grid" style={{width:30}}>{i>0?i-1:""}</div>)}
        </div>
    )
}

export function TimelineNotePiece(props) {
    return (<div className="timeline-note-piece" style={{top:props.top, height:props.height}}>
        <p>{props.note}</p>
    </div>)
}

export function TimelineRecordPiece(props) {
    return (<div className="timeline-record-piece" style={{top:props.top, height:props.height}}>
        <p>{props.note}</p>
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
            
            <div className="timeline-btn-row">
                        <Button className='add-note' variant="outline-secondary" onClick={() => props.addRecord()}>+Note</Button>
                        <Button className='add-record' variant="outline-secondary" onClick={() => props.addRecord()}>+Record</Button>
                    </div>
            <div className="timeline">   
                <div className="timeline-background">
                    {Array(24).fill(0).map((e,i)=> <div key={i} className="timeline-grid"></div>)}
                </div>
                <div className="current-line" style={{height:currentHeight + "%"}} />
                <div className="timeline-notes">
                    {props.timeline_notes?.map((e,i) => <TimelineNotePiece note={e.note} top={e.start * 40} height={(e.end-e.start) * 40}/>)}
                </div>
                <div className="timeline-records">
                    {props.timeline_records?.map((e,i) => <TimelineRecordPiece note={e.note} top={e.start * 40} height={(e.end-e.start) * 40}/>)}
                </div>
            </div>
        </div>
    )
}