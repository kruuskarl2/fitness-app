import React, { useRef } from 'react';
import { hot } from 'react-hot-loader/root';
import './CalorieTracker.css';

const calorieTracker = props => {
    const mealName = useRef(null);
    const mealCal = useRef(null);

    const addMeal = () => {
        const name = mealName.current.value;
        const cal = parseInt(mealCal.current.value);

        if (!name || !cal) return;

        mealName.current.value = '';
        mealCal.current.value = '';

        props.addMeal(name, cal);
    };

    const { caloriesEaten, calorieLimit, meals, removeMeal } = props;

    let progress = caloriesEaten / (calorieLimit / 100);
    progress = (caloriesEaten > calorieLimit) ? 100 : progress;
    progress = (!caloriesEaten || !calorieLimit) ? 0 : progress;

    const mealsJSX = meals.map((meal, index) => {
        return (
            <li key={index} onClick={() => removeMeal(index)}>
                {meal.name + ' - ' + meal.cal + ' kcal'}
            </li>
        );
    });

    return (
        <div className="container">
            <h5>{props.date}</h5>
            <h3 className="container-title">Calorie tracker</h3>
            <br/>
            <div className="progress">
                <div style={{ width: progress + '%' }}></div>
            </div>
            <h4>{caloriesEaten}/{calorieLimit} kcal</h4>
            <div className='double-input'>
                <button onClick={addMeal}>Add meal</button>
                <input ref={mealName} type='text' placeholder='Name of meal'/>
                <input ref={mealCal} type='number' placeholder='Calories'/>
            </div>
            <ul className="meals">{mealsJSX}</ul>
        </div>
    );
};

export default hot(calorieTracker);
