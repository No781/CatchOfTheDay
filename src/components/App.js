import React from 'react';
// Component
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        // define initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }
    addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes}
        // add new fishes with the timestamp as a key
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({fishes});
    }
    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Some Tagline"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                <Order/>
                <Inventory loadSamples={this.loadSamples} addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;