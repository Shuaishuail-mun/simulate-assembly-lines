import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import AssemblyLine from "../components/AssemblyLine";
import Stage from "../components/Stage";
import AddItem from "../components/AddItem";

// config enzyme
Enzyme.configure({adapter: new Adapter()});

describe('Testing Component AssemblyLine', () => {
    const wrapper = mount(<AssemblyLine stages={['Idea', 'Development', 'Testing', 'Deployment']}/>);

    it('It should render 4 Stage Component', () => {
        expect(wrapper.find(Stage)).toHaveLength(4);
    });

    it('It should render 1 AddItem Component', () => {
        expect(wrapper.find(AddItem)).toHaveLength(1);
    });

    it('when add two new tasks, the first stage should render 2 buttons', () => {
        // simulate the entering of two tasks
        const inputOfAddItem = wrapper.find(AddItem).find('input').at(0);
        inputOfAddItem.simulate('change', { target: { value: 'task1' } });
        inputOfAddItem.simulate('keypress', {key: 'Enter'});
        inputOfAddItem.simulate('change', { target: { value: 'task2' } });
        inputOfAddItem.simulate('keypress', {key: 'Enter'});
        expect(wrapper.find(Stage).at(0).find('button')).toHaveLength(2);
    });

    it('when left click a task, this task will move from first stage to the second stage', () =>{
        // simulate the left click of 'task2'
        wrapper.find(Stage).at(0).find('button').at(0).simulate('click', {type: 'click'});
        expect(wrapper.find(Stage).at(0).find('button')).toHaveLength(1);
        expect(wrapper.find(Stage).at(1).find('button')).toHaveLength(1);
        console.log(wrapper.find(Stage).at(1).find('button').at(0).debug());
    });

    it('when right click the task, this task will move from current stage to its previous stage', () =>{
        // simulate the right click of 'task2'
        wrapper.find(Stage).at(1).find('button').at(0).simulate('contextmenu', {type: 'contextmenu'});
        expect(wrapper.find(Stage).at(0).find('button')).toHaveLength(2);
        expect(wrapper.find(Stage).at(1).find('button')).toHaveLength(0);
    });

    it('when right-click a task in the first stage, the task will be deleted from the assembly line', () =>{
        // simulate the right click of 'task2'
        wrapper.find(Stage).at(0).find('button').at(1).simulate('contextmenu', {type: 'contextmenu'});
        expect(wrapper.find(Stage).at(0).find('button')).toHaveLength(1);
        expect(wrapper.find(Stage).at(1).find('button')).toHaveLength(0);
        expect(wrapper.find(Stage).at(2).find('button')).toHaveLength(0);
        expect(wrapper.find(Stage).at(3).find('button')).toHaveLength(0);
    });

    it('when left-click a task in the last stage, the task will be deleted from the assembly line', () =>{
        // simulate the left click of 'task1'
        wrapper.find(Stage).at(0).find('button').at(0).simulate('click', {type: 'click'});
        wrapper.find(Stage).at(1).find('button').at(0).simulate('click', {type: 'click'});
        wrapper.find(Stage).at(2).find('button').at(0).simulate('click', {type: 'click'});
        expect(wrapper.find(Stage).at(3).find('button')).toHaveLength(1);
        wrapper.find(Stage).at(3).find('button').at(0).simulate('click', {type: 'click'});
        expect(wrapper.find(Stage).at(3).find('button')).toHaveLength(0);
        expect(wrapper.find(Stage).at(0).find('button')).toHaveLength(0);
        expect(wrapper.find(Stage).at(1).find('button')).toHaveLength(0);
        expect(wrapper.find(Stage).at(2).find('button')).toHaveLength(0);
    });
});