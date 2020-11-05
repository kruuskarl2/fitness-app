import React, { Fragment, useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import './CalLimitModal.css';

import calculate from 'fitness-health-calculations';

const calLimitModal = props => {
    const gender = useRef(null);
    const age = useRef(null);
    const height = useRef(null);
    const weight = useRef(null);
    const activityLevel = useRef(null);
    const goal = useRef(null);
    const approach = useRef(null);

    const calculateCalories = () => {
        const ageValue = parseInt(age.current.value);
        const heightValue = parseInt(height.current.value);
        const weightValue = parseInt(weight.current.value);

        if (!ageValue || !heightValue || !weightValue) {
            props.setCalorieLimit(null);
            return;
        }

        const genderValue = gender.current.value;
        const activityLevelValue = activityLevel.current.value;
        const goalValue = goal.current.value;
        const approachValue = approach.current.value;

        const calorieLimit = calculate.caloricNeeds(
            genderValue,
            ageValue,
            heightValue,
            weightValue,
            activityLevelValue,
            goalValue,
            approachValue
        );

        props.setCalorieLimit(calorieLimit);
    };

    const footerClass = (props.calorieLimit) ? 'footer is-open' : 'footer';

    return (props.show) ? (
        <Fragment>
            <div className="overlay"></div>
            <div className="modal">
                <h5>You haven&apos;t set a calorie limit</h5>
                <h1>Calculate it here!</h1>
                <select ref={gender} onChange={calculateCalories}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
                <input ref={age} type="number" placeholder="Age" onChange={calculateCalories}/>
                <input ref={height} type="number" placeholder="Height (cm/feet)" onChange={calculateCalories}/>
                <input ref={weight} type="number" placeholder="Weight (kg/lbs)" onChange={calculateCalories}/>
                <select ref={activityLevel} onChange={calculateCalories}>
                    <option value="sedentary">Sedentary - little to no exercise + work a desk job</option>
                    <option value="light">Light - light exercise 1-3 days/week</option>
                    <option value="moderate">Moderate - moderate exercise 3-5 days/week</option>
                    <option value="high">High - heavy exercise 6-7 days/week</option>
                    <option value="extreme">Extreme - very heavy exercise, hard labor job, training 2x/day</option>
                </select>
                <select ref={goal} onChange={calculateCalories}>
                    <option value="reduction">Reduce weight</option>
                    <option value="maintain">Maintain weight</option>
                    <option value="gain">Gain weight</option>
                </select>
                <select ref={approach} onChange={calculateCalories}>
                    <option value="slow">Very slow weightloss/gain</option>
                    <option value="normal">Normal weightloss/gain, [recommended]</option>
                    <option value="agressive"> Aggressive weightloss/gain</option>
                    <option value="very agressive">Very aggressive weightloss/gain, [Only for athletes]</option>
                </select>
                <div className={footerClass}>
                    <h1 className="current-limit">{props.calorieLimit}</h1>
                    <h5>kcal can be eaten each day</h5>
                </div>
                <button onClick={props.submit}>Start counting!</button>
            </div>
        </Fragment>
    ) : null;
};

export default hot(calLimitModal);
