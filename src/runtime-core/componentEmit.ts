import { toHandlerKey, camelize } from "../utils/shared";

export function emit(instance: ComponentType, eventName, ...args) {
    const {props} = instance;
   

    const handler = props[toHandlerKey(camelize(eventName))];
    handler && handler(...args);
}