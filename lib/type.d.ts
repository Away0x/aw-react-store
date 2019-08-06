/// <reference types="react" />
export interface BaseValue<T> {
    readonly state: Readonly<T>;
}
export interface Store<Value> {
    Provider: React.ComponentType;
    useStore: () => Value;
}
