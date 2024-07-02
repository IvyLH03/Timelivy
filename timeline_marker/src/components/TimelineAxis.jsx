import { Row, Col } from "react-bootstrap"

export default function TimelineAxis() {
    return(
        <Row xs={1}>
            {
                Array(48).fill(0).map((e,i)=> <Col style={{}}><div class="timeline-grid" style={{width:30}}>{i%2===0?i/2:""}</div></Col>)
            }
            </Row>
    )
}