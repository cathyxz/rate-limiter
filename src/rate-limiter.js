
export function rateLimit(fn, options={interval: 1000, maxTries: 10}) {
    var triesWithinInterval = 0;
    var interval = setTimeout(function() {
        this.triesWithinInterval = 0;
    }.bind(this), options.interval); 
    return function() {
        if (triesWithinInterval < options.maxTries) {
            triesWithinInterval++; 
            return fn();           
        } 
    }
}