import React from 'react';
import ReactDOM from 'react-dom';
import App from './data-menu';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataMenu />, div);
    ReactDOM.unmountComponentAtNode(div);
});
