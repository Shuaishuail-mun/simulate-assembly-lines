import style from '../styles/assemblyline.module.scss';
import {Col, Container, Row} from "react-bootstrap";
import Stage from './Stage';
import AddItem from "./AddItem";
import {useState} from "react";

function AssemblyLine(props:{
    stages: string[]
}){

    // use a two-dimensional array to keep task arrays for each stage
    // initialize this variable with four stages and each stage has an empty task array
    const [assemblyData, setAssemblyData] = useState<string[][]>(
        Array(props.stages.length).fill([])
    );

    function addTask(task:string){
        // when new task comes, add it to the top of first stage
        let firstStageTasks = assemblyData[0];
        assemblyData.shift();
        // create a new array based on previous arrays and the new task
        let newAssemblyData = [[task, ...firstStageTasks], ...assemblyData];
        setAssemblyData(newAssemblyData);
    }

    return(
        <div className={style.AssemblyLine}>
            <Container>
                <Row>
                    <Col xs={4}>
                        <AddItem addTask={addTask}/>
                    </Col>
                </Row>
                <Row>
                    <hr/>
                </Row>
                <Row>
                    {props.stages.map((stage:string, index:number) =>
                        <Col key={index}>
                            <Stage name={stage} tasks={assemblyData[index]}/>
                        </Col>
                    )

                    }
                </Row>
            </Container>
        </div>
    );
}

export default AssemblyLine;