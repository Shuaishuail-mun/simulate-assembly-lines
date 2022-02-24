function Stage(props:{
    name: string,
    tasks: string[],
}){
    return(
        <>
            <h4>{props.name}</h4>
            {props.tasks.map((task, index) =>
                <button key={index}>{task}</button>
            )}
        </>
    );
}

export default Stage;