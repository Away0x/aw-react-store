import React from 'react';
import CounterStore from './store';


const App: React.FC = () => {
  const store = CounterStore.useStore();

  return (
    <div>
      <button onClick={store.decrementAction}>-</button>
      <span>{store.state.count}</span>
      <button onClick={store.incrementAction}>+</button>
    </div>
  );
}

export default App;
