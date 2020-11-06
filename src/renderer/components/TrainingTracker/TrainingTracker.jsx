import React from 'react';
import { hot } from 'react-hot-loader/root';
import './TrainingTracker.css';
import Activity from './Activity/Activity';
import Date from '../Date/Date';

const trainingTracker = props => {
    const activitiesJSX = props.activities.map((activity, index) => {
        return (
            <Activity
                activity={activity}
                key={index}
                showEditor={activity.open}
                click={() => props.toggleActivityEditor(index)}
                setWorkDone={props.setWorkDone}
                index={index}
                remove={() => props.removeActivity(index)}
                createNew={props.addActivity}
            />
        );
    });
    return (
        <div className="container">
            <Date date={props.date} changeDate={props.changeDate}/>
            <h3 className="container-title">Training tracker</h3>
            <br/>
            <h4>{props.calBurned} calories burned:</h4>
            <div className="activities">
                {activitiesJSX}
                <Activity
                    click={props.toggleNewActivity}
                    remove={props.toggleNewActivity}
                    showEditor={props.showNewActivity}
                    createNew={props.addActivity}
                />
            </div>
        </div>
    );
};

export default hot(trainingTracker);
