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
        // stop default action
        event.preventDefault();
        // if it is a left-click, move this task to the top of next stage
        props.moveToNextStage(props.stageIndex, taskIndex);
    }
    function handleContextMenu(event: React.MouseEvent, taskIndex:number){
        // stop default action
        event.preventDefault();
        // if it is a right-click, move this task to the bottom of previous stage
        props.moveToPreviousStage(props.stageIndex, taskIndex);
    }
    return(
        <>
            <h4>{props.name}</h4>
            {props.tasks.map((task, index) =>
                <h5 key={index}>
                    <button
                        type="button" className="btn btn-success"
                        onClick={(event) => handleClick(event, index)}
                        onContextMenu={(event) => handleContextMenu(event, index)}>
                        {task}
                    </button>
                </h5>
            )}
        </>
    );
}

export default Stage;