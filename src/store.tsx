// unstated-next: https://github.com/jamiebuilds/unstated-next
import React, { ComponentProps } from "react"
import { Store, BaseValue } from './type';

export function createStore<Value extends BaseValue<any>>(
  useHook: () => Value,
): Store<Value> {
  const Context = React.createContext<Value | null>(null);

  function Provider(props: ComponentProps<any>) {
    const value = useHook();

    return <Context.Provider value={value}>{props.children}</Context.Provider>;
  }

  function useStore(): Value {
    const value = React.useContext(Context);

    if (value === null) { throw new Error("Component must be wrapped with <Store.Provider>"); }

    return value;
  }

  return { Provider, useStore };
}
