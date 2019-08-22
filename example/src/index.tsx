import React from 'react';
import ReactDOM from 'react-dom';
import {
  withStoreProviders,
  HasStoreClassComponentProps,
  HasStoreMapClassComponentProps,
  withStoreConsumer,
  withStoreMapConsumer
} from 'aw-react-store';
import CounterStore, { CounterValue } from './store';

// function component ------------------------------------------------------------------------------------

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

// class component ------------------------------------------------------------------------------------

// const Counter = withStoreConsumer(class extends React.Component<HasStoreClassComponentProps<CounterValue>> {
//   render() {
//     const store = this.props.store;

//     return (
//       <div>
//         <button onClick={store.decrementAction}>-</button>
//         <span>{store.state.count}</span>
//         <button onClick={store.incrementAction}>+</button>
//       </div>
//     );
//   }
// }, CounterStore);

// interface StoreMap {
//   counter: CounterValue;
// }

// const Counter = withStoreMapConsumer(class extends React.Component<HasStoreMapClassComponentProps<StoreMap>> {
//   render() {
//     const store = this.props.storeMap.counter;

//     return (
//       <div>
//         <button onClick={store.decrementAction}>-</button>
//         <span>{store.state.count}</span>
//         <button onClick={store.incrementAction}>+</button>
//       </div>
//     );
//   }
// }, {
//   counter: CounterStore,
// });

const App = withStoreProviders(Counter, [CounterStore]);
// const App = () => (
//   <CounterStore.Provider>
//     <Counter />
//   </CounterStore.Provider>
// );

ReactDOM.render(<App />, document.getElementById('root'));

