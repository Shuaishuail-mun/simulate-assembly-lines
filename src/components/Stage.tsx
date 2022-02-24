import {Button} from "react-bootstrap";
import React from "react";

function Stage(props:{
    name: string,
    tasks: string[],
    stageIndex: number,
    moveToNextStage: (stageIndex:number, taskIndex:number) => void,
    moveToPreviousStage: (stageIndex:number, taskIndex:number) => void,
}){

    function handleClick(event: React.MouseEvent, taskIndex:number){
        if(event.type === 'click') {
            // if it is a left-click, move this task to the top of next stage
            props.moveToNextStage(props.stageIndex, taskIndex);
        }else if(event.type === 'contextmenu') {
            // if it is a right-click, move this task to the bottom of previous stage
            props.moveToPreviousStage(props.stageIndex, taskIndex);
        }
    }
    return(
        <>
            <h4>{props.name}</h4>
            {props.tasks.map((task, index) =>
                <h5 key={index}>
                    <Button
                        variant='success'
                        onClick={(event) => handleClick(event, index)}>
                        {task}
                    </Button>
                </h5>
            )}
        </>
    );
}

export default Stage;