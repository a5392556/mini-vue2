import { computed } from "../computed";
import { reactive } from "../reactive";
import { ref } from "../ref";

describe('computed', () => {
    it('happy path', () => {
        const obj = ref(1);
        const k = computed(() => {
            return obj.value + 1;
        });
        expect(k.value).toBe(2);
    });

    it('should compute lazily', () => {
        const value = reactive({
            foo: 1
        });
        const getter = jest.fn(() => {
            return value.foo;
        });
        const cValue = computed(getter);
        expect(getter).not.toHaveBeenCalled();
        expect(cValue.value).toBe(1);
        expect(getter).toHaveBeenCalledTimes(1);
        value.foo++;
        expect(getter).toHaveBeenCalledTimes(1);
        expect(cValue.value).toBe(2);
        expect(getter).toHaveBeenCalledTimes(2);

    });
});