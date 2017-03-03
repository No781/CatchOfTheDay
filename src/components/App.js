import React from 'react';
// Component
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this)
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
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Some Tagline"/>
                </div>
                <Order/>
                <Inventory addFish={this.addFish}/>
            </div>
        )
    }
}

export default App;