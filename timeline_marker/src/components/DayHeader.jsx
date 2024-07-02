
export default function DayHeader(props) {
    return (
    <div className="timeline-date">
        <p>{props.date}</p>
        <p>{props.day}</p>
    </div>)
}