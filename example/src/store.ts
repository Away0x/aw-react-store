import { useState, useCallback } from 'react';
import { BaseValue, createStore } from '@lib';

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
