

export function TimelineAxis(props) {
    return(
        <div>
            {Array(48).fill(0).map((e,i)=> <div key={i} className="timeline-grid" style={{width:30}}>{i%2===0?i/2:""}</div>)}
        </div>
    )
}

export function Timeline(props) {
    const dt = new Date();
    let currentHeight = (dt.getHours() + (dt.getMinutes() / 60) ) / 24 * 100;
    return (
        <div className="timeline">
            <div>
                {Array(48).fill(0).map((e,i)=> <div key={i} className="timeline-grid"></div>)}
            </div>
            <div className="current-line" style={{height:currentHeight + "%"}} />
        </div>
    )
}