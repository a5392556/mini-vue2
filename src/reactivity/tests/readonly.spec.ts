import { readonly } from "../reactive";

describe('readonly', () => {
    it('happy path', () => {
        const k = readonly({foo: 10});
        expect(k.foo).toBe(10);
        console.error = jest.fn();
        k.foo = 12;
        expect(console.error).toBeCalled();
    });
});