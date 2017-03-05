import React from 'react';
import AddFishForm from './AddFishForm'

class Inventory extends React.Component {
    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updateFish = {...fish, [e.target.name]: e.target.value};
        this.props.updateFish(key, updateFish);
    }
    renderInventory(key) {
        const fish = this.props.fishes[key];
        return (
            <div className="fish-edit" key={key}>
                <input type="text" name="name" value={fish.name} placeholder="name" onChange={(e) => this.handleChange(e, key).bind(this)}/>
                <input type="text" name="price" value={fish.price} placeholder="price" onChange={(e) => this.handleChange(e, key).bind(this)}/>
                <select name="status" value={fish.status} placeholder="status" onChange={(e) => this.handleChange(e, key).bind(this)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea type="text" name="desc" value={fish.desc} placeholder="description" onChange={(e) => this.handleChange(e, key).bind(this)}></textarea>
                <input type="text" name="image" value={fish.image} placeholder="image" onChange={(e) => this.handleChange(e, key).bind(this)}/>
            </div>
        )
    }
    render() {
        return (
            <div>
                <h1>Inventory</h1>
                {Object.keys(this.props.fishes).map(this.renderInventory.bind(this))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        )
    }
}

export default Inventory;