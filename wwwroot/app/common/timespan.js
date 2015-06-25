var TimeSpan = (function () {
    function TimeSpan(milliseconds) {
        if (milliseconds === void 0) { milliseconds = 0; }
        this._totalMilliseconds = 0;
        this._totalMilliseconds = milliseconds;
    }
    TimeSpan.prototype.totalSeconds = function () {
        return this._totalMilliseconds / 1000;
    };
    TimeSpan.prototype.totalMilliseconds = function () {
        return this._totalMilliseconds;
    };
    TimeSpan.fromDateTime = function (dateBegin, dateEnd) {
        if (!(dateBegin instanceof Date) && !(dateEnd instanceof Date)) {
            throw new Error("A begin and end date must be supplied and both must be of type Date");
        }
        return new TimeSpan(dateEnd.getTime() - dateBegin.getTime());
    };
    return TimeSpan;
})();
exports.TimeSpan = TimeSpan;
