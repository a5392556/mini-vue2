import { effect, stop } from "../effect";
import { reactive } from "../reactive";

describe('effect', () => {
    it('happy path', () => {
        const obj = reactive({age: 1});
        let nextAge = 0;
        effect(() => {
            nextAge++;
        });
        // const obj2 = reactive({age: 1});
        // obj2.age + 1;
        expect(nextAge).toBe(1);
        // obj.age++;
        // expect(nextAge).toBe(2);
        // obj2.age++;
        // expect(nextAge).toBe(3);

    });

    it('runner', () => {
        const obj = reactive({age: 1});
        let age = 0;
        const runner = effect(() => {
            age = obj.age + 1;
            return 'foo';
        });
        const r = runner();
        expect(r).toBe('foo');

    });

    it('scheduler', () => {
        let run: any;
        const scheduler = jest.fn(() => {
            run = runner;
        });
        const obj = reactive({foo: 1});
        let foo;
        const runner = effect(() => {
            foo = obj.foo;
        }, {scheduler});
        expect(foo).toBe(1);
        obj.foo = 2;
        expect(foo).toBe(1);
        expect(scheduler).toHaveBeenCalled();
        run();
        expect(foo).toBe(2);
    });

    it('stop', () => {
        let dummy = 0;
        const obj = reactive({foo: 1});
        const runner = effect(() => {
            dummy = obj.foo;
        });
        obj.foo = 2;
        expect(dummy).toBe(2);
        stop(runner);
        obj.foo++;
        expect(dummy).toBe(2);
        runner();
        expect(dummy).toBe(3);

    });

    it('onsStop', () => {
        let dummy = 0;
        const obj = reactive({foo: 1});
        const onStop = jest.fn(() => {});
        const runner = effect(() => {
            dummy = obj.foo;
        }, {
            onStop
        });
        obj.foo = 2;
        expect(dummy).toBe(2);
        stop(runner);
        expect(onStop).toBeCalledTimes(1);
    });
});