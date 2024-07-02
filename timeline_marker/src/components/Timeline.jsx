import {Col, Row} from 'react-bootstrap'

export default function Timeline(props) {
    return (
            <Row xs={1}>
            {
                Array(48).fill(0).map((e,i)=> <Col style={{}}><div class="timeline-grid"></div></Col>)
            }
            </Row>
    )
}