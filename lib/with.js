"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
/** 注入单个 store 包包装的组件中 */
function withStoreConsumer(Component, store) {
    var WrappedComponent = function (props) {
        var s = store.useStore();
        return react_1.default.createElement(Component, __assign({}, props, { store: s }));
    };
    WrappedComponent.displayName = "withStoreConsumer(" + (Component.displayName || Component.name) + ")";
    return WrappedComponent;
}
exports.withStoreConsumer = withStoreConsumer;
/** 注入多个 store 到包装的组件中 */
function withStoreMapConsumer(Component, storeMap) {
    var WrappedComponent = function (props) {
        var sm = {};
        for (var k in storeMap) {
            if (storeMap.hasOwnProperty(k)) {
                sm[k] = storeMap[k].useStore();
            }
        }
        return react_1.default.createElement(Component, __assign({}, props, { storeMap: sm }));
    };
    WrappedComponent.displayName = "withStoreMapConsumer(" + (Component.displayName || Component.name) + ")";
    return WrappedComponent;
}
exports.withStoreMapConsumer = withStoreMapConsumer;
/** 组合 Provider */
function withStoreProviders(Component, stores) {
    if (!stores.length) {
        return Component;
    }
    var components = [];
    stores.forEach(function (c) { return components.push(c.Provider); });
    components.push(Component);
    var createTree = function (index, children, props) {
        var isLastNode = index === components.length - 1;
        var Com = components[index];
        if (isLastNode) {
            return react_1.default.createElement(Com, __assign({}, props), children);
        }
        return react_1.default.createElement(Com, __assign({}, props), createTree(++index, children, props));
    };
    var WrappedComponent = function (_a) {
        var children = _a.children, rest = __rest(_a, ["children"]);
        return createTree(0, children, rest);
    };
    WrappedComponent.displayName = "withStoreProviders(" + (Component.displayName || Component.name) + ")";
    return WrappedComponent;
}
exports.withStoreProviders = withStoreProviders;
