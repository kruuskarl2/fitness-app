import React from 'react';
import { hot } from 'react-hot-loader/root';
import './Date.css';

const date = props => {
    return (
        <div className="date">
            <div onClick={() => props.changeDate(-1, props.component)} className="date-button">{'<'}</div>
            <div onClick={() => props.changeDate(1, props.component)} className="date-button">{'>'}</div>
            <h5>{props.date}</h5>
        </div>
    );
};

export default hot(date);
