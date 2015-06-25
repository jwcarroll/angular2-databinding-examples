var timespan_1 = require('./timespan');
var Timer = (function () {
    function Timer() {
    }
    Timer.prototype.start = function () {
        this._startTime = new Date();
    };
    Timer.prototype.stop = function () {
        this._endTime = new Date();
    };
    Timer.prototype.reset = function () {
        this._startTime = new Date();
        this._endTime = null;
    };
    Timer.prototype.elapsed = function () {
        if (!this._startTime) {
            return new timespan_1.TimeSpan();
        }
        var endTime = this._endTime || new Date();
        return timespan_1.TimeSpan.fromDateTime(this._startTime, endTime);
    };
    return Timer;
})();
exports.Timer = Timer;
