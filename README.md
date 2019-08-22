# aw-react-store
> 基于 [unstated-next](https://github.com/jamiebuilds/unstated-next) 做了一些拓展

## Install
```bash
yarn add aw-react-store
or
npm install --save aw-react-store
```

## Example
### Store
```typescript
import { useState, useCallback } from 'react';
import { BaseValue, createStore } from 'aw-react-store';

interface State {
  count: number;
}

const initialState: State = {
  count: 0,
}

export interface CounterValue extends BaseValue<State> {
  // actions
  decrementAction: () => void;
  incrementAction: () => void;
}

function useConter(): CounterValue {
  const [state, setState] = useState(initialState);

  return {
    state,
    // actions
    decrementAction: useCallback(() => {
      setState((s) => ({ ...s, count: s.count - 1 }));
    }, []),
    incrementAction: useCallback(() => {
      setState((s) => ({ ...s, count: s.count + 1 }));
    }, []),
  };
}

export default createStore(useConter);
```

### Provider
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { withStoreProviders } from 'aw-react-store';
import CounterStore from './store';

const App = withStoreProviders(Counter, [CounterStore]);
```
or

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import CounterStore from './store';

const App = () => (
  <CounterStore.Provider>
    <Counter />
  </CounterStore.Provider>
);
```

### Function Component use
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import CounterStore from './store';

const Counter: React.FC = () => {
  const store = CounterStore.useStore();

  return (
    <div>
      <button onClick={store.decrementAction}>-</button>
      <span>{store.state.count}</span>
      <button onClick={store.incrementAction}>+</button>
    </div>
  );
}
```

### Class Component use
```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { HasStoreClassComponentProps, withStoreConsumer } from 'aw-react-store';
import CounterStore, { CounterValue } from './store';

const Counter = withStoreConsumer(class extends React.Component<HasStoreClassComponentProps<CounterValue>> {
  render() {
    const store = this.props.store;

    return (
      <div>
        <button onClick={store.decrementAction}>-</button>
        <span>{store.state.count}</span>
        <button onClick={store.incrementAction}>+</button>
      </div>
    );
  }
}, CounterStore);
```
or

```typescript
import React from 'react';
import ReactDOM from 'react-dom';
import { HasStoreMapClassComponentProps, withStoreMapConsumer } from 'aw-react-store';
import CounterStore, { CounterValue } from './store';

interface StoreMap {
  counter: CounterValue;
}

const Counter = withStoreMapConsumer(class extends React.Component<HasStoreMapClassComponentProps<StoreMap>> {
  render() {
    const store = this.props.storeMap.counter;

    return (
      <div>
        <button onClick={store.decrementAction}>-</button>
        <span>{store.state.count}</span>
        <button onClick={store.incrementAction}>+</button>
      </div>
    );
  }
}, {
  counter: CounterStore,
});
```
