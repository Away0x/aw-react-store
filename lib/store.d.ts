import { Store, BaseValue } from './type';
export declare function createStore<Value extends BaseValue<any>>(useHook: () => Value): Store<Value>;
