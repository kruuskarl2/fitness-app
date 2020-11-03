import React from 'react';
import { hot } from 'react-hot-loader/root';

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
            showCalLimitModal: false
        };
    }

    componentDidMount() {
        // If a calorie limit has not been set, calculate one by showing the modal
        if (!this.state.calorieLimit) {
            this.setState({
                ...this.state,
                showCalLimitModal: true
            });
        }
    }

    setCalorieLimitHandler(calorieLimit) {
        this.setState({
            ...this.state,
            calorieLimit
        });
    }

    closeCalLimitModalHandler() {
        if (!this.state.calorieLimit) return;
        this.setState({
            ...this.state,
            showCalLimitModal: false
        });
    }

    render() {
        return (
            <div className="app">
                <div className="trackers">
                    <CalorieTracker />
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
