import {FormControl, InputGroup} from "react-bootstrap";
import React from "react";

function AddItem(props:{
    addTask: (task:string) => void,
}){

    function handleKeyPress(event:React.KeyboardEvent){
        if(event.key === 'Enter') {
            let input = event.target as HTMLInputElement;
            props.addTask(input.value);
            input.value = '';
        }
    }

    return (
        <>
            <InputGroup className='mb-3'>
                <InputGroup.Text id='addItem'>Add an item: </InputGroup.Text>
                <FormControl
                    type='text'
                    aria-describedby='addItem'
                    onKeyPress={(e) => handleKeyPress(e)}
                />
            </InputGroup>
        </>
    );
}

export default AddItem;