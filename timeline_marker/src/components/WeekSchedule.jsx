import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import DaySchedule from "./DaySchedule";
import DayHeader from './DayHeader';
import DayDues from './DayDues';
import Timeline from './Timeline';
import { Table } from 'react-bootstrap';
import TimelineAxis from './TimelineAxis';

export default function WeekSchedule(props) {
    return (
        <table>
            <tr>
                <td style={{padding:0, width:30}} width={0}></td>
                {Array(7).fill(0).map(e => <td style={{padding:0}}><DayHeader date="test" day="Sunday"/></td>)}
            </tr>
            <tr>
                <td style={{padding:0}}></td>
                {Array(7).fill(0).map(e=> <td style={{padding:0}}><DayDues/></td>)}
            </tr>
            <tr>
                <td style={{padding:0}}>
                    <TimelineAxis/>
                </td>
                {Array(7).fill(0).map(e=> <td style={{padding:0}}><Timeline/></td>)}
            </tr>
        </table>
    )
}