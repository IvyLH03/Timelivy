import DayDues from "./DayDues"
import DayHeader from "./DayHeader"
import Timeline from "./Timeline"
export default function DaySchedule(props) {

    return (<div>
        <DayHeader {...props}/>
        <DayDues/>
        <Timeline/>
    </div>)
}