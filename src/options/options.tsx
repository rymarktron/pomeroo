import React from 'react';
import { createRoot } from 'react-dom';
import './options.css'

const test = <p>Hello World</p>;

const root = document.createElement('div');
document.body.appendChild(root);

const rootElement = createRoot(root);
rootElement.render(test);
