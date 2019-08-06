import React from 'react';
import { BaseValue, Store } from './type';
export interface HasStoreClassComponentProps<Store> {
    store: Store;
}
export interface HasStoreMapClassComponentProps<Map> {
    storeMap: Map;
}
/** 注入单个 store 包包装的组件中 */
export declare function withStoreConsumer<Value extends BaseValue<any>>(Component: React.ComponentType<HasStoreClassComponentProps<Value> & any>, store: Store<Value>): React.FunctionComponent<{}>;
/** 注入多个 store 到包装的组件中 */
export declare function withStoreMapConsumer<Map>(Component: React.ComponentType<HasStoreMapClassComponentProps<Map> & any>, storeMap: {
    [key in keyof Map]: Store<BaseValue<any>>;
}): React.FunctionComponent<{}>;
/** 组合 Provider */
export declare function withStoreProviders(Component: React.ComponentType<any>, stores: Store<BaseValue<any>>[]): React.FunctionComponent<{}> | React.ComponentClass<any, any>;
