import { toHandlerKey, camelize } from "../utils/shared";

export function emit(instance: ComponentType, eventName, ...args) {
    const {props} = instance;
    // 对事件名进行处理，支持 add => onAdd, add-foo => onAddFoo
    const handler = props[toHandlerKey(camelize(eventName))];
    handler && handler(...args);
}