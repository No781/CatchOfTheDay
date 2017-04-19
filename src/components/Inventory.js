import React from 'react';
import AddFishForm from './AddFishForm'
import Base from '../base'

class Inventory extends React.Component {
    constructor() {
        super();
        this.renderLogIn = this.renderLogIn.bind(this)
        this.authenticate = this.authenticate.bind(this)
        this.authHandler = this.authHandler.bind(this)
        this.state = {
            uid: null,
            owner: null
        }
    }
    handleChange(e, key) {
        const fish = this.props.fishes[key];
        const updateFish = {...fish, [e.target.name]: e.target.value};
        this.props.updateFish(key, updateFish);
    }
    renderLogIn() {

        return (
            <nav className="login">
                <h2>Inventory</h2>
                <p>Please Sign in</p>
                <button className="github" onClick={() => this.authenticate('gmail')}>Log In with Gmail</button>
            </nav>
        )
    }

    authenticate(provider) {
        Base.AuthWithOAuthPopup(provider, this.authHandler);
    }

    authHandler(err, authData) {
        if(err) {
            console.log(err);
            return;
        }
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
                <button onClick={() => this.props.removeFish(key)}>Remove Fish</button>
            </div>
        )
    }
    render() {
        const logOutButton = <button>Log Out</button>
        if(!this.state.uid) {
            return <div>{this.renderLogIn()}</div>
        }
        if(this.state.uid !== this.state.owner) {
            return (
                <div>
                    <p>Sorry you are not the owner :(</p>
                    {logOutButton}
                </div>
            )
        }
        return (
            <div>
                <h1>Inventory</h1>
                {logOutButton}
                {Object.keys(this.props.fishes).map(this.renderInventory.bind(this))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSamples}>Load sample fishes</button>
            </div>
        )
    }
}

export default Inventory;