import curryN from './curryN';
import { throttleEnd } from '../typings/types';

/**
 * Creates a throttled function that only invokes `fn` at most once per
 * every `wait` milliseconds. `fn` is called in the end of `wait` delay
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

        if (diff < 0 && timeout) {
            clearTimeout(timeout);
            timeout = null;
            fn.apply(this, args);
        } else if (!timeout) {
            timeout = setTimeout(() => {
                fn.apply(this, args);
                timeout = null;
            }, wait);
        }

        lastCalled = now;
    };
}) as typeof throttleEnd
