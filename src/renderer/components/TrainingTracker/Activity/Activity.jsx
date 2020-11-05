import React, { useRef, Fragment } from 'react';
import { hot } from 'react-hot-loader/root';

const activity = props => {
    const name = useRef(null);
    const unit = useRef(null);
    const cal = useRef(null);

    const { activity, showEditor, click, createNew, remove, setWorkDone, index } = props;

    let className = 'activity';
    className += (activity) ? '' : ' new-activity';
    className += (showEditor) ? ' activity-is-open' : '';

    const addActivityHandler = () => {
        const nameValue = name.current.value;
        const unitValue = unit.current.value;
        const calValue = cal.current.value;

        if (!nameValue || !unitValue || !calValue) return;

        createNew(nameValue, unitValue, calValue, index);
    };

    if (activity && name.current) {
        name.current.value = activity.name;
        unit.current.value = activity.unit;
        cal.current.value = activity.cal;
    }

    return (
        <div className={className}>
            <div className="activity-button">
                <h4 onClick={click}>
                    {activity ? activity.name : 'New activity'}
                </h4>
                {(activity && !showEditor) ? (
                    <Fragment>
                        <h4>{(activity.workDone * activity.cal) + ' kcal burned'}</h4>
                        <input
                            onChange={(e) => setWorkDone(e, index)}
                            value={activity.workDone}
                            type="text"
                        />
                        <h4>{activity.unit + '(s)'}</h4>
                    </Fragment>
                ) : null}
            </div>
            <div className="activity-editor">
                <input ref={name} placeholder="Name of activity" type="text"/>
                <input ref={unit} placeholder="Activity unit (e.g km or hour)" type="text"/>
                <input ref={cal} placeholder="Calories burned per unit" type="number"/>
                <button onClick={addActivityHandler}>
                    {activity ? 'Save changes' : 'Create new activity'}
                </button>
                <button onClick={remove}>
                    {activity ? 'Delete activity' : 'Cancel'}
                </button>
            </div>
        </div>
    );
};

export default hot(activity);
