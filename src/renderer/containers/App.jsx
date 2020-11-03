import React from 'react';
import { hot } from 'react-hot-loader/root';

import CalorieTracker from '../components/CalorieTracker/CalorieTracker';
import TrainingTracker from '../components/TrainingTracker/TrainingTracker';
import Stats from '../components/Stats/Stats';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="trackers">
                    <CalorieTracker />
                    <TrainingTracker />
                </div>
                <Stats />
            </div>
        );
    }
};

export default hot(App);
