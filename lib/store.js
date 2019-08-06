"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// unstated-next: https://github.com/jamiebuilds/unstated-next
var react_1 = __importDefault(require("react"));
function createStore(useHook) {
    var Context = react_1.default.createContext(null);
    function Provider(props) {
        var value = useHook();
        return react_1.default.createElement(Context.Provider, { value: value }, props.children);
    }
    function useStore() {
        var value = react_1.default.useContext(Context);
        if (value === null) {
            throw new Error("Component must be wrapped with <Store.Provider>");
        }
        return value;
    }
    return { Provider: Provider, useStore: useStore };
}
exports.createStore = createStore;
