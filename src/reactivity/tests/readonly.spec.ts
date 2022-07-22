import { isReadonly, readonly } from "../reactive";

describe('readonly', () => {
    it('happy path', () => {
        const k = readonly({foo: 10});
        expect(k.foo).toBe(10);
        console.error = jest.fn();
        k.foo = 12;
        expect(console.error).toBeCalled();
    });

    it('is readonly', () => {
        const k = readonly({foo: 10});
        expect(k.foo).toBe(10);
        console.error = jest.fn();
        k.foo = 12;
        expect(console.error).toBeCalled();

        const obj = {age: 1};
        const foo = readonly(obj);
        expect(isReadonly(foo)).toBe(true);
        expect(isReadonly(obj)).toBe(false);
    });

    it('nested reactive', () => {
        const orignal = readonly({
            nested: {
                foo: 1
            },
            array: [{bar: 2}]
        });
        expect(isReadonly(orignal)).toBe(true);
        expect(isReadonly(orignal.nested)).toBe(true);
        expect(isReadonly(orignal.array[0])).toBe(true);

    });
});