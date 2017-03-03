import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Match, Miss } from 'react-router';
import './css/style.css';
// components
import StorePicker from './components/StorePicker';
import App from './components/App';
import Missing from './components/Missing'

const Root = () => {
    return (
        <BrowserRouter>
            <div>
                <Match exactly pattern="/" component={StorePicker} />
                <Match pattern="/store/:storeId" component={App}/>
                <Miss component={Missing} />
            </div>
        </BrowserRouter>
    )
}

render(<Root/>, document.querySelector('#main'));