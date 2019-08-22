import React from 'react';
import ReactDOM from 'react-dom';
import { withStoreProviders } from '@lib';

import CounterStore from './store';
import './index.css';
import Counter from './Counter';

const App = withStoreProviders(Counter, [CounterStore]);
ReactDOM.render(<App />, document.getElementById('root'));

