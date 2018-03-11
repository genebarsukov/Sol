import React from 'react';
import ReactDOM from 'react-dom';
import DataPage from './data-page';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<DataPage />, div);
    ReactDOM.unmountComponentAtNode(div);
});
