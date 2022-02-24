import {Button} from "react-bootstrap";

function Stage(props:{
    name: string,
    tasks: string[],
}){
    return(
        <>
            <h4>{props.name}</h4>
            {props.tasks.map((task, index) =>
                <h5 key={index}>
                    <Button variant='success'>
                        {task}
                    </Button>
                </h5>
            )}
        </>
    );
}

export default Stage;