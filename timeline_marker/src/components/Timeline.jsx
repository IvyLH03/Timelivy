import { useEffect, useRef, useState } from "react";
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

    const [addingNote, setAddingNote] = useState(false);
    const startTime = useRef(0);
    const endTime = useRef(0);
    const note = useRef("");

    useEffect(() => {
        setInterval(() => {
            setDt(new Date());
            console.log("date reset");
        }, 5 * 60 * 1000)
    }, [])

    const addNote = () => {
        setAddingNote(o => !o);
    }

    const confirmAddNote = () => {
        console.log(startTime);
        props.addNote(props.dayIndex, startTime.current.value, endTime.current.value, note.current.value);
        setAddingNote(false);
    }
        
    return (
        <div className="timeline">
            
            <div className="timeline-btn-row">
                <Button className='add-note' variant="outline-secondary" onClick={addNote}>{addingNote?"Cancel":"+Note"}</Button>
                <Button className='add-record' variant="outline-secondary" onClick={() => props.addRecord()}>+Record</Button>
            </div>
            {addingNote?
                <div>
                    <form>
                        <label htmlFor="start-time">Start time</label>
                        <input type="number" id="start-time" ref={startTime} value={startTime.current?.value}/>
                        <label htmlFor="end-time">End time</label>
                        <input type="number" id="end-time" ref={endTime} value={endTime.current?.value}/>
                        <label htmlFor="note">Note</label>
                        <input type="text" ref={note} value={note.current?.value}/>
                        <Button onClick={confirmAddNote}>Confirm</Button>
                    </form>
                </div>
                :
                <></>
            }
            <div className="timeline">
                <div className="timeline-background">
                    {Array(24).fill(0).map((e,i)=> <div key={i} className="timeline-grid"></div>)}
                </div>
                
                <div className="timeline-notes">
                    {props.timeline_notes?.map((e,i) => <TimelineNotePiece key={i} note={e.note} top={e.start * 40} height={(e.end-e.start) * 40}/>)}
                </div>
                <div className="timeline-records">
                    {props.timeline_records?.map((e,i) => <TimelineRecordPiece key={i} note={e.note} top={e.start * 40} height={(e.end-e.start) * 40}/>)}
                </div>
                <div className="current-line" style={{height:currentHeight + "%"}} />
            </div>
        </div>
    )
}