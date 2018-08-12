import curryN from './curryN';

/**
 * Creates a throttled function that only invokes `fn` at most once per
 * every `wait` milliseconds. `fn` is called in start of `wait` delay
 *
 * @param {number} wait The number of milliseconds to throttle invocations to.
 * @param {Function} fn The function to throttle.
 */
export default curryN(2, (wait, fn) => {
    let lastCalled;
    let timeout;

    return function (...args) {
        const now = Date.now();
        const diff = lastCalled + wait - now;

        if (lastCalled && diff > 0) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                lastCalled = now;
                fn.apply(this, args);
            }, diff);
        } else {
            lastCalled = now;
            fn.apply(this, args);
        }
    };
}) as throttle

interface throttle {
    <TFunc extends (...args) => any>(wait: number, fn: TFunc): void;
    (wait: number): <TFunc extends (...args) => any>(fn: TFunc) => void;
}