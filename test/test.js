import { rateLimit } from "../src/rate-limiter";
import { assert } from "chai";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

describe('Rate Limit', () => {
    it('Should allow any number of clicks up to max limit within interval', () => {
        let counter = 0;
        const foo = () => {
            counter++;
        }
        const rateLimitedFoo = rateLimit(foo, {interval: 10000, maxTries: 10});
        for (var i = 0; i < 3; i++) {
            rateLimitedFoo();
        }
        assert.equal(counter, 3);
        rateLimitedFoo();
        assert.equal(counter, 4);
        
    });
    it('Should not exceed max limits within interval', () => {
        let counter = 0;
        const foo = () => {
            counter++;
        }
        const rateLimitedFoo = rateLimit(foo, {interval: 10000, maxTries: 3});
        for (var i = 0; i < 10; i++) {
            rateLimitedFoo();
        }
        assert.equal(counter, 3);
    });
    it('Should reset after interval', () => {
        let counter = 0;
        const foo = () => {
            counter++;
        }
        const rateLimitedFoo = rateLimit(foo, {interval: 3000, maxTries: 3});
        for (var i = 0; i < 10; i++) {
            rateLimitedFoo();
        }
        assert.equal(counter, 3);
        sleep(3000).then(() => {
            for (var i = 0; i < 10; i++) {
                rateLimitedFoo();
            }
            assert.equal(counter, 6);
        });
        
    });
    
})
