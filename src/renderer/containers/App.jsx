import React from 'react';
import { hot } from 'react-hot-loader/root';
import date from 'date-and-time';

import CalorieTracker from '../components/CalorieTracker/CalorieTracker';
import TrainingTracker from '../components/TrainingTracker/TrainingTracker';
import Stats from '../components/Stats/Stats';
import CalLimitModal from '../components/CalLimitModal/CalLimitModal';

import './App.css';

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            calorieLimit: null,
            showCalLimitModal: false,
            date: null,
            caloriesEaten: 0,
            caloriesBurned: 0,
            meals: [],
            showNewActivity: false,
            activities: []
        };
    }

    componentDidMount() {
        this.setState({
            ...this.state,
            date: this.getCurrentDate(),
            // If a calorie limit has not been set, calculate one by showing the modal
            showCalLimitModal: !this.state.calorieLimit
        });
    }

    setCalorieLimitHandler(calorieLimit) {
        this.setState({
            ...this.state,
            calorieLimit
        });
    }

    getCurrentDate() {
        const now = new Date();
        return date.format(now, 'MMMM D, YYYY');
    }

    getCaloriesEaten() {
        let caloriesEaten = 0;
        this.state.meals.map(meal => {
            caloriesEaten += meal.cal;
        });
        return caloriesEaten;
    }

    closeCalLimitModalHandler() {
        if (!this.state.calorieLimit) return;
        this.setState({
            ...this.state,
            showCalLimitModal: !this.state.showCalLimitModal
        });
    }

    addMealHandler(name, cal) {
        let caloriesEaten = this.getCaloriesEaten();
        caloriesEaten += cal;
        this.setState({
            ...this.state,
            caloriesEaten,
            meals: [
                ...this.state.meals,
                {
                    name,
                    cal
                }
            ]
        });
    }

    removeMealHandler(index) {
        const meals = [...this.state.meals];

        const calRemoved = meals[index].cal;
        let caloriesEaten = this.getCaloriesEaten();
        caloriesEaten -= calRemoved;

        meals.splice(index, 1);

        this.setState({
            ...this.state,
            caloriesEaten,
            meals
        });
    }

    toggleNewActivityHandler() {
        this.setState({
            ...this.state,
            showNewActivity: !this.state.showNewActivity
        });
    }

    addActivityHandler(name, unit, cal, index) {
        const activities = [...this.state.activities];

        if (index !== undefined) activities.splice(index, 1);

        this.setState({
            ...this.state,
            activities: [
                ...activities,
                {
                    name,
                    unit,
                    cal,
                    open: false,
                    workDone: 0
                }
            ],
            showNewActivity: false
        });
    }

    toggleActivityOpenHandler(index) {
        const activities = [...this.state.activities];

        activities[index].open = !activities[index].open;

        this.setState({
            ...this.state,
            activities
        });
    }

    setWorkDoneHandler(event, index) {
        event.persist();

        const activities = [...this.state.activities];

        const value = (event.target.value) ? event.target.value : 0;
        activities[index].workDone = value;

        let caloriesBurned = 0;
        activities.map((activity) => {
            caloriesBurned += (activity.cal * activity.workDone);
        });

        this.setState({
            ...this.state,
            activities,
            caloriesBurned
        });
    }

    removeActivityHandler(index) {
        const activities = [...this.state.activities];

        activities.splice(index, 1);

        this.setState({
            ...this.state,
            activities
        });
    }

    render() {
        return (
            <div className="app">
                <div className="trackers">
                    <CalorieTracker
                        calorieLimit={this.state.calorieLimit}
                        date={this.state.date}
                        caloriesEaten={this.state.caloriesEaten}
                        addMeal={this.addMealHandler.bind(this)}
                        meals={this.state.meals}
                        removeMeal={this.removeMealHandler.bind(this)}
                    />
                    <TrainingTracker
                        date={this.state.date}
                        toggleNewActivity={this.toggleNewActivityHandler.bind(this)}
                        showNewActivity={this.state.showNewActivity}
                        activities={this.state.activities}
                        addActivity={this.addActivityHandler.bind(this)}
                        toggleActivityEditor={this.toggleActivityOpenHandler.bind(this)}
                        setWorkDone={this.setWorkDoneHandler.bind(this)}
                        removeActivity={this.removeActivityHandler.bind(this)}
                        calBurned={this.state.caloriesBurned}
                    />
                </div>
                <Stats />
                <CalLimitModal
                    show={this.state.showCalLimitModal}
                    setCalorieLimit={this.setCalorieLimitHandler.bind(this)}
                    calorieLimit={this.state.calorieLimit}
                    submit={this.closeCalLimitModalHandler.bind(this)}
                />
            </div>
        );
    }
};

export default hot(App);
