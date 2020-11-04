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
            meals: []
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
            showCalLimitModal: false
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
                    <TrainingTracker />
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
