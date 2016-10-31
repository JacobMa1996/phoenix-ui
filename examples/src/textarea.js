import React, { Component ,PropTypes} from 'react';
import ReactDOM,{findDOMNode} from 'react-dom';
import {Textarea} from '../../src/index';

export default class textarea extends Component{

    constructor(props,context){

        super(props,context);

        this.state = {
            name:''
        };
    }

    setValue(key,e){
        let o ={};
        o[key || e.target.name] = e.target.value;
        this.setState(o);
    }

    render(){
        return(
            <div>
                <Textarea value={this.state.name} onChange={this.setValue.bind(this,'name')}></Textarea>
            </div>
        );
    }
}