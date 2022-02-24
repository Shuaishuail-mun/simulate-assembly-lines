import style from '../styles/assemblyline.module.scss';
import {Col, Container, Row} from "react-bootstrap";
import Stage from './Stage';
import AddItem from "./AddItem";

function AssemblyLine(props:{
    stages: string[]
}){
    return(
        <div className={style.AssemblyLine}>
            <Container>
                <Row>
                    <Col xs={4}>
                        <AddItem/>
                    </Col>
                </Row>
                <Row>
                    <hr/>
                </Row>
                <Row>
                    {props.stages.map((stage:string, index:number) =>
                        <Col key={index}>
                            <Stage name={stage}/>
                        </Col>
                    )

                    }
                </Row>
            </Container>
        </div>
    );
}

export default AssemblyLine;