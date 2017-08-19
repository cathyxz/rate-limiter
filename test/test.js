import { rateLimit } from "../src/rate-limiter";
import { assert } from "mocha";

const foo = () => {
    console.log("test");
}

foo();

const rateLimitedFoo = rateLimit(foo, {interval: 10000, maxTries: 3});

for (var i = 0; i < 5; i++) {
    rateLimitedFoo();
}
