import React from 'react';
import ReactDOM from 'react-dom';
import App from './data-row';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataRow />, div);
    ReactDOM.unmountComponentAtNode(div);
});
