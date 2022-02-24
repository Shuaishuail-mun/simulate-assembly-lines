import {FormControl, InputGroup} from "react-bootstrap";

function AddItem(){
    return (
        <>
            <InputGroup className='mb-3'>
                <InputGroup.Text id='addItem'>Add an item: </InputGroup.Text>
                <FormControl
                    type='text'
                    aria-describedby='addItem'
                />
            </InputGroup>
        </>
    );
}

export default AddItem;