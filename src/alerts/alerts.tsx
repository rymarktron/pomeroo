import React from 'react';
import { createRoot } from 'react-dom';
import './alerts.css'

const test = <img src="icon.png" style={{ maxWidth: '60px' }}/>

const test2 = <p>Hello World</p>;

const root = document.createElement('div');
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(test);
