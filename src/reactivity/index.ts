export function handleChange(oldValue: any, newValue) {
    return !Object.is(oldValue, newValue)
}