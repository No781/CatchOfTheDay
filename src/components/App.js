import React from 'react';
// Component
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import Base from '../base'

class App extends React.Component {
    constructor() {
        super();

        this.addFish = this.addFish.bind(this);
        this.loadSamples = this.loadSamples.bind(this);
        this.addToOrder = this.addToOrder.bind(this)
        this.updateFish = this.updateFish.bind(this)
        // define initial state
        this.state = {
            fishes: {},
            order: {}
        };
    }

    componentWillMount() {
        // this runs right before the app is rendered
        this.ref = Base.syncState(`${this.props.params.storeId}/fishes`
        , {
            context: this,
            state: 'fishes'
        });

        // check of there is any order in localStorage
        const localStorageRef = localStorage.getItem(`order-${this.props.params.storeId}`)

        if(localStorageRef) {
            //update App Component's state
            this.setState({
                order: JSON.parse(localStorageRef)
            });
        }
    }

    componentWillUnmount() {
        Base.removeBinding(this.ref);
    }

    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem(`order-${this.props.params.storeId}`, JSON.stringify(nextState.order))
    }
    addFish(fish) {
        // update our state
        const fishes = {...this.state.fishes};
        // add new fishes with the timestamp as a key
        const timestamp = Date.now();
        fishes[`fish-${timestamp}`] = fish;
        // set state
        this.setState({fishes});
    }

    updateFish(key, updateFish) {
        const fishes = {...this.state.fishes};
        fishes[key] = updateFish;
        this.setState({ fishes });
    }
    loadSamples() {
        this.setState({
            fishes: sampleFishes
        });
    }

    addToOrder(key) {
        const order = {...this.state.order};
        // const fish = this.state.fishes[key];
        order[key] = order[key] +1 || 1;
        this.setState({order});
    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Some Tagline"/>
                    <ul className="list-of-fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} addToOrder={this.addToOrder} details={this.state.fishes[key]}/>)}
                    </ul>
                </div>
                <Order params={this.props.params} fishes={this.state.fishes} order={this.state.order} />
                <Inventory loadSamples={this.loadSamples} addFish={this.addFish} fishes={this.state.fishes} updateFish={this.updateFish}/>
            </div>
        )
    }
}

export default App;