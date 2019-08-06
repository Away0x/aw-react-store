import React, { FC, ComponentProps } from 'react';
import { BaseValue, Store } from './type';

export interface HasStoreClassComponentProps<Store> {
  store: Store
}

export interface HasStoreMapClassComponentProps<Map> {
  storeMap: Map
}

/** 注入单个 store 包包装的组件中 */
export function withStoreConsumer<Value extends BaseValue<any>>(
  Component: React.ComponentType<HasStoreClassComponentProps<Value> & any>,
  store: Store<Value>
) {

  const WrappedComponent: FC = (props: any) => {
    const s = store.useStore();
    return <Component {...props} store={s} />;
  }

  WrappedComponent.displayName = `withStoreConsumer(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/** 注入多个 store 到包装的组件中 */
export function withStoreMapConsumer<Map>(
  Component: React.ComponentType<HasStoreMapClassComponentProps<Map> & any>,
  storeMap: {[key in keyof Map]: Store<BaseValue<any>>}
) {

  const WrappedComponent: FC = (props: any) => {
    const sm: {[key: string]: BaseValue<any>} = {};

    for (const k in storeMap) {
      if (storeMap.hasOwnProperty(k)) {
        sm[k] = storeMap[k].useStore();
      }
    }

    return <Component {...props} storeMap={sm} />;
  }

  WrappedComponent.displayName = `withStoreMapConsumer(${Component.displayName || Component.name})`;
  return WrappedComponent;
}

/** 组合 Provider */
export function withStoreProviders(
  Component: React.ComponentType<any>,
  stores: Store<BaseValue<any>>[], // index 靠前的会包裹 index 靠后的
) {
  if (!stores.length) {
    return Component;
  }

  const components: React.ComponentType<any>[] = [];

  stores.forEach((c) => components.push(c.Provider));
  components.push(Component);

  const createTree = (index: number, children: React.ComponentType, props: ComponentProps<any>): React.ReactElement => {
    const isLastNode = index === components.length - 1;
    const Com = components[index];

    if (isLastNode) {
      return <Com {...props}>{children}</Com>
    }

    return <Com {...props}>{createTree(++index, children, props)}</Com>
  }

  const WrappedComponent: FC = ({children, ...rest}: ComponentProps<any>) => createTree(0, children, rest);

  WrappedComponent.displayName = `withStoreProviders(${Component.displayName || Component.name})`;
  return WrappedComponent;
}
