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

    // add a new task
    function addTask(task:string){
        // when new task comes, add it to the top of first stage
        let firstStageTasks = assemblyData[0];
        assemblyData.shift();
        // create a new array based on previous arrays and the new task
        let newAssemblyData = [[task, ...firstStageTasks], ...assemblyData];
        setAssemblyData(newAssemblyData);
    }

    // move task to next stage
    function moveToNextStage(stageIndex:number, taskIndex:number){
        // remove the task from current stage
        let currentStageTasks = assemblyData[stageIndex];
        let task = currentStageTasks[taskIndex];
        let newCurrentStageTasks = currentStageTasks.filter((task, index) => {
            return index != taskIndex
        });
        let newAssemblyData;
        if((stageIndex + 1) === props.stages.length) {
            // if it is the last stage, only update the last stage
            assemblyData.pop();
            newAssemblyData = [...assemblyData, newCurrentStageTasks];
        }else{
            // if it is not in the last stage, update both the current stage and next stage
            let newNextStageTasks = [task, ...assemblyData[stageIndex + 1]];
            newAssemblyData = assemblyData.map((stageTasks:string[], index) => {
                if(index === stageIndex) {
                    return newCurrentStageTasks;
                }else if(index === (stageIndex + 1)) {
                    return newNextStageTasks;
                }else{
                    return stageTasks;
                }
            });
        }
        setAssemblyData(newAssemblyData);
    }

    // move task to previous stage
    function moveToPreviousStage(stageIndex:number, taskIndex:number){

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
                            <Stage name={stage}
                                   tasks={assemblyData[index]}
                                   stageIndex={index}
                                   moveToNextStage={moveToNextStage}
                                   moveToPreviousStage={moveToPreviousStage}
                            />
                        </Col>
                    )

                    }
                </Row>
            </Container>
        </div>
    );
}

export default AssemblyLine;