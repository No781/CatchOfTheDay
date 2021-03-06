import React from 'react';

class AddFishForm extends React.Component {
    addFish(e) {
        e.preventDefault();
        const fish = {
            name: this.name.value,
            price: this.price.value,
            status: this.status.value,
            desc: this.desc.value,
            image: this.image.value
        }
        this.props.addFish(fish);
        this.fishForm.reset();
    }

    render() {
        return (
            <form ref={(input) => this.fishForm = input} className="fish-edit" onSubmit={this.addFish.bind(this)}>
                <input ref={(input) => this.name = input} type="text" placeholder="Name"/>
                <input ref={(input) => this.price = input} type="text" placeholder="Price"/>
                <select ref={(input => this.status = input)}>
                    <option value="available">Fresh!</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea ref={(input) => this.desc = input} type="text" placeholder="Description"></textarea>
                <input ref={(input) => this.image = input} type="text" placeholder="Image"/>
                <button type="submit" className="submit">submit</button>
            </form>
        )
    }
}

export default AddFishForm;