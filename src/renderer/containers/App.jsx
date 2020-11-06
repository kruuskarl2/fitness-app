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
            calDate: null,
            trainDate: null,
            datesData: [],
            showNewActivity: false,
            activities: []
        };
    }

    componentDidMount() {
        const currentDate = this.getCurrentDate();
        const datesData = [...this.state.datesData];

        if (!this.currentDateData()) {
            datesData.push({
                caloriesEaten: 0,
                caloriesBurned: 0,
                date: currentDate,
                meals: []
            });
        }

        this.setState({
            ...this.state,
            calDate: currentDate,
            trainDate: currentDate,
            // If a calorie limit has not been set, calculate one by showing the modal
            showCalLimitModal: !this.state.calorieLimit,
            datesData
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
        this.currentDateData('calorieTracker').meals.map(meal => {
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

        const datesData = Object.assign(this.state.datesData);
        datesData.forEach(data => {
            if (data.date === this.state.calDate) {
                data.caloriesEaten = caloriesEaten;
                data.meals.push({ name, cal });
            }
        });

        this.setState({
            ...this.state,
            datesData
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

    currentDateData(component, date) {
        if (!date) {
            switch (component) {
            case 'calorieTracker':
                date = this.state.calDate;
                break;
            case 'trainingTracker':
                date = this.state.trainDate;
                break;
            default:
                date = this.state.calDate;
                break;
            }
        }
        console.log(date);
        console.log(component);
        return this.state.datesData.find(dateData => dateData.date === date);
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

    changeDateHandler(change, component) {
        let currentDateStr;
        if (component === 'calorieTracker') currentDateStr = this.state.calDate;
        else if (component === 'trainingTracker') currentDateStr = this.state.trainDate;
        else console.error('Component name invalid');

        const currentDate = date.parse(currentDateStr, 'MMMM D, YYYY');
        const newDate = date.addDays(currentDate, change);
        const strDate = date.format(newDate, 'MMMM D, YYYY');

        const datesData = [...this.state.datesData];

        if (!this.currentDateData(component, strDate)) {
            datesData.push({
                caloriesEaten: 0,
                caloriesBurned: 0,
                date: strDate,
                meals: []
            });
        }

        let calDate = this.state.calDate;
        let trainDate = this.state.trainDate;
        switch (component) {
        case 'calorieTracker':
            calDate = strDate;
            break;
        case 'trainingTracker':
            trainDate = strDate;
            break;
        }

        this.setState({
            ...this.state,
            datesData,
            calDate,
            trainDate
        });
    }

    render() {
        return (
            <div className="app">
                <div className="trackers">
                    <CalorieTracker
                        calorieLimit={this.state.calorieLimit}
                        date={this.state.calDate}
                        addMeal={this.addMealHandler.bind(this)}
                        removeMeal={this.removeMealHandler.bind(this)}
                        dateData={this.currentDateData('calorieTracker')}
                        changeDate={this.changeDateHandler.bind(this)}
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
                        changeDate={this.changeDateHandler.bind(this)}
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
